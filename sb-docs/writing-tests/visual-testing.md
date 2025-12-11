# Visual tests

Visual tests are the most efficient way to test your components. With the click of a button you can take snapshots of every story in your Storybook and compare those snapshots to baselines - last known "good" snapshots. Not only does this allow you to check the appearance of your components, but they are also able to check a large subset of component functionality without having to write or maintain any test code!

Storybook supports cross-browser visual testing natively using Chromatic, a cloud service made by the Storybook team. When you enable visual testing, every story is automatically turned into a test. This gives you instant feedback on UI bugs directly in Storybook.

## Install the addon

Add visual tests to your project by installing `@chromatic-com/storybook`, the official addon by Storybook maintainers:

```bash
npx storybook@latest add @chromatic-com/storybook
```

## Enable visual tests

When you start Storybook, you'll see a new addon panel for Visual Tests where you can run tests and view results.

Already using the Vitest addon? In the expanded testing widget, you'll now see a Visual tests section. Clicking the Run tests button at the bottom will run _all_ tests, both component and visual.

First, sign in to your Chromatic account. If you do not have an account, you can create one as part of the sign in process.

Once signed in, you will see your Chromatic account(s) and their projects. Either select one from the list or create a new one.

Now that you have linked your project to the addon, you can press the "Catch a UI change" button to run your first build of visual tests.

That first build will create the baseline snapshots for your stories, which will be compared against when you run visual tests again.

## Run visual tests

After you have made a code change, there are two ways to run visual tests in Storybook.

In the expanded testing widget in the sidebar, press the run button in the Visual tests section.

Or, in the Visual tests addon panel, press the run button in the top right corner of the panel.

Either method will send your stories to the cloud to take snapshots and detect visual changes.

## Review changes

If there are visual changes in your stories, they will be highlighted in the sidebar. Click the story and go to the Visual Tests addon panel to see which pixels changed.

If the changes are intentional, accept them as baselines locally. If the changes aren't intentional, fix the story and rerun the tests using the rerun button.

When you finish accepting changes as baselines in the addon, you're ready to push the code to your remote repository. This will sync baselines to the cloud for anyone who checks out your branch.

## Automate with CI

The addon is designed to be used in tandem with CI. We recommend using the addon to check for changes during development and then running visual tests in CI as you get ready to merge.

Changes you accept as baselines in the addon will get auto-accepted as baselines in CI so you don't have to review twice.

1. Add a step to your CI workflow to run Chromatic:
   - GitHub Actions
   - GitLab Pipelines
   - Bitbucket Pipelines
   - CircleCI
   - Travis CI
   - Jenkins
   - Azure Pipelines
   - Custom CI provider

2. Configure your CI to include environment variables to authenticate with Chromatic (project token).

## PR checks

Once you successfully set up Chromatic in CI, your pull/merge requests will be badged with a UI Tests check. The badge notifies you of test errors or UI changes that need to be verified by your team. Make the check required in your Git provider to prevent accidental UI bugs from being merged.

## Configure

The addon includes configuration options covering most use cases by default. You can also fine-tune the addon configuration to match your project's requirements via the `./chromatic.config.json` file:

| Option | Description |
| --- | --- |
| `projectId` | Automatically configured. Sets the value for the project identifier |
| `buildScriptName` | Optional. Defines the custom Storybook build script |
| `debug` | Optional. Output verbose debugging information to the console |
| `zip` | Optional. Recommended for large projects. Configures the addon to deploy your Storybook to Chromatic as a zip file |

Example configuration:

```json
{
  "buildScriptName": "deploy-storybook",
  "debug": true,
  "projectId": "Project:64cbcde96f99841e8b007d75",
  "zip": true
}
```

## FAQs

### What's the difference between visual tests and snapshot tests?

Snapshot tests compare the rendered markup of every story against known baselines. This means the test compares blobs of HTML and not what the user actually sees. Which in turn, can lead to an increase in false positives as code changes don't always yield visual changes in the component.

Visual tests compare the rendered pixels of every story against known baselines. Because you're testing the same thing your users actually experience, your tests will be richer and easier to maintain.
