import _ from 'lodash';

const stringTypes = [
  {
    string: () => '[complex value]',
    check: (value) => value instanceof Object,
  },
  {
    string: (value) => `'${value}'`,
    check: (value) => typeof value === 'string',
  },
  {
    string: (value) => value,
    check: () => true,
  },
];

const render = (ast) => {
  const inner = (currentAst, currentPropName = '') => {
    const mapper = (node) => {
      const propName = _.trim(`${currentPropName}.${node.name}`, '.');
      const buildString = (valueType) => stringTypes
        .find(({ check }) => check(node[valueType]))
        .string(node[valueType]);

      const stringOptions = {
        removed: () => `Property '${propName}' was removed`,
        nested: () => inner(node.children, propName),
        updated: () => `Property '${propName}' was updated. From ${buildString('oldValue')} to ${buildString('newValue')}`,
        added: () => `Property '${propName}' was added with value: ${buildString('value')}`,
      };
      return stringOptions[node.state]();
    };

    return currentAst.filter((n) => n.state !== 'unchanged').map(mapper).join('\n');
  };
  return inner(ast);
};

export default render;
