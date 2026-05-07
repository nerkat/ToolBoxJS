# ToolBoxJS

ToolBoxJS is a component-based frontend framework for Shopify theme development.

It was built to give Shopify teams a cleaner, faster, and more maintainable way to develop interactive theme sections using a modern frontend workflow on top of Shopify's native theme architecture.

Instead of scattering Liquid, styles, schema, and JavaScript across unrelated files, ToolBoxJS treats each section as a self-contained module with a predictable structure and a build pipeline that produces Shopify-ready output.

[![Shopify][Shopify.com]][Shopify-url]
[![TypeScript][TypeScript.com]][TypeScript-url]
[![sass][sass.com]][sass-url]
[![nodejs][nodejs.com]][nodejs-url]
[![Webpack][Webpack.com]][Webpack-url]
[![npm][npm.com]][npm-url]
[![babeljs][babeljs.com]][babeljs-url]
[![ESLint][ESLint.com]][ESLint-url]
[![stylelint][stylelint.com]][stylelint-url]
[![PostCSS][PostCSS.com]][PostCSS-url]
[![Mocha][Mocha.com]][Mocha-url]

## Why ToolBoxJS Exists

Shopify theme work becomes messy quickly when multiple frontend developers each create their own structure, conventions, and patterns for sections.

Common team problems:

- inconsistent section architecture
- duplicated setup work for every new section
- poor separation between Liquid, schema, styling, and behavior
- awkward handling of dynamic theme values inside CSS and JavaScript
- slower onboarding for new developers
- fragile builds and harder maintenance over time

ToolBoxJS was built to solve those problems with one repeatable system.

## What It Does

ToolBoxJS introduces a component-based workflow for Shopify sections.

Each section lives in its own folder and is made up of four source files:

- `ComponentName.liquid`
- `ComponentName.scss`
- `ComponentName.ts`
- `ComponentName.json`

Those files are then compiled and assembled into Shopify-ready output that can be used directly in the theme.

## Core Ideas

### 1. One Folder Per Section

Every section is treated as a self-contained frontend module with:

- markup
- styles
- behavior
- schema

This gives the whole team a predictable mental model and makes the codebase easier to navigate.

### 2. CLI Scaffolding

ToolBoxJS can generate a new section from the command line, including:

- the component folder
- the Liquid file
- the SCSS file
- the TypeScript file
- the JSON schema file
- starter boilerplate

This removes repetitive setup and makes the preferred architecture the easiest one to follow.

### 3. Sensible First-Run Automation

On first run, ToolBoxJS does more than just drop files into a project.

The bootstrap flow can:

- create the required folder structure
- generate the development config files
- generate build and tooling files
- create helper utilities
- add the JavaScript bundle reference to `theme.liquid`
- add the CSS bundle render to `theme.liquid`

That means a Shopify project can go from raw theme structure to a real frontend development environment in one guided setup flow.

Example of what gets injected into `theme.liquid`:

```liquid
<script src="{{ 'bundle.js' | asset_url }}" defer="defer"></script>
<style>{% render 'bundle.css' %}</style>
```

This is one of the most useful quality-of-life features in the framework because it removes easy-to-forget manual setup steps and makes project initialization more consistent across teams.

### 4. Modern Frontend Build Workflow

The framework uses TypeScript, SCSS, Webpack, PostCSS, Babel, and linting/tooling to create a cleaner developer experience while still targeting Shopify themes.

It separates source code from final theme output so developers can work in a modern environment without losing Shopify compatibility.

### 5. Inline CSS and JavaScript With Liquid Variables

One of the most useful parts of the workflow is that compiled CSS and JavaScript can be rendered inline into the final Liquid output.

That makes it possible to use Liquid variables directly inside styling and behavior, which is especially valuable inside Shopify's constraints.

Example use cases:

- typography values controlled by theme settings
- spacing and layout values driven by section schema
- JS behavior that depends directly on Liquid-rendered configuration

### 6. Smarter Sections by Default

