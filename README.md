# Thailand Election 2023

Monorepo for Thailand Election 2023 projects using [Turborepo](https://turbo.build/repo).

## 🌎 Environments

- Production: https://election66.wevis.info
- Staging: https://staging.election66.wevis.info

## 🍱 Directory structure

- **/apps** - Application for each project.

  - [designyourmp](apps/designyourmp) - Design your dream representative
  - [electionsim](apps/electionsim) - Election simulation
  - [landing](apps/landing) - Landing page with projects directory
  - [mpasset](apps/mpasset) - MP asset (Politician-asset)
  - [theyworkforyou](apps/theyworkforyou) - Your candidate matching quizes
  - [underconstruction](apps/underconstruction) - Dummy page for coming soon project
  - [yourcandidates](apps/yourcandidates) - Look Up Your Candidates

- **/packages** - Packages shared between apps

  - [styles](packages/styles) - Shared stylesheets according to the design systems
  - [components](packages/components/) - Shared web-component elements
  - [database](packages/database) - WeVis NocoDB fetching utility
  - [wordpress](packages/wordpress) - WeVis WordPress API fetching utility
  - [metadata](packages/metadata) - Projects metadata

- **/bundler** - Project built artifacts merging script

## 🏗️ Set up

Requires [NodeJS](https://nodejs.org/en/) (v18 LTS is recommended) and [Yarn v1](https://classic.yarnpkg.com/lang/en/)

Install dependencies with Yarn

```shell
yarn
```

Pre-commit hook using [Husky](https://typicode.github.io/husky) is set up to

- Check commit message with [commitlint](https://commitlint.js.org/)
- Format code with [Prettier + prettier-quick](https://prettier.io/docs/en/precommit.html)

For VSCode user, format on save is enabled and [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensiones will be recommended when open the project.

## 🪄 Create a new project

1. Create a new project inside `apps` directory eg. `apps/project-name`. Follow initization step according to the framwork you use.
2. Change name in the project's `package.json` to `@thailand-election-2023/project-name`

```json
{
	"name": "@thailand-election-2023/project-name"
}
```

3. Make sure that `dev` (run development server) and `build` (build production files) scripts is specific in the `package.json`

4. Set base path according to each framwork instruction. Every project will be at `/project-name` except the landing page

5. Add shared packages into the project. Follow each packages instruction:

   - [@thailand-election-2023/styles](packages/styles)
   - [@thailand-election-2023/components](packages/components)

6. Set build output to be `/dist` in each project

## 👟 Run a project in development

Using turborepo to run specific with all the package dependencies in development mode.

```
yarn dev --filter=<project-name>...
```

Note that `...` at the end is nessesary to run dependencies script as well. Without filter, every apps and packages will be run.

## 🙌 Contributing guideline

- We will use trunk-based development: Everyone will work on the main branch
  - _WHY? Continueus integration reduce merge conflic and make sure that everyone is using the newest codebase_
  - If you don't have a permission on the main branch, please submit the PR :)
  - Always `pull --rebase` before continue your work, and before push.
  - Push often, as long as it doesn't fail the build command.
- We will use [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) for commit message.

  - _WHY? We work on the same branch. This helps the commit history well organized._

  ```
  <type>(project-name): <description>

  example:

  feat(landing): add link to external projects
  ```

  - Commit types explanation can be found [here](https://github.com/pvdlg/conventional-changelog-metahub#commit-types)
  - If commit message is invalid, error will be shown and preventing you from committing the code.

- We use Prettier to format code
  - _WHY_ To make the whole repository have formating standard and improving reability for the team.
  - This should be done automatically on pre-commit and on save for VSCode user.
  - Configuration is in [.prettierrc](.prettierrc)

## 🤝 License and Terms of Use

Read more at [WeVis's Terms of Use](https://wevis.info/terms-of-use/) (in Thai)
