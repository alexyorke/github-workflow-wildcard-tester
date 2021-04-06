class Pattern {
    constructor(pattern, shouldInvert) {
        this.pattern = pattern;
        this.shouldInvert = shouldInvert;
    }
}

function matchGithubPatterns(patterns, paths) {
    if (!Array.isArray(patterns)) throw new Error("Patterns must be an array");
    if (!Array.isArray(paths)) throw new Error("Paths must be an array");

    if (patterns.length === 0) throw new Error("At least one pattern must be specified");
    if (paths.length === 0) throw new Error("At least one path must be specified");

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

    paths.forEach(path => {
        regexes.forEach(regex => {
            let matchesPattern = (new RegExp(regex.pattern)).test(path);
            if (matchesPattern) {
                if (regex.shouldInvert) {
                    matches.delete(path);
                } else {
                    matches.add(path);
                }
            }
        });
    });

    return [...matches];
}
