Chrome Automation
=================

Chrome Automation seeks to create an acceptance and UI test runner in Chrome.  Useful especially for development where you might have to do things like repeatedly fill out forms to find bugs.

Config File Example:

```
[
  {
    "name" : "login",
    "file" " "path/to/test.js"
  },
  {
    "name" : "other tests",
    "subtests" : [
      {
        "name" : "other test",
        "file" : "path/to/other-test.js"
      }
    ]
  }
]
```