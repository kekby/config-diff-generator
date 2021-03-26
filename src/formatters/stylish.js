import _ from 'lodash';

const objectStringify = (object, depth) => {
  const indent1 = _.repeat(' ', depth * 4 + 8);
  const indent2 = _.repeat(' ', depth * 4 + 4);
  const keys = Object.keys(object);
  const mapper = (key) => {
    const value = _.isObject(object[key]) ? objectStringify(object[key], depth + 1) : object[key];
    return `${indent1}${key}: ${value}`;
  };
  const currentString = keys.map(mapper).join('\n');
  return `{\n${currentString}\n${indent2}}`;
};

const render = (ast) => {
  const inner = (currentAst, depth) => {
    const indent1 = _.repeat(' ', depth * 4 + 2);
    const indent2 = _.repeat(' ', depth * 4);

    const mapper = (node) => {
      const buildString = (valueType) => {
        const nodeElement = node[valueType];
        return _.isObject(nodeElement) ? objectStringify(nodeElement, depth) : nodeElement;
      };

      const stringOptions = {
        removed: () => `${indent1}- ${node.name}: ${buildString('value')}`,
        nested: () => `${indent1}  ${node.name}: ${inner(node.children, depth + 1)}`,
        updated: () => `${indent1}- ${node.name}: ${buildString('oldValue')}\n`
          + `${indent1}+ ${node.name}: ${buildString('newValue')}`,
        unchanged: () => `${indent1}  ${node.name}: ${buildString('value')}`,
        added: () => `${indent1}+ ${node.name}: ${buildString('value')}`,
      };
      return stringOptions[node.state]();
    };

    const mapped = currentAst.map(mapper).join('\n');
    return `{\n${mapped}\n${indent2}}`;
  };
  return inner(ast, 0);
};

export default render;
