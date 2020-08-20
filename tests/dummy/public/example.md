Start with something simple

This is an inline code example `sh go do a thing`.

Let's make it a block
```
sh go do a thing
```

Adding a `javascript` as a language to get syntax highlighting
```javascript
let thing = 'face';
```

Now let's do something a bit more complex

```handlebars {data-filename=app/templates/blog-post.hbs}
<h1>{{@model.title}}</h1>
<h2>by {{@model.author}}</h2>

<div class="intro">
  {{@model.intro}}
</div>
<hr>
<div class="body">
  {{@model.body}}
</div>
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
