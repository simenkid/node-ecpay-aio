import { createHash } from 'crypto';
import { URL, URLSearchParams } from 'url';
import { Buffer } from 'buffer';
import { request, get } from 'https';

import { decodeStream } from 'iconv-lite';
import { InvoiceParams } from '../types';
import { CheckMacValueError, PlaceOrderError } from '../feature/Error';

export function generateCheckMacValue(
  params: any,
  hashKey: string,
  hashIV: string
) {
  const _params = { ...params };
  const excludedParams = ['HashKey', 'HashIV', 'CheckMacValue'];

  excludedParams.forEach((p) => delete _params[p]);

  // Rip undefined fields off
  Object.keys(_params).forEach((p) => {
    if (_params[p] === undefined) delete _params[p];
  });

  const mac = Object.keys(_params)
    .sort((a, b) => {
      if (a.toUpperCase() < b.toUpperCase()) return -1;
      if (a.toUpperCase() > b.toUpperCase()) return 1;
      return 0;
    })
    .reduce((prev, curr) => (prev += `${curr}=${_params[curr]}&`), '');

  // TBD: 手冊 p.27 CarruerNum 條目說明待驗證
  //      =>  若手機條碼有 + 號, 先轉成空白再產生驗證碼(會在.net URLEncode的 +)
  // if (_params.CarruerType && _params.CarruerType === '3') {
  //   _params.CarruerNum.replace(/+/g, ' ');
  // }

  // API文件: 附錄四 URLEncode 轉換表, .net URLEncode
  // src_string => (step-1) encodeURIComponent
  //            => (step-2) turn certain chars back => .net URLEncoded string
  const urlParamsStr = encodeURIComponent(
    `HashKey=${hashKey}&${mac}HashIV=${hashIV}`
  )
    .toLowerCase()
    .replace(/%2d/g, '-')
    .replace(/%5f/g, '_')
    .replace(/%2e/g, '.')
    .replace(/%21/g, '!')
    .replace(/%2a/g, '*')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%20/g, '+');

  return createHash('sha256').update(urlParamsStr).digest('hex').toUpperCase();
}

export function generateRedirectPostForm(endpoint: string, params: object) {
  const formId = '_form_aio_checkout';
  const inputs =
    Object.keys(params)
      .sort() // ensure every test to have the form with key=value pairs in the same order
      .reduce((prev, curr) => {
        let currVal = params[curr as keyof typeof params];

        // ignore undefined fileds
        return currVal === undefined
          ? prev
          : (prev += `<input type="hidden" name="${curr}" id="${curr}" value="${currVal}" />`);
      }, '') +
    `<script type="text/javascript">document.getElementById("${formId}").submit();</script>`;

  return `<form id="${formId}" action="${endpoint}" method="post">${inputs}</form>`;
}

export function getEncodedInvoice(invoice?: InvoiceParams) {
  if (!invoice) return;

  const _invoice = { ...invoice };

  // remove any 'key=undefined' pair before encodeURIComponent()
  Object.keys(_invoice).forEach((k) => {
    if (_invoice[k as keyof typeof _invoice] === undefined)
      delete _invoice[k as keyof typeof _invoice];
  });

  const encodingFileds: (keyof InvoiceParams)[] = [
    'CustomerName',
    'CustomerAddr',
    'CustomerEmail',
    'InvoiceItemName',
    'InvoiceItemWord',
    'InvoiceRemark',
  ];

  encodingFileds.forEach((key) => {
    let val = _invoice[key];
    if (val) _invoice[key] = encodeURIComponent(val) as never;
  });

  return _invoice as InvoiceParams;
}

export function getCurrentUnixTimestampOffset(seconds?: number) {
  seconds = seconds || 0;
  return Math.floor(new Date().getTime() / 1000) + seconds;
}

