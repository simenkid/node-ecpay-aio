# node-ecpay-aio

A production-ready 綠界全方位金流(ECPay All-In-One, AIO) SDK for Node.js with TypeScript Support

[![build](https://github.com/simenkid/node-ecpay-aio/actions/workflows/build.yml/badge.svg)](https://github.com/simenkid/node-ecpay-aio/actions/workflows/build.yml)
![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/simenkid/6cd8ec3f4115bc7b0fc0cb646da2dd77/raw/37458fd300efcea7ef2d3adbc4598e47a76a34d9/node-ecpay-aio__heads_main.json)
[![npm](https://img.shields.io/npm/v/node-ecpay-aio.svg?cacheSeconds=3600)](https://www.npmjs.com/package/node-ecpay-aio)
[![npm](https://img.shields.io/npm/l/node-ecpay-aio.svg?cacheSeconds=3600)](https://github.com/simenkid/node-ecpay-aio/blob/main/LICENSE)
[![node version](https://img.shields.io/node/v/node-ecpay-aio)](https://img.shields.io/node/v/node-ecpay-aio)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

<br />

## Documentation

本模組詳細使用說明請見 [User Guide](https://github.com/simenkid/node-ecpay-aio/wiki)

<br />

## Overview

本模組是根據綠界官方 AIO 規格的全新實作，並非官方維護的 SDK 或是 fork 改寫版本。此模組的設計初衷是為了與官方最新的 API 規格一致、更貼近 JS 開發風格、提供 TypeScript 支援、盡可能完善的自動化測試以及更完善的文件說明。

<br />

> 對應官方版本
>
> - [綠界科技全方位金流介接技術文件](https://www.ecpay.com.tw/Service/API_Dwnld)
> - 版本: V5.4.1
> - 文件編號: gw_p100
> - 發布日期: 2022-03-22

<br />

## Installation

```
npm install --save node-ecpay-aio
```

## Features

- 內建 TypeScript 支援
- 按職責區分 Merchant (特店)、Payment (付款方式)、Query (查詢)、Action (操作)等類別
- ATM、超商代碼與超商條碼可於後端建立訂單時一併獲得取號結果
- 結構化的錯誤訊息，更易於程式流程控制
- 使用 [yup](https://github.com/jquense/yup) 對 API 要求參數與相依條件進行防衛驗證
- 自動為 REQ/RSP 產生與驗證 CheckMacValue，若驗證到接收響應之校驗碼不符會自動拋錯
- 遠端查詢或操作作業失敗，會自動拋錯並附帶綠界傳回的錯誤碼、錯誤訊息與原始響應資料
- 自動設定 derivable 的參數，如 `ChoosePayment`, `InvoiceMark` 等
- 支援 Node.js v10.x 以上 (自動測試環境包含 v10.x, v12.x, v14.x 與 v16.x)
- Serverless (Lambda) friendly

<br />

## Notes

- 使用前建議先讀過官方文件與本模組 [User Guide](https://github.com/simenkid/node-ecpay-aio/wiki)
- 歡迎發 Issue，但我不一定有時間修
- 更歡迎發 PR（帶測試佳）或共同維護
- 本模組基本穩定，但有些功能綠界沒有提供 Testing stage，自動化測試跑不到那些 cases。

<br />

## Updates

- v0.2.2 (2022/09/29)
  - 對 `OrderResultURL`, `ClientBackURL`, `ClientRedirectURL` 三個參數的驗證從必為 URL 改為不一定要為 URL，因在手機使用的情況可能會使用 deep link 重導。故現在開發者要自行保證 `OrderResultURL`, `ClientBackURL`, `ClientRedirectURL` 三個參數的格式。

<br />

## License

Licensed under [MIT](https://github.com/simenkid/node-ecpay-aio/blob/main/LICENSE).

<br />
<br />
<br />
