import { describe, expect } from '@jest/globals';

import buildDiff from '../src';

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

describe('generates diff', () => {
  const file1 = '__tests__/fixtures/file1.json';
  const file2 = '__tests__/fixtures/file2.json';

  test('works with json', () => {
    expect(buildDiff(file1, file2)).toEqual(expected);
  });
});
