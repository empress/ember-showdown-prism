/* global Prism */
import showdown from 'showdown';

export function initialize(/* application */) {
  showdown.subParser('githubCodeBlocks', function (text, options, globals) {
    // early exit if option is not enabled
    if (!options.ghCodeBlocks) {
      return text;
    }

    text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);

    text += '¨0';

    text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\n`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function (wholeMatch, delim, languageBlock, inputCodeblock) {

      var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';

      let codeblock = inputCodeblock;

      // First parse the github code block
      // codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
      codeblock = showdown.subParser('detab')(codeblock, options, globals);
      codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
      codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

      let match = languageBlock.match(/(\w+) ?(\{([^}]*)\})?/);
      let language = '';
      let attributeString = '';

      if(match && match[1]) {
        language = match[1];
      }

      if (match && match[3]) {
        attributeString = match[3];
      }

      let attributes = {};

      attributeString.split(' ').forEach(attribute => {
        let keyValue = attribute.split('=');
        attributes[keyValue[0]] = keyValue[1];
      });

      // by default we will return codeblock
      let highlightedCodeBlock = codeblock;

      if (language) {
        highlightedCodeBlock = Prism.highlight(codeblock, Prism.languages[language], language) + end;
        codeblock = `<pre class="language-${language}"><code ${language ? `class="${language} language-${language}"` : ''}>${highlightedCodeBlock}</code></pre>`;

        if(attributes['data-filename']) {
          codeblock = `<div class="filename ${language}"><div class="ribbon"></div><span>${attributes['data-filename'] || ''}</span>${codeblock}</div>`;
        }
      } else {
        codeblock = `<pre><code>${codeblock}</code></pre>`;
      }


      codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);

      // Since GHCodeblocks can be false positives, we need to
      // store the primitive text and the parsed text in a global var,
      // and then return a token
      return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
    });

    // attacklab: strip sentinel
    text = text.replace(/¨0/, '');

    return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
  });
}

export default {
  initialize
};
