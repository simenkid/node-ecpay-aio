import { createHash } from 'crypto';
import { URL, URLSearchParams, urlToHttpOptions } from 'url';
import { Buffer } from 'buffer';
import { request } from 'https';
import { decodeStream } from 'iconv-lite';

import { InvoiceParams, QueryResponseData } from '../types';

export function generateCheckMacValue(
  params: any,
  hashKey: string,
  hashIV: string
) {
  const _params = { ...params };
  const excludedParams = ['HashKey', 'HashIV', 'CheckMacValue'];

  excludedParams.forEach((p) => delete _params[p]);

  const mac = Object.keys(_params)
    .sort()
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

export function getCurrentUnixTimeStampOffset(seconds?: number) {
  seconds = seconds || 0;
  return Math.floor(new Date().getTime() / 1000) + seconds;
}

export function getDateString(date?: Date) {
  date = date || new Date();

  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
export function getDateTimeString(date?: Date) {
  date = date || new Date();

  return `${getDateString(date)} ${date.toLocaleTimeString('zh-TW', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })}`;
}

export async function PostRequest(config: {
  apiUrl: string;
  params: {};
  responseEncoding?: 'utf8' | 'Big5';
}): Promise<QueryResponseData> {
  const { apiUrl, params, responseEncoding = 'utf8' } = config;
  const _url = new URL(apiUrl);
  const postData = getQueryStringFromParams(params, true);

  const options = {
    ...urlToHttpOptions(_url),
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  return new Promise<QueryResponseData>((resolve, reject) => {
    const req = request(options, (rsp) => {
      const decodedRsp = decodeStream(responseEncoding);
      rsp.pipe(decodedRsp);

      let dataStr = '';
      // rsp.setEncoding('binary'); // default is binary
      decodedRsp.on('data', (chunk) => (dataStr += chunk));
      decodedRsp.on('end', () => {
        try {
          //if  QueryCreditCardPeriodInfo: parse json, otherwise parse x=y&m=n to object
          const data: QueryResponseData = apiUrl.endsWith(
            'QueryCreditCardPeriodInfo'
          )
            ? JSON.parse(dataStr)
            : Object.fromEntries(new URLSearchParams(dataStr));
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
      decodedRsp.on('error', (err) => {
        reject(err);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

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
