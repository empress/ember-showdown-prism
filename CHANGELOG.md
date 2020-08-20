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
