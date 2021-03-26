import path from 'path';
import { describe, expect } from '@jest/globals';

import buildDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__/fixtures', filename);

const expected = `{
    common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
            key5: value5
        }
      setting6: {
        doge: {
        - wow: 
        + wow: so much
      }
        key: value
      + ops: vops
    }
  }
    group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
            key: value
        }
    + nest: str
  }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

describe('generates diff', () => {
  test('works with json', () => {
    const json1 = getFixturePath('file1.json');
    const json2 = getFixturePath('file2.json');
    expect(buildDiff(json1, json2)).toEqual(expected);
  });

  test('works with yml', () => {
    const yml1 = getFixturePath('file1.yml');
    const yml2 = getFixturePath('file2.yml');
    expect(buildDiff(yml1, yml2)).toEqual(expected);
  });

  test('open existing file should log error message', () => {
    expect(() => buildDiff('doesnotexist.json', 'doesnt matter')).toThrow();
  });
});
