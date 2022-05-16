export class QueryError extends Error {
  code: number | string;
  response: string;

  constructor(rtnMessage: string, rtnCode: number | string, rsp: any) {
    super(rtnMessage);
    this.name = 'ECPayReturnedQueryError';
    this.code = rtnCode;
    this.message = rtnMessage;
    this.response = JSON.stringify(rsp);
  }
}

export class ActionError extends Error {
  code: number | string;
  response: string;

  constructor(rtnMessage: string, rtnCode: number | string, rsp: any) {
    super(rtnMessage);
    this.name = 'ECPayReturnedActionError';
    this.code = rtnCode;
    this.message = rtnMessage;
    this.response = JSON.stringify(rsp);
  }
}

export class CheckMacValueError extends Error {
  response: string;

  constructor(message: string, rsp: any) {
    super(message);
    this.name = 'CheckMacValueError';
    this.message = message;
    this.response = JSON.stringify(rsp);
  }
}

export class PlaceOrderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PlaceOrderError';
    this.message = message;
  }
}
