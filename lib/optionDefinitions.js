module.exports = [
  {
    name: 'buildNumber',
    type: Number,
    group: 'required',
    alias: 'n',
    description: 'The number of the current build (for example, "[italic]{4}").',
  },
  {
    name: 'repoSlug',
    type: String,
    group: 'required',
    alias: 's',
    description: 'The slug (in form: [italic]{owner_name/repo_name}) of the repository ' +
    'currently being built. (for example, "[italic]{fluxsauce/dashing-reporter}").',
  },
  {
    name: 'commit',
    type: String,
    group: 'required',
    alias: 'c',
    description: 'The commit that the current build is testing.',
  },
  {
    name: 'branch',
    type: String,
    group: 'required',
    alias: 'b',
    description: 'For builds not triggered by a pull request this is the name of the ' +
    'branch currently being built; whereas for builds triggered by a pull request this ' +
    'is the name of the branch targeted by the pull request (in many cases this ' +
    'will be [italic]{master}).',
  },
  {
    name: 'pullRequest',
    type: Number,
    group: 'optional',
    description: 'The pull request number if the current job is a pull request, ' +
    '[italic]{false} if it’s not a pull request.',
  },
  {
    name: 'pullRequestBranch',
    group: 'optional',
    type: String,
    description: 'If the current job is a pull request, the name of the branch ' +
    'from which the PR originated. "" if the current job is a push build.',
  },
  {
    name: 'pullRequestSha',
    type: String,
    group: 'optional',
    description: 'If the current job is a pull request, the commit SHA of the ' +
    'HEAD commit of the PR. If it is a push build, "".',
  },
  {
    name: 'testResult',
    type: Number,
    group: 'required',
    alias: 'r',
    description: 'Set to 0 if the build is successful and 1 if the build is broken.',
  },
  {
    name: 'language',
    type: String,
    group: 'required',
    alias: 'l',
    description: 'Primary interpreting language name, like [italic]{nodejs}.',
  },
  {
    name: 'languageVersion',
    type: String,
    group: 'required',
    alias: 'v',
    description: 'Primary interpreting Language version, like [italic]{6.7}.',
  },
  {
    name: 'istanbulSummaryJson',
    type: String,
    alias: 'i',
    group: 'parsed',
    description: 'Path to Istanbul JSON summary file, like ' +
      '[italic]{./coverage/coverage-summary.json}',
  },
  {
    name: 'eslintJson',
    type: String,
    alias: 'e',
    group: 'parsed',
    description: 'Path to ESLint report in JSON format, like [italic]{./coverage/eslint.json}',
  },
  {
    name: 'help',
    alias: 'h',
    description: 'Print this usage guide.',
  },
  {
    name: 'createTable',
    description: 'Creates Table in DynamoDB',
  },
];
