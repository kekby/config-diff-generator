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

const expectedPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

describe('generates diff', () => {
  test('works with json', () => {
    const json1 = getFixturePath('file1.json');
    const json2 = getFixturePath('file2.json');
    expect(buildDiff(json1, json2)).toEqual(expected);
  });

  test('json plain format', () => {
    const json1 = getFixturePath('file1.json');
    const json2 = getFixturePath('file2.json');
    expect(buildDiff(json1, json2, 'plain')).toEqual(expectedPlain);
  });

  test('format to json', () => {
    const json1 = getFixturePath('file1.json');
    const json2 = getFixturePath('file2.json');
    expect(buildDiff(json1, json2, 'json')).toMatchSnapshot();
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
