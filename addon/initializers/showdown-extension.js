/* eslint-disable prettier/prettier */
/* global Prism */
import showdown from 'showdown';
import { assert } from '@ember/debug';

import { setup } from 'ember-prism';

setup();

// taken from prismjs, regex to detect newlines in text
const NEW_LINE_EXP = /\n(?!$)/g;

function getLineNumbersHTML(index, codeblock) {
  let match = codeblock.match(NEW_LINE_EXP);
  let linesNum = match ? match.length + 1 : 1;
  let lines = '';
  for (let i = 1; i < linesNum + 1; i++) {
    let id = `C${index}_L${i}`;
    lines += `<a href="#${id}" id=${id}></a>`
  }

  return `<span aria-hidden="true" class="line-numbers-rows">${lines}</span>`;
}

function stripQuotes(string) {
  if(string?.startsWith('"') && string?.endsWith('"')) {
    return string.substring(1, string.length - 1);
  }
  return string;
}

function diffInfo(args, codeblock) {
  if (args) {
    let lines = codeblock.split('\n');

    args.forEach(pD => {
      let operator = pD[0];
      let lineNo = +(pD.replace(operator, ''));
      let text = lines[lineNo - 1];
      if (operator === '+') {
        lines[lineNo - 1] = `<span class="diff-insertion"><span class="diff-operator">+</span>${text}</span>`;
      } else {
        lines[lineNo - 1] = `<span class="diff-deletion"><span class="diff-operator">-</span>${text}</span>`;
      }
    });
    codeblock = lines.join('\n');
  }
  return codeblock;
}

export function initialize(/* application */) {
  showdown.subParser('githubCodeBlocks', function (text, options, globals) {
    // early exit if option is not enabled
    if (!options.ghCodeBlocks) {
      return text;
    }

    text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);

    text += '¨0';

    let idCounter = 1;
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
        attributes[keyValue[0]] = stripQuotes(keyValue[1]);
      });

      let lineNumbersHTML = getLineNumbersHTML(idCounter, codeblock);
      idCounter++;

      let diffInfoArgs = attributes['data-diff']?.split(',');

      assert(`Language "${language}" not found. Have you configured Prism correctly?`, !language || Prism.languages[language]);

      if (language && Prism.languages[language]) {
        // Restore dollar signs & tremas temporarily so Prism won't highlight this
        // See https://github.com/showdownjs/showdown/blob/a9f38b6f057284460d6447371f3dc5dea999c0a6/src/converter.js#L285 for more info
        codeblock = codeblock.replace(/¨D/g, '$$');
        codeblock = codeblock.replace(/¨T/g, '¨');

        let highlightedCodeBlock = Prism.highlight(codeblock, Prism.languages[language], language) + end;
        highlightedCodeBlock = diffInfo(diffInfoArgs, highlightedCodeBlock);
        codeblock = `<pre class="language-${language} line-numbers"><code ${language ? `class="${language} language-${language}"` : ''}>${highlightedCodeBlock}${lineNumbersHTML}</code></pre>`;

        // Convert to the special characters Showdown uses again
        codeblock = codeblock.replace(/¨/g, '¨T');
        codeblock = codeblock.replace(/\$/g, '¨D');

        if(attributes['data-filename']) {
          codeblock = `<div class="filename ${language}"><div class="ribbon"></div><span>${attributes['data-filename'] || ''}</span>${codeblock}</div>`;
        }
      } else {
        codeblock = diffInfo(diffInfoArgs, codeblock);
        codeblock = `<pre class="language-none line-numbers"><code class="language-none">${codeblock}${lineNumbersHTML}</code></pre>`;
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