ToolBoxJS was designed to make Shopify sections more interactive and maintainable by default.

Instead of sections being treated as isolated Liquid fragments, the framework encourages a stronger component mindset with reusable structure, clearer ownership, and better behavior patterns.

### 7. Theme Bootstrap

The installation flow can help bootstrap the development environment by:

- creating required folders
- creating config and tooling files
- adding bundle references to `theme.liquid`
- preparing the project structure for development

That reduces setup friction and makes it easier to standardize project starts across a team.

### 8. Section Utilities

ToolBoxJS also includes helper utilities for working with Shopify sections in the browser.

Examples include:

- refreshing section DOM through Shopify's section rendering API
- loading-state UI helpers
- section-level runtime utilities

## Architecture Highlights

### Component Structure

Each section is structured like this:

```text
components/
  HeroComp/
    HeroComp.liquid
    HeroComp.scss
    HeroComp.ts
    HeroComp.json
```

### Generated SCSS Base Template

The generated SCSS starts from an encapsulated component boundary using `:host`, which helps prevent cross-component style leakage and keeps section styling scoped by default.

Example:

```scss
:host {
  h1 {
    font-size: '{{ section.settings.fontsize_title | append: "px" }}';
    line-height: '{{ section.settings.lineheight_title | append: "px" }}';
  }

  button {
    font-size: '{{ section.settings.fontsize_button | append: "px" }}';
    line-height: '{{ section.settings.lineheight_button | append: "px" }}';
  }
}
```

This is a good example of the framework's design philosophy:

- styles are scoped cleanly
- Liquid settings can directly influence output
- sections start from a predictable and reusable styling model

### Generated JavaScript / TypeScript Base Template

The generated component script gives developers an immediate starting point for connecting behavior to the section view.

Example:

```ts
import { LitElement, html, css, unsafeCSS } from 'lit';
import styles from './compFormattedName.scss';

class compFormattedName extends LitElement {
  static styles = css`${unsafeCSS(styles)}`;

  render() {
    return html`<!-- PLACEHOLDER_TEMPLATE -->`;
  }
}

customElements.define('my-component', compFormattedName);
export default compFormattedName;
```

This matters because new sections are not starting from an empty file. They already have:

- an initialized component class
- a direct styling connection
- a render surface
- a path into interactive behavior

That makes it easier for developers to move quickly from structure to real UI behavior.

### Generated Liquid and Schema Templates

The starter templates also make the relationship between view and schema explicit from the start.

Example Liquid:

```liquid
<h1>{{ section.id }}</h1>
<h2>{{ section.settings.title }}</h2>
```

Example schema:

```json
{
  "name": "t:sections.compName.name",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "t:sections.compName.settings.title",
      "default": "compName Title"
    }
  ]
}
```

That makes sections easier to reason about because the developer can immediately see:

- what the section renders
- which settings power it
- where the styling hooks connect
- where the interactive logic will live

### Build Flow

The framework compiles and packages:

- TypeScript into JavaScript assets
- SCSS into CSS assets
- component output into Shopify-compatible section/snippet usage

This enables a cleaner authoring workflow while still fitting the final constraints of Shopify themes.

### Bootstrap + Template Packaging

The distributed `toolbox.js` is not a simple script. It is built by taking the source templates and helper files and packaging them into a single installable bootstrap tool.

The build process:

- reads the source files recursively
- injects their contents into template placeholders
- writes a distributable `toolbox.js`
- makes the generated bootstrap executable

This is an important part of the project because it turns the framework into something a team can actually install and use repeatedly across projects.

## Why It Matters

ToolBoxJS improves more than just file organization.

It improves how frontend teams work.

Benefits:

- shared conventions across developers
- faster section creation
- reduced boilerplate
- cleaner separation of concerns
- easier onboarding
- more predictable builds
- improved maintainability
- better support for interactive UX inside Shopify

In short, it turns Shopify theme work into a more structured frontend engineering workflow.

## Best Fit

ToolBoxJS is especially useful for teams that:

