# Dashing Reporter

Logs Continuous Integration metrics to Amazon DynamoDB.

[![Build Status](https://travis-ci.org/fluxsauce/dashing-reporter.svg?branch=master)](https://travis-ci.org/fluxsauce/dashing-reporter)

## Installation

```bash
npm install dashing-reporter --save-dev
```

## Usage

```bash
./node_modules/.bin/dashing-reporter --help
```

By default, `dashing-reporter` will use a local configuration and not attempt to connect to AWS.

To use a custom config, copy `.dashingreporter.default.json` to `.dashingreporter.json` to the root of your project and modify to meet your needs.

If you want to use [Environmental Variables](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Environment_Variables) (and you should, because hard-coding credentials is a terrible idea), remove the corresponding settings from `.dashingreporter.json` and set them in your CI service.

| AWS Environmental Variable | `.dashingreporter.json` |
|----------------------------|-------------------------|
| `AWS_ACCESS_KEY_ID`        | `accessKeyId`           |
| `AWS_SECRET_ACCESS_KEY`    | `secretAccessKey`       |

A working [Travis CI](https://travis-ci.com/) configuration is included; see `.travis.yml` for details. This should theoretically work with Circle CI and others, but it hasn't been explicitly tested.

## Payload

Each Item has the following attributes:

|Attribute|Description|
|---|---|
| `branch` | For builds not triggered by a pull request this is the name of the branch currently being built; whereas for builds triggered by a pull request this is the name of the branch targeted by the pull request (in many cases this will be `master`). |                 
| `buildNumber` | The number of the current build (for example, `4`). |
| `commit` | The commit that the current build is testing. |
| `coverageBranchesPercentage` | Istanbul percentage of branches covered. |
| `coverageFunctionsPercentage` | Istanbul percentage of functions covered. |
| `coverageLinesPercentage` | Istanbul percentage of lines covered. |
| `coverageStatementsPercentage` | Istanbul percentage of statements covered. |
| `eslintErrorCount` | ESLint Error count. |
| `eslintWarningCount` | ESLint Warning count. |
| `jobNumber` | The number of the current job (for example, `4.1`. |
| `language` | Primary interpreting language name, like `node_js`. |
| `languageVersion` | Primary interpreting Language version, like `6.7`. |
| `repoSlug` | The slug (in form: `owner_name/repo_name` of the repository currently being built (for example, `fluxsauce/dashing-reporter`) |
| `testResult` | Set to 0 if the build is successful and 1 if the build is broken. |
| `timestamp` | Current time in ISO 8601 formatted string. |

## Local Development

[Install DynamoDB locally](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html#DynamoDBLocal.DownloadingAndRunning).

If you have [Homebrew](http://brew.sh/) installed, you can use the [dynamodb-local](http://brewformulas.org/DynamodbLocal) formula.

```bash
brew install dynamodb-local
```

If you don't have Java:

```bash
brew cask install java
```

You have two options for running the DynamoDB server, with persistence:

```bash
dynamodb-local --sharedDb
```

The database will be stored in `/usr/local/var/data/dynamodb-local`.

Alternative, you can run it in memory with no persistence:

```bash
dynamodb-local --sharedDb -inMemory
```

## Storage

For both hosted and local development, a DynamoDB table is required to store build metadata. The structure can be created with:

```bash
dashing-reporter --createTable
```
