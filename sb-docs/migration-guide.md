# Migration guide for Storybook 10

Storybook 10 is a breaking maintenance release focused on ESM-only package distribution. Its main features include:

- ESM-only to reduce install size
- CSF Next preview with better typesafety and autocompletion
- Improved tags-based filtering

Coming soon:

- Familiar and ergonomic CSF test functions (experimental)

This guide is meant to help you **upgrade from Storybook 9.x to 10** successfully!

**Note:** Migrating from a Storybook version prior to 9? You'll first need to upgrade to Storybook 9 first. Then you can return to this guide.

## Major breaking changes

Here are the most impactful changes you should know about before you go further:

- Main configuration (`.storybook/main.js|ts`) and other presets must be valid ESM
- Node 20.19+ or 22.12+ is now required

If any of these changes apply to your project, please read through the migration notes before continuing.

If any of these new requirements or changes are blockers for your project, we recommend to continue using Storybook 8.x.

## Automatic upgrade

To upgrade your Storybook, run the upgrade command in the root of your repository:

```bash
npx storybook@latest upgrade
```

This will:

1. Find all of the Storybook projects in your repository
2. For each project:
   - Determine that none of the breaking changes apply to your project
   - If they do, you will receive instructions on how to resolve them before continuing
   - Upgrade your Storybook dependencies to the latest version
   - Run a collection of automigrations, which will:
     - Check for common upgrade tasks
     - Explain the necessary changes with links to more information
     - Ask for approval, then perform the task automatically on your behalf

## New projects

To add Storybook to a project that isn't currently using Storybook:

```bash
npm create storybook@latest
```

This will:

1. Figure out which renderer (React, Vue, Angular, Web Components), builder (Webpack, Vite), or meta-framework (Next.js, SvelteKit) you're using
2. Install Storybook 10 and auto-configure it to mirror project settings

## Troubleshooting

The automatic upgrade should get your Storybook into a working state. If you encounter an error running Storybook after upgrading, here's what to do:

1. Try running the `doctor` command to check for common issues (such as duplicate dependencies, incompatible addons, or mismatched versions) and see suggestions for fixing them.
2. If you're running `storybook` with the `dev` command, try using the `build` command instead. Sometimes `build` errors are more legible than `dev` errors!
3. Check the full migration notes, which contains an exhaustive list of noteworthy changes in Storybook 10.
4. Search Storybook issues on GitHub. If you're seeing a problem, there's a good chance other people are too.
5. If there's no existing issue, you can file one, ideally with a reproduction attached.

### Debugging tips

1. Try removing all addons that are not in the `@storybook` npm namespace. Community addons that work well with 9.x might not yet be compatible with 10.x.
2. Another debugging technique is to bisect to older prerelease versions of Storybook to figure out which release broke your Storybook.

## Optional migrations

### `test-runner` to `addon-vitest`

`addon-vitest` and the rest of the Storybook Test experience is designed to supercede the `test-runner`. It's faster and provides a better experience for writing and running tests. If your project uses React, Vue, or Svelte and is built with Vite, you should consider migrating to `addon-vitest`, by following the installation instructions.
