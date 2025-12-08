<p align="center">
  <a href="https://main--632a01c394385880b3383063.chromatic.com" target="_blank">
    <img src="https://digital3.nyc3.cdn.digitaloceanspaces.com/mui-storybook.gif" alt="storybook gif" align="center" />
    <h1 align="center">MUI Storybook</h1>
  </a>
</p>

<p align="center">
  <a href="https://main--632a01c394385880b3383063.chromatic.com">
    <img src="https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg" alt="Storybook" />
  </a>
  <a href="https://github.com/laststance/mui-storybook/actions/workflows/chromatic.yml">
    <img src="https://github.com/laststance/mui-storybook/actions/workflows/chromatic.yml/badge.svg" alt="Chromatic" />
  </a>
  <a href="https://github.com/laststance/mui-storybook/actions/workflows/build.yml">
    <img src="https://github.com/laststance/mui-storybook/actions/workflows/build.yml/badge.svg" alt="Build" />
  </a>
  <a href="https://github.com/laststance/mui-storybook/actions/workflows/typecheck.yml">
    <img src="https://github.com/laststance/mui-storybook/actions/workflows/typecheck.yml/badge.svg" alt="TypeCheck" />
  </a>
</p>

A comprehensive [Storybook](https://storybook.js.org/) showcase for [MUI v7](https://mui.com/) components with React 19.

## Features

| Feature | Description |
|---------|-------------|
| **51 Components** | Complete MUI component coverage |
| **Theme Switching** | Light/dark mode via toolbar |
| **Interaction Tests** | Automated UI testing with play functions |
| **A11y Testing** | axe-playwright accessibility checks |
| **Design Tokens** | Comprehensive token documentation |
| **Real-World Examples** | Dashboard, Payment, Mobile Landing |

## Tech Stack

| Technology | Version |
|------------|---------|
| React | 19.2.1 |
| MUI | 7.3.5 |
| Storybook | 10.1.4 |
| TypeScript | 5.9.3 |
| Vite | 6.3.5 |

## Installation (Storybook Composition)

Add to your `.storybook/main.ts`:

```ts
export default {
  refs: {
    'mui-storybook': {
      title: "MUI Storybook",
      url: "https://main--632a01c394385880b3383063.chromatic.com/",
    }
  },
}
```

Then start your Storybook - MUI Storybook will appear in your sidebar.

<img src="https://digital3.nyc3.cdn.digitaloceanspaces.com/mui-storybook-install.png" alt="installation" />

## Local Development

```sh
git clone https://github.com/laststance/mui-storybook.git
cd mui-storybook
pnpm install
pnpm storybook    # Launch dev server on port 6006
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm storybook` | Start development server |
| `pnpm build` | Build static Storybook |
| `pnpm gen <Name>` | Generate component scaffold |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | TypeScript validation |
| `pnpm test-storybook` | Run interaction tests |
| `pnpm validate` | Run all checks (lint, typecheck, build) |

## Contributing

1. Fork the repository and create your branch from `main`
2. Run `pnpm install`
3. Run `pnpm storybook`
4. Generate new component: `pnpm gen <ComponentName>`
5. Run `pnpm validate` before submitting PR

```shell
$ pnpm gen Paper
✔  ++ /src/components/Paper/Paper.tsx
✔  ++ /src/components/Paper/Paper.stories.tsx
```

## License

MIT

## Contributors

Thanks to all contributors! ([emoji key](https://allcontributors.org/docs/en/emoji-key))

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://ryota-murakami.github.io/"><img src="https://avatars1.githubusercontent.com/u/5501268?s=400&u=7bf6b1580b95930980af2588ef0057f3e9ec1ff8&v=4?s=100" width="100px;" alt=""/><br /><sub><b>ryota-murakami</b></sub></a><br /><a href="https://github.com/laststance/mui-storybook/commits?author=ryota-murakami" title="Code">💻</a> <a href="https://github.com/laststance/mui-storybook/commits?author=ryota-murakami" title="Documentation">📖</a> <a href="https://github.com/laststance/mui-storybook/commits?author=ryota-murakami" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
