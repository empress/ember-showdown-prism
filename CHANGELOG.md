

## v4.4.0 (2023-09-29)

#### :rocket: Enhancement
* [#58](https://github.com/empress/ember-showdown-prism/pull/58) add json5, line-numbers, and normalize-whitespace ([@lupestro](https://github.com/lupestro))

#### Committers: 1
- Ralph Mack ([@lupestro](https://github.com/lupestro))

## v4.3.0 (2023-09-29)

#### :rocket: Enhancement
* [#51](https://github.com/empress/ember-showdown-prism/pull/51) Use the setup function from ember-prism ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :bug: Bug Fix
* [#57](https://github.com/empress/ember-showdown-prism/pull/57) Fix data-diff first line bug ([@fry69](https://github.com/fry69))

#### Committers: 2
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)
- [@fry69](https://github.com/fry69)

4.2.0 / 2023-07-10
==================

* add support for data-diff usage in code block #53 from @mansona

4.1.0 / 2023-07-03
==================

* move ember-prism back to dependencies #49 from @mansona

4.0.0 / 2023-07-03
==================

* update to v5.0 with ember-cli-update #47 from @mansona
* move showdown to a peer dependency #45 from @mansona
* breaking: drop support for node &lt; 16 #46 from @mansona

3.2.0 / 2022-08-06
==================
* update ember-prism #31 from @mansona
* fix ember-try npm overrides #27 from @mansona

3.1.0 / 2022-05-05
==================
* add typescript and diff components #25 from @mansona

3.0.0 / 2021-12-31
==================

  * update with ember-cli-update to 3.28 #20 from @mansona
  * add a basic test #19 from @mansona
  * Breaking: drop Node 10 and unify github ci workflow with blueprint #18 from @mansona

2.3.0 / 2021-08-12
==================

  * fix dollar signs in codeblocks breaking when running through Prism #13 from @nickschot
  * add a `$` to the demo app to demonstrate the issues with it #14 from @nickschot
  * update with ember-cli-update #16 from @mansona
  * Move from travis to github actions #15 from @mansona
  * add prember for netlify example app #10 from @mansona
  * add a better README #9 from @mansona

2.2.0 / 2020-08-20
==================

  * add linkable line numbers to highlighted code blocks #8 from @nickschot

2.1.0 / 2020-08-19
==================

  * add assertion if missing language is used & fallback to non-prism rendering #5 from @nickschot
  * add YAML to the default enabled languages #6 from @nickschot

2.0.0 / 2020-08-17
==================

This is only a breaking change because it dropped support for Node 8 and Ember < 3.12. They will likely continue to work for a little while but we are no longer testing them 👍

  * use findHost to find the app (fixes non-working prism when using this addon indirectly) #4 from @nickschot
  * Breaking: Update dependencies #2 from @mansona
