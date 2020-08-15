'use strict';

var Funnel = require('broccoli-funnel');
const { join } = require('path');

module.exports = {
  name: require('./package').name,

  included() {
    let app = this._findHost(this);

    app.import('node_modules/prismjs/prism.js');
    app.import('node_modules/prismjs/themes/prism-okaidia.css');
    app.import('node_modules/prismjs/components/prism-apacheconf.js');
    app.import('node_modules/prismjs/components/prism-bash.js');
    app.import('node_modules/prismjs/components/prism-css.js');
    app.import('node_modules/prismjs/components/prism-handlebars.js');
    app.import('node_modules/prismjs/components/prism-http.js');
    app.import('node_modules/prismjs/components/prism-javascript.js');
    app.import('node_modules/prismjs/components/prism-json.js');
    app.import('node_modules/prismjs/components/prism-markup-templating.js');
    app.import('node_modules/prismjs/components/prism-ruby.js');
    app.import('node_modules/prismjs/components/prism-scss.js');

    app.import('node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js');
    app.import('node_modules/prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js');

    this._super.included.apply(this, arguments);
  },

  treeForPublic: function() {
    return new Funnel(join(this.root, 'public'));
  },
};
