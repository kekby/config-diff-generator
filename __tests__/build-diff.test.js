import path from 'path';
import { describe, expect } from '@jest/globals';

import buildDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__/fixtures', filename);

describe('generates diff', () => {
  test('works with json', () => {
    const json1 = getFixturePath('file1.json');
    const json2 = getFixturePath('file2.json');
    expect(buildDiff(json1, json2)).toMatchSnapshot();
  });

  test('json plain format', () => {
    const json1 = getFixturePath('file1.json');
    const json2 = getFixturePath('file2.json');
    expect(buildDiff(json1, json2, 'plain')).toMatchSnapshot();
  });

  test('format to json', () => {
    const json1 = getFixturePath('file1.json');
    const json2 = getFixturePath('file2.json');
    expect(buildDiff(json1, json2, 'json')).toMatchSnapshot();
  });

  test('works with yml', () => {
    const yml1 = getFixturePath('file1.yml');
    const yml2 = getFixturePath('file2.yml');
    expect(buildDiff(yml1, yml2)).toMatchSnapshot();
  });

  test('open existing file should log error message', () => {
    expect(() => buildDiff('doesnotexist.json', 'doesnt matter')).toThrow();
  });
});