export async function postRequest<T>(config: {
  apiUrl: string;
  params: {};
  responseEncoding?: 'utf8' | 'Big5';
}): Promise<T> {
  const { apiUrl, params, responseEncoding = 'utf8' } = config;
  const _url = new URL(apiUrl);
  const postData = getQueryStringFromParams(params, true);
  const options = {
    protocol: _url.protocol,
    hostname: _url.hostname,
    hash: _url.hash,
    search: _url.search,
    pathname: _url.pathname,
    path: `${_url.pathname}${_url.search}`,
    href: _url.toString(),
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  return new Promise<T>((resolve, reject) => {
    const req = request(options, (rsp) => {
      const decodedRsp = decodeStream(responseEncoding);
      rsp.pipe(decodedRsp);

      let dataStr = '';
      // rsp.setEncoding('binary'); // default is binary
      decodedRsp.on('data', (chunk) => (dataStr += chunk));
      decodedRsp.on('end', () => {
        try {
          //if  QueryCreditCardPeriodInfo: parse json, otherwise parse x=y&m=n to object
          let data: unknown;

          if (apiUrl.endsWith('QueryCreditCardPeriodInfo')) {
            // No Response CheckMacValue
            data = JSON.parse(dataStr);
          } else if (
            // No Response CheckMacValue
            apiUrl.endsWith('TradeNoAio') ||
            apiUrl.endsWith('FundingReconDetail')
          ) {
            data = dataStr;
          } else {
            data = fromEntries(new URLSearchParams(dataStr));
          }

          resolve(data as T);
        } catch (err) {
          reject(err);
        }
      });
      decodedRsp.on('error', reject);
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

export async function placeOrderRequest(config: {
  aioBaseUrl: string;
  apiUrl: string;
  params: {};
}): Promise<string> {
  const { apiUrl, params, aioBaseUrl } = config;
  const _url = new URL(apiUrl);
  const postData = getQueryStringFromParams(params, true);
  const options = {
    protocol: _url.protocol,
    hostname: _url.hostname,
    hash: _url.hash,
    search: _url.search,
    pathname: _url.pathname,
    path: `${_url.pathname}${_url.search}`,
    href: _url.toString(),
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  return new Promise<string>((resolve, reject) => {
    const req = request(options, (rsp) => {
      const decodedRsp = decodeStream('utf8');
      let dataStr = '';

      if (rsp.statusCode === 302) {
        // redirect to create order
        dataStr = '';
        const redirectReq = get(
          `${aioBaseUrl}${rsp.headers.location}`,
          (redirectRsp) => {
            redirectRsp.pipe(decodedRsp);

            decodedRsp.on('data', (chunk) => (dataStr += chunk));
            decodedRsp.on('end', () => {
              resolve(dataStr);
            });
            decodedRsp.on('error', reject);
          }
        );

        redirectReq.on('error', reject);
        redirectReq.end();
      } else {
        rsp.pipe(decodedRsp);
        decodedRsp.on('data', (chunk) => {
          dataStr += chunk;
        });
        // not redirect: cannot create order automatically
        decodedRsp.on('end', () => {
          if (dataStr.includes('10300028'))
            reject(
              new PlaceOrderError(
                'Duplicated MerchantTradeNo, create order failed.'
              )
            );
          else reject(new PlaceOrderError('Create order failed.'));
        });
      }

      decodedRsp.on('error', reject);
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

export function getQueryStringFromParams(data: {}, sort?: boolean) {
  const _params = new URLSearchParams(data);

  // remove any 'key=undefined' pair
  Object.keys(data).forEach((k) => {
    if (data[k as keyof typeof data] === undefined) _params.delete(k);
  });

  if (sort) _params.sort();
  return _params.toString();
}

export function fromEntries<T = any>(
  entries: Iterable<readonly [PropertyKey, T]>
): { [k: string]: T } {
  return [...entries].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {} as Record<PropertyKey, T>);
}

export function parseIntegerFileds(input: any, fields: string[]) {
  const result: any = { ...input };

  fields.forEach((key) => {
    let val = result[key as keyof typeof input];

    if (typeof val === 'string' && val !== '') {
      let parsed = parseInt(val, 10);
      if (!isNaN(parsed)) result[key as keyof typeof input] = parsed;
    }
  });

  return result;
}

export function getCurrentTaipeiTimeString(config?: {
  timestamp?: number;
  format?: 'Datetime' | 'Date' | 'Serial';
}) {
  const { timestamp = Date.now(), format = 'Datetime' } = config || {};

  const tzMinutesOffset = new Date(timestamp).getTimezoneOffset();
  const tpeTimestamp = timestamp + 80 * 60 * 60 * 1000;
  const date = new Date(tpeTimestamp);
  const [year, month, day, hour, minute, second, ms] = [
    date.getFullYear(),
    `0${date.getMonth() + 1}`.slice(-2),
    `0${date.getDate()}`.slice(-2),
    `0${date.getHours()}`.slice(-2),
    `0${date.getMinutes()}`.slice(-2),
    `0${date.getSeconds()}`.slice(-2),
    `00${date.getMilliseconds()}`.slice(-3),
  ];

  return format === 'Datetime'
    ? `${year}/${month}/${day} ${hour}:${minute}:${second}`
    : format === 'Date'
    ? `${year}/${month}/${day}`
    : `${year}${month}${day}${hour}${minute}${second}${ms}`;
}

export function parseCachedOrder(html: string) {
  // const hidx = html.indexOf('?timeStamp=');
  // const tidx = html.indexOf('">');
  // const str = html.slice(hidx, tidx).replace(/&amp;/g, '&');
  // return fromEntries(new URLSearchParams(str));
  const hidx = html.indexOf('/Cashier');
  const tidx = html.indexOf('">');
  return html.slice(hidx, tidx).replace(/&amp;/g, '&');
}

export function isValidReceivedCheckMacValue(
  data: { CheckMacValue: string },
  hashKey: string,
  hashIV: string
) {
  if (!data.CheckMacValue)
    throw new CheckMacValueError('No CheckMacValue field within data', data);

  if (typeof data.CheckMacValue !== 'string') return false;

  const computedCMV = generateCheckMacValue(data, hashKey, hashIV);
  return data.CheckMacValue === computedCMV;
}
