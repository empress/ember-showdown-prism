/* eslint-disable prettier/prettier */
'use strict';

var Funnel = require('broccoli-funnel');
const { join } = require('path');

module.exports = {
  name: require('./package').name,

  treeForPublic: function() {
    return new Funnel(join(this.root, 'public'));
  },

  included() {
    let app = findHost(this);
    if(!app.options['ember-prism']) {
      app.options['ember-prism'] = {
        theme: 'okaidia',

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
          'scss',
          'yaml',
          'typescript',
          'diff',
        ],
      }
    }

    this._super.included.apply(this, arguments)
  },
};

// Polyfill [Addon._findHost](https://ember-cli.com/api/classes/Addon.html#method__findHost) for older versions of ember-cli
function findHost(addon) {
  var current = addon;
  var app;

  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));

  return app;
}
