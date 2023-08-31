import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('pre.language-none code.language-none').isVisible();
    assert
      .dom('pre.language-none code.language-none')
      .hasText('sh go do a thing');

    assert.dom('pre.language-javascript code.language-javascript').isVisible();
    assert
      .dom('pre.language-javascript code.language-javascript')
      .hasText(`let thing = 'face'; let myElement = $('.my-element');`);

    assert.dom('div.filename .ribbon').isVisible();
    assert.dom('div.filename span').hasText('app/templates/blog-post.hbs');
    assert.dom('pre.language-handlebars code.language-handlebars').isVisible();
    assert
      .dom('pre.language-handlebars code.language-handlebars')
      .containsText(
        `<h1>{{@model.title}}</h1> <h2>by {{@model.author}}</h2> <h3>{{ (count @model.posts) }} # posts</h3> <div class="intro"> {{@model.intro}} </div> <hr> <div class="body"> {{@model.body}} </div>`
      );
  });
});
