Start with something simple

This is an inline code example `sh go do a thing`.

Let's make it a block
```
sh go do a thing
```

Adding a `javascript` as a language to get syntax highlighting
```javascript
let thing = 'face';
let myElement = $('.my-element');
```

Now let's do something a bit more complex

```handlebars {data-filename=app/templates/blog-post.hbs}
<h1>{{@model.title}}</h1>
<h2>by {{@model.author}}</h2>
<h3>{{ (count @model.posts) }} # posts</h3>

<div class="intro">
  {{@model.intro}}
</div>
<hr>
<div class="body">
  {{@model.body}}
</div>

<Nested::Component
  class="some classes
    {{if (this.someHelper this.foo 12)
       "classes when true"
       "classes when false"
    }}
  "
  @doAction={{fn this.someAction 120}}
  @argB={{hash
    foo="string"
    bar=true
    baz=120
    yolo=(array 12 "string" (hash foo=this.something))
    bax=(fn this.someAction 120)
  }}
  {{resize this.handleResize (fn this.idk 2 "str")}}
>
  <:block as |foo baz|>
    {{foo}}

    {{#let foo.bar 12 as |fooBar num|}}
      <fooBar @num={{num}} @arg={{12}} />
    {{/let}}

    {{! comment }}
    {{!-- block }}
      TODO: Indentation is broken after that
      comment --}}

    <baz.component />
  </:block>
</Nested::Component>
```

With some different file types

```javascript {data-filename=app/controllers/blog-post.js}
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class BlogPostController extends Controller {
  isExpanded = false

  @action
  toggleBody() {
    this.toggleProperty('isExpanded');
  }
}
```

Typescript never hurts

```typescript {data-filename=app/router.ts}
import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {});
```

With a diff: 

```javascript {data-filename="app/router.js" data-diff="+10,-11"}
import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('face');
});

export default Router;
```

With a diff on the first line: 

```javascript {data-filename="app/router.js" data-diff="-1,+2"}
import EmberRouter from '@ember/routing/router';
import EmberRouter from '@embroider/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
});

export default Router;
```
