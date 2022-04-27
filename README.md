# node-ecpay-aio

綠界全方位金流(ECPay All-In-One, AIO) node.js SDK

[![build workflow](https://github.com/simenkid/node-ecpay-aio/actions/workflows/build.yml/badge.svg)](https://github.com/simenkid/node-ecpay-aio/actions/workflows/build.yml)
![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/simenkid/6cd8ec3f4115bc7b0fc0cb646da2dd77/raw/aadcd2ad323a5d555eeecd353729a220ed4d9a1e/node-ecpay-aio__heads_main.json)
[![npm](https://img.shields.io/npm/v/node-ecpay-aio.svg?maxAge=2592000)](https://www.npmjs.com/package/node-ecpay-aio)
[![npm](https://img.shields.io/npm/l/node-ecpay-aio.svg?maxAge=2592000)](https://github.com/simenkid/node-ecpay-aio/blob/main/LICENSE)
[![node version](https://img.shields.io/node/v/node-ecpay-aio)](https://img.shields.io/node/v/node-ecpay-aio)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

<br />

## Documentation

本模組詳細使用說明請見 [Wiki](https://github.com/simenkid/node-ecpay-aio/wiki)

<br />

## Overview

綠界全方位金流(ECPay All-In-One, AIO) node.js SDK。這是根據官方 API 規格全新實作並且支援 TypeScript 的版本，並非官方 SDK 的 fork 改寫版本。

> 因綠界主要使用者皆在台灣，故本模組文件皆以中文書寫。

<br />

### 對應官方版本

- [綠界科技全方位金流介接技術文件](https://www.ecpay.com.tw/Service/API_Dwnld)
- 版本: V5.4.1
- 文件編號: gw_p100
- 發布日期: 2022-03-22

<br />

## Features

- 內建 TypeScript 支援
- 按職責區分類別，支援自訂新功能擴充
  - Merchant (特店)
  - Payment (付款方式)
  - Query (查詢)
  - Action (操作)
- 可於 App Layer 注入 API Endpoints 來新增或改寫預綠界預設的 Test/Production 服務網址
- 使用 [yup](https://github.com/jquense/yup) 對 API 文件所列參數與相依條件進行防衛驗證，驗證失敗會拋出對應的錯誤訊息以利除錯
- 內部使用即時串流對 response 進行 decoding 與 parsing
- 自動設定部分 derivable 的參數，如 `ChoosePayment`, `InvoiceMark`
- 自動為 Request 產生 CheckMacValue；自動對 Response 進行 CheckMacValue 驗證，驗證失敗即拋錯
- Query 與 Action 的 Response 皆已剖析為 Javascript 物件
- 自動選擇查詢或報表檔的編解碼方式
- Serverless (Lambda) friendly
- 支援 Node.js v10.x 以上 (自動測試環境包含 v10.x, v12.x, v14.x 與 v16.x)

<br />

## Notes

- 歡迎發 Issue，但我不一定有時間修
- 更歡迎發 PR (帶測試佳)或共同維護
- 本模組是為某產品的生產環境所設計，不是 personal gadget

<br />

## License

Licensed under [MIT](https://github.com/simenkid/node-ecpay-aio/blob/main/LICENSE.
