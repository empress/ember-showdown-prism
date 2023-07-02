# ember-showdown-prism

ember-showdown-prism is a drop-in addon that automatically adds [Prism](https://prismjs.com/) syntax highlighting to code blocks if you are using [showdown](https://github.com/showdownjs/showdown) to render your Markdown.

This addon also provides filename wrappers to the code block, with filetype icons, if a code block is marked with a `data-filename` attribute:

```markdown

````handlebars {data-filename=app/templates/blog-post.hbs}
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
```

![example of the above code sample](https://user-images.githubusercontent.com/594890/91036439-3f524980-e5ff-11ea-910b-b655f036b439.png)

You will also notice that the code sample has line numbers, this is built-in behaviour and they will be added to all code blocks. The line numbers also have anchors with ids added, which makes them clickable in Fastboot or prember environments.

This is also specifically designed to work in Node environments so that it can run effectively in Fastboot and prember 🎉 and as it is a drop-in addon it will automatically start working if added to any [Empress](https://github.com/empress) projects, so it can be used to add syntax highlighting to your [empress-blog](https://github.com/empress/empress-blog) if your template doesn't already provide syntax highlighting.

This addon is building on top of the great work of [ember-cli-showdown](https://github.com/gcollazo/ember-cli-showdown) and [ember-prism](https://github.com/shipshapecode/ember-prism).


## Compatibility

* Ember.js v3.16 or above
* Ember CLI v3.16 or above
* Node.js v16 or above


## Installation

```
ember install ember-showdown-prism
```


## Usage

Most people don't need to do anything to configure this addon as it comes with a sensible set of default languages that it supports, but if you want to customise the languages that Prism has access to then you can follow the [ember-prism documentation on adding language](https://github.com/shipshapecode/ember-prism#configuration)

Note: because of the limitations of using Prism in a Node environment you cannot use most prism plugins, essentially you cannot use anything that requires the DOM element while the plugin code is running.


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
