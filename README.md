# node-ecpay-aio

綠界全方位金流(ECPay All-In-One, AIO) SDK for Node.js with TypeScript Support

[![build](https://github.com/simenkid/node-ecpay-aio/actions/workflows/build.yml/badge.svg)](https://github.com/simenkid/node-ecpay-aio/actions/workflows/build.yml)
![coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/simenkid/6cd8ec3f4115bc7b0fc0cb646da2dd77/raw/aadcd2ad323a5d555eeecd353729a220ed4d9a1e/node-ecpay-aio__heads_main.json?cacheSeconds=10)
[![npm](https://img.shields.io/npm/v/node-ecpay-aio.svg?cacheSeconds=3600)](https://www.npmjs.com/package/node-ecpay-aio)
[![npm](https://img.shields.io/npm/l/node-ecpay-aio.svg?cacheSeconds=3600)](https://github.com/simenkid/node-ecpay-aio/blob/main/LICENSE)
[![node version](https://img.shields.io/node/v/node-ecpay-aio)](https://img.shields.io/node/v/node-ecpay-aio)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

<br />

## Documentation

本模組詳細使用說明請見 [User Guide](https://github.com/simenkid/node-ecpay-aio/wiki/User-Guide)

<br />

## Overview

本模組這是根據綠界官方 AIO 規格的全新實作，並非官方維護的 SDK 或是官方 SDK 的 fork 改寫版本。此模組的設計初衷是為了與官方最新的 API 規格一致、更貼近 JS 開發風格、更完善的文件說明、提供 TypeScript 支援以及盡可能完善的自動化測試來保證 SDK 穩定性。

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
- 按職責區分以下類別
  - Merchant (特店)
  - Payment (付款方式)
  - Query (查詢)
  - Action (操作)
- 使用 [yup](https://github.com/jquense/yup) 對 API 要求參數與相依條件進行防衛驗證與拋出驗證失敗訊息
- 自動設定 derivable 的參數，如 `ChoosePayment`, `InvoiceMark` 等
- 自動為 REQ/RSP 產生與驗證 CheckMacValue，接收時若驗證到校驗碼不符會自動拋錯
- 支援 Node.js v10.x 以上 (自動測試環境包含 v10.x, v12.x, v14.x 與 v16.x)
- Serverless (Lambda) friendly

<br />

## Notes

- 歡迎發 Issue，但我不一定有時間修
- 更歡迎發 PR (帶測試佳)或共同維護
- 本模組基本穩定，但有些功能綠界沒有提供 Testing stage，自動化測試跑不到那些 cases。

<br />

## License

Licensed under [MIT](https://github.com/simenkid/node-ecpay-aio/blob/main/LICENSE).
