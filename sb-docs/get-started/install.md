# Install Storybook

Use the Storybook CLI to install it in a single command. Run this inside your project's root directory:

```bash
npm create storybook@latest
```

Storybook will look into your project's dependencies during its install process and provide you with the best configuration available.

## Project requirements

Storybook is designed to work with a variety of frameworks and environments. If your project is using one of the packages listed here, please ensure that you have the following versions installed:

- Angular 18+
- Lit 3+
- Next.js 14+
- Node.js 20+
- npm 10+
- pnpm 9+
- Preact 8+
- React Native 0.72+
- React Native Web 0.19+
- Svelte 5+
- SvelteKit 1+
- TypeScript 4.9+
- Vite 5+
- Vitest 3+
- Vue 3+
- Webpack 5+
- Yarn 4+

Additionally, the Storybook app supports the following browsers:

- Chrome 131+
- Edge 134+
- Firefox 136+
- Safari 18.3+
- Opera 117+

### How do I use Storybook with older browsers?

You can use Storybook with older browsers in two ways:

1. Use a version of Storybook prior to `9.0.0`, which will have less strict requirements.
2. Develop or build your Storybook in "preview-only" mode, which can be used in older, unsupported browsers.

## Installation

Run this command inside your project's root directory to install the latest version of Storybook:

```bash
npm create storybook@latest
```

### Install a specific version

For installing Storybook 8.3 or newer, you can use the `create` command with a specific version:

```bash
npm create storybook@8.3
```

To install a Storybook version prior to 8.3, you must use the `init` command:

```bash
npx storybook@8.2 init
```

For either command, you can specify either an npm tag such as `latest` or `next`, or a (partial) version number. For example:

- `storybook@latest init` will initialize the latest version
- `storybook@7.6.10 init` will initialize `7.6.10`
- `storybook@7 init` will initialize the newest `7.x.x` version

## Interactive prompts

When installing, Storybook will present you with a series of interactive prompts to help customize your installation:

### New to Storybook?

Storybook will ask if you're new to Storybook. If you select "Yes":

- You will be welcomed with an interactive tour
- Example stories will be created to help you learn

If you're experienced with Storybook, you can skip the onboarding to get a minimal setup.

### What configuration should we install?

Storybook will ask what type of configuration you want to install:

- **Recommended**: Includes component development, documentation, testing, and accessibility features
- **Minimal**: Just the essentials for component development

You can also manually select these features using the `--features` flag:

```bash
npm create storybook@latest --features docs test a11y
```

After completing the prompts, the command above will make the following changes to your local environment:

- Install the required dependencies.
- Set up the necessary scripts to run and build Storybook.
- Add the default Storybook configuration.
- Add some boilerplate stories to get you started.
- Set up telemetry to help us improve Storybook.

## Run the Setup Wizard

If all goes well, you should see a setup wizard that will help you get started with Storybook introducing you to the main concepts and features, including how the UI is organized, how to write your first story, and how to test your components' response to various inputs utilizing controls.

If you skipped the wizard, you can always run it again by adding the `?path=/onboarding` query parameter to the URL of your Storybook instance, provided that the example stories are still available.

## Start Storybook

Storybook comes with a built-in development server featuring everything you need for project development. Depending on your system configuration, running the `storybook` command will start the local development server, output the address for you, and automatically open the address in a new browser tab where a welcome screen greets you.

```bash
npm run storybook
```

> Storybook collects completely anonymous data to help us improve user experience. Participation is optional, and you may opt-out if you'd not like to share any information.

## Troubleshooting

### Run Storybook with other package managers

The Storybook CLI includes support for the industry's popular package managers (e.g., Yarn, npm, and pnpm) automatically detecting the one you are using when you initialize Storybook. However, if you want to use a specific package manager as the default, add the `--package-manager` flag to the installation command:

```bash
npm create storybook@latest --package-manager=npm
```

### The CLI doesn't detect my framework

If auto-detection fails or you're using a custom setup, pass the project type explicitly with `--type` when running the initializer. The allowed values are:

| Type | Framework |
| --- | --- |
| `angular` | Angular |
| `nextjs` | Next.js |
| `preact` | Preact |
| `react` | React |
| `react_native` | React Native |
| `react_native_web` | React Native Web |
| `solid` | Solid |
| `svelte` | Svelte |
| `sveltekit` | SvelteKit |
| `vue3` | Vue 3 |
| `web_components` | Web Components |

```bash
npm create storybook@latest --type react
```

### Yarn Plug'n'Play (PnP) support with Storybook

If you've enabled Storybook in a project running on a new version of Yarn with Plug'n'Play (PnP) enabled, you may notice that it will generate `node_modules` with some additional files and folders. This is a known constraint as Storybook relies on some directories (e.g., `.cache`) to store cache files and other data to improve performance and faster builds. You can safely ignore these files and folders, adjusting your `.gitignore` file to exclude them from the version control you're using.

### Run Storybook with Webpack 4

If you previously installed Storybook in a project that uses Webpack 4, it will no longer work. This is because Storybook now uses Webpack 5 by default. To solve this issue, we recommend you upgrade your project to Webpack 5 and then run the following command to migrate your project to the latest version of Storybook:

```bash
npx storybook@latest automigrate
```

### Storybook doesn't work with an empty directory

By default, Storybook is configured to detect whether you're initializing it on an empty directory or an existing project. However, if you attempt to initialize Storybook, select a Vite-based framework (e.g., React) in a directory that only contains a `package.json` file, you may run into issues with Yarn Modern. This is due to how Yarn handles peer dependencies and how Storybook is set up to work with Vite-based frameworks, as it requires the Vite package to be installed. To solve this issue, you must install Vite manually and initialize Storybook.

### The installation process seems flaky and keeps failing

If you're still running into some issues during the installation process, we encourage you to check out the following resources:

- Storybook's React Vite framework documentation for more information on how to set up Storybook in your React project with Vite.
- Storybook's React Webpack framework documentation for more information on how to set up Storybook in your React project with Webpack 5.
- Storybook's help documentation to contact the community and ask for help.

Now that you have successfully installed Storybook and understood how it works, let's continue where you left off in the setup wizard and delve deeper into writing stories.
