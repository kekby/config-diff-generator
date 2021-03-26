import _ from 'lodash';

const checks = [
  {
    check: (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    process: (obj1, obj2, key, f) => ({ name: key, state: 'nested', children: f(obj1[key], obj2[key]) }),
  },
  {
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key],
    process: (obj1, obj2, key) => ({
      name: key,
      state: 'unchanged',
      value: obj1[key],
    }),
  },
  {
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key]),
    process: (obj1, obj2, key) => ({
      name: key,
      state: 'updated',
      oldValue: obj1[key],
      newValue: obj2[key],
    }),
  },
  {
    check: (obj1, obj2, key) => _.has(obj1, key),
    process: (obj1, obj2, key) => ({ name: key, state: 'removed', value: obj1[key] }),
  },
  {
    check: (obj1, obj2, key) => _.has(obj2, key),
    process: (obj1, obj2, key) => ({ name: key, state: 'added', value: obj2[key] }),
  },
];

const buildDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const diff = _.sortBy(keys, (key) => key).map((key) => {
    const { process } = _.find(checks, (item) => item.check(obj1, obj2, key));
    return process(obj1, obj2, key, buildDiff);
  });

  return diff;
};

export default buildDiff;
