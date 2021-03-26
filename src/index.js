import fs from 'fs';
import path from 'path';
import parsers from './parsers/index.js';
import formatters from './formatters/index.js';
import buildDiff from './build-diff.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = fs.readFileSync(filepath1);
  const file2 = fs.readFileSync(filepath2);

  const ext = path.extname(filepath1).replace('.', '');
  const parse = parsers[ext];

  const obj1 = parse(file1);
  const obj2 = parse(file2);

  const diff = buildDiff(obj1, obj2);
  return formatters[format](diff);
};

export default genDiff;