- build custom Shopify themes with many sections
- care about consistency across multiple developers
- want a more component-based architecture
- need stronger frontend structure on top of Shopify
- want to move faster without sacrificing maintainability

## Getting Started

Grab the compiled `toolbox.js` from `dist`.

For framework development, work from `src`.

### Development

1. Clone the repo

```bash
git clone https://github.com/nerkat/ToolBoxJS.git
```

2. Install packages

```bash
npm install
```

3. Run the build script

```bash
node toolbox.build.js
```

## Usage

Video tutorial:

[ToolBoxJS setup walkthrough](https://youtu.be/qThgFJW2X6A)

To use ToolBoxJS in a Shopify project:

1. Copy `toolbox.js` from `dist` into your project folder
2. Run the toolbox script

```bash
node toolbox
```

3. Follow the interactive setup prompts
4. Start watch mode

```bash
npm run watch
```

5. Create a new component from the CLI

```bash
npm run section [NAME]
```

## Adding Third-Party Libraries

1. Install the package

```bash
npm i slick-carousel
```

2. Add the JS import in `libs.js`

```javascript
import * as slick from 'slick-carousel';

window.slick = slick;
```

3. Add the CSS import in `theme.css` if needed

```css
@import '../node_modules/slick-carousel/slick/slick.css';
```

## Custom Media Variables

Variables are configured in `_variables.css` and can be used anywhere in CSS or SCSS.

```css
@custom-media --very-large-and-up (min-width: 1440px);
@custom-media --large-and-up (min-width: 1280px);
@custom-media --large-and-down (max-width: 1279px);
@custom-media --medium-and-up (min-width: 1024px);
@custom-media --medium-and-down (max-width: 1023px);
@custom-media --small-and-up (min-width: 768px);
@custom-media --small-and-down (max-width: 767px);
```

Usage:

```scss
@media (--small-and-up) {
  .some-class {
  }
}

@media (--medium-and-down) {
  .some-class {
  }
}
```

## Theme Commands

```bash
npm run themepull
npm run themepush
npm run themeopen
```

## Contributing

Contributions are welcome.

If you have ideas for improvements, feel free to fork the project, open an issue, or submit a pull request.

### Basic flow

1. Fork the project
2. Create a feature branch
3. Commit changes
4. Push the branch
5. Open a pull request

## Publishing

Publishing is automated with Changesets.

When you're done with changes:

```bash
npx changeset
```

That creates a changeset file describing the release impact and summary. After release PRs are merged, the configured workflow can build and publish affected packages automatically.

[Shopify.com]: https://img.shields.io/badge/Shopify-7AB55C?style=flat&logo=Shopify&logoColor=white
[Shopify-url]: https://www.shopify.com/

[nodejs.com]: https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white
[nodejs-url]: https://nodejs.org/

[npm.com]: https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white
[npm-url]: https://www.npmjs.com/

[Webpack.com]: https://img.shields.io/badge/Webpack-8DD6F9?style=flat&logo=Webpack&logoColor=white
[Webpack-url]: https://webpack.js.org/

[babeljs.com]: https://img.shields.io/badge/babel-F9DC3E?style=flat&logo=babel&logoColor=white
[babeljs-url]: https://babeljs.io/

[TypeScript.com]: https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[ESLint.com]: https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=ESLint&logoColor=white
[ESLint-url]: https://eslint.org/

[sass.com]: https://img.shields.io/badge/sass-CC6699?style=flat&logo=sass&logoColor=white
[sass-url]: https://sass-lang.com/

[PostCSS.com]: https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=PostCSS&logoColor=white
[PostCSS-url]: https://postcss.org/

[stylelint.com]: https://img.shields.io/badge/stylelint-263238?style=flat&logo=stylelint&logoColor=white
[stylelint-url]: https://stylelint.io/

[Mocha.com]: https://img.shields.io/badge/Mocha-8D6748?style=flat&logo=Mocha&logoColor=white
[Mocha-url]: https://mochajs.org/
