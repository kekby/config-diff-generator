import fs from 'fs';
import buildDiff from './build-diff.js';
import renderRich from './renders/render-rich.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = fs.readFileSync(filepath1);
  const file2 = fs.readFileSync(filepath2);

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  const diff = buildDiff(obj1, obj2);
  return renderRich(diff);
};

export default genDiff;
