'use strict';

var Funnel = require('broccoli-funnel');
const { join } = require('path');

module.exports = {
  name: require('./package').name,

  options: {
    babel: {
      plugins: [[require.resolve('babel-plugin-prismjs'), {
        components: [
          'apacheconf',
          'bash',
          'css',
          'handlebars',
          'http',
          'javascript',
          'json',
          'markup-templating',
          'ruby',
          'scss'
        ],
        plugins: ['line-numbers', 'normalize-whitespace'],
        theme: "okaidia"
      }]]
    }
  },

  treeForPublic: function() {
    return new Funnel(join(this.root, 'public'));
  },
};
