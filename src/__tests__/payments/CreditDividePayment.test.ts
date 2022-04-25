//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { CreditDividePayment } from '../../feature/Payment';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';

describe('CreditDividePayment: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  const baseParams = TEST_BASE_PARAMS;

  test('Must throw when CreditInstallment is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(CreditDividePayment, baseParams, {
        CreditInstallment: 3,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when CreditInstallment is not a string 3|6|12|18|24|30N', () => {
    expect(() => {
      const payment = merchant.createPayment(CreditDividePayment, baseParams, {
        CreditInstallment: 'bad',
      });
    }).toThrowError('must be one of');
  });
});
