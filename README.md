# github-workflow-wildcard-tester
Test your GitHub Workflow wildcards (e.g. branches, file paths, etc.) to see what file paths they will match in your repo. Currently in alpha and might have bugs (hint: it does, I just have to find them.)

## How to use

```javascript
let matches = matchGithubPatterns(["releases/**", "!releases/**-alpha"], ["releases/10", "releases/beta/mona", "releases/10-alpha", "releases/beta/3-alpha"]);
console.log(matches); // [releases/10, releases/beta/mona]
```

For more information regarding the GitHub workflows wildcard syntax, see https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#onpushpull_requestbranchestags.

## Where are the unit tests?

I tried it with a few examples in their docs, including some which didn't work in three other glob-based JavaScript utilities I've tried and it passed. I'm working on getting official unit tests, however.

## Why not use X or Y instead?

Minimatch supports globstars in "the manner of bsdglob and bash 4.1", which is different than how GitHub supports them. This means that `releases/**-alpha` will match `releases/10` but not `releases/beta/mona` and some others. This isn't how GitHub's syntax works, and so this implementation aims to be 100% compatible with GitHub's syntax.
