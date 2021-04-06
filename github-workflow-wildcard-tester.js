class Pattern {
    constructor(pattern, shouldInvert) {
        this.pattern = pattern;
        this.shouldInvert = shouldInvert;
    }
}

function matchGithubPatterns(patterns, _haystack) {
    let regexes = patterns.map(pattern => {
        let _pattern = pattern.replaceAll(".", "\\.")
        .replaceAll("(", "\\(")
        .replaceAll(")", "\\)")
        .replaceAll("^", "\^")
        .replaceAll("$", "\$")
        .replaceAll("/", "\/")
        .replaceAll("|", "\|")
        .replaceAll("{", "\{")
        .replaceAll("}", "\}")
        .replaceAll("**/", "__GITHUB_WORKFLOW_WILDCARD_TESTER_DOT_STAR_RESERVED__")
        .replaceAll("**", "__GITHUB_WORKFLOW_WILDCARD_TESTER_DOT_STAR_RESERVED__")
        .replaceAll("*", "[^\/]*")
        .replaceAll("__GITHUB_WORKFLOW_WILDCARD_TESTER_DOT_STAR_RESERVED__", ".*");

        let shouldInvert = false;
        if (_pattern[0] === '!') {
            _pattern = _pattern.substring(1);
            shouldInvert = true;
        }

        _pattern = "^" + _pattern + "$";
        return new Pattern(_pattern, shouldInvert);
    });

    let matches = new Set()

    _haystack.forEach(item => {
        regexes.forEach(regex => {
          let matchesPattern = (new RegExp(regex.pattern)).test(item);
            if (matchesPattern) {
                if (regex.shouldInvert) {
                  matches.remove(item);
                } else {
                  matches.add(item);
                }
            }
        });
    });

    return matches;
}

let results = matchGithubPatterns(["docs/**/*.md"], ["docs/mona/hello-world.md"]);
console.log([...results]);
