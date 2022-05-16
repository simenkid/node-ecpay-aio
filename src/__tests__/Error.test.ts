//@ts-nocheck
import { QueryError, ActionError, CheckMacValueError } from '../feature/Error';

describe('QueryError: Check QueryError', () => {
  test('Must throw with code 100 and name ECPayReturnedQueryError', () => {
    try {
      throw new QueryError('Test Error', 100, { foo: 'bar' });
    } catch (err) {
      expect(err.name).toBe('ECPayReturnedQueryError');
      expect(err.code).toBe(100);
      expect(err.message).toBe('Test Error');
    }
  });
});

describe('QueryError: Check ActionError', () => {
  test('Must throw with code 100 and name ECPayReturnedActionError', () => {
    try {
      throw new ActionError('Test Error', 100, { foo: 'bar' });
    } catch (err) {
      expect(err.name).toBe('ECPayReturnedActionError');
      expect(err.code).toBe(100);
      expect(err.message).toBe('Test Error');
    }
  });
});

describe('QueryError: Check CheckMacValueError', () => {
  test('Must throw with name CheckMacValueError', () => {
    try {
      throw new CheckMacValueError('Test Error', { foo: 'bar' });
    } catch (err) {
      expect(err.name).toBe('CheckMacValueError');
      expect(err.message).toBe('Test Error');
    }
  });
});
