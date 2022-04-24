import { kickoff } from '../kickoff';

describe('kick off', () => {
  test("Must be Let's go when no input", () => {
    const msg = kickoff();
    expect(msg).toEqual("Let's go.");
  });
});
