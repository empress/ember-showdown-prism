Start with something simple

```
sh go do a thing
```

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
