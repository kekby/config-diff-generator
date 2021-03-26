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
  const json1 = '__tests__/fixtures/file1.json';
  const json2 = '__tests__/fixtures/file2.json';

  const yml1 = '__tests__/fixtures/file1.yml';
  const yml2 = '__tests__/fixtures/file2.yml';

  test('works with json', () => {
    expect(buildDiff(json1, json2)).toEqual(expected);
  });

  test('works with yml', () => {
    expect(buildDiff(yml1, yml2)).toEqual(expected);
  });

  test('open existing file should log error message', () => {
    expect(() => buildDiff('doesnotexist.json', json2)).toThrow();
  });
});
