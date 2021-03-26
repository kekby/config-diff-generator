import yamlParser from 'js-yaml';

export default {
  json: JSON.parse,
  yml: yamlParser.load,
};
