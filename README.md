<img alt="iENT: An awmazing wrapper for iENT" src="https://raw.githubusercontent.com/LiterateInk/iENT.JS/main/.github/assets/banner.svg" width="100%" />

*This library **is not** affiliated with [&nearr;&nbsp;iENT](https://www.ient.fr/) in any way.*

[![Checks](https://github.com/LiterateInk/iENT.JS/actions/workflows/checks.yml/badge.svg?branch=main)](https://github.com/LiterateInk/iENT.JS) [![NPM Downloads](https://img.shields.io/npm/dm/ient)](https://www.npmjs.com/package/ient) ![Discord](https://img.shields.io/discord/1205628496492101693?label=discord&color=%235865F2)

## What is "iENT" ?

[&nearr;&nbsp;iENT](https://www.ient.fr/) is a French school management software used by many schools in France. It allows students to manage their schedules, grades, and other school-related information.

## Installation

Use your favorite package manager to install this library from the npm registry.

```bash
# pnpm
pnpm add ient

# Yarn
yarn add ient

# npm
npm add ient

# Bun
bun add ient
```

## Quick Start

> This library only supports students types as of now. If you want to use it with teachers or other types, please open an issue.

```typescript
import * as iENT from "ient";

// You first have to authenticate with iENT to get a session.
// Once you have a session, you can use it to make requests to iENT.
const session = await iENT.login(iENT.ProfileKind.Student, "username", "password");

// Let's grab the timetable for this week.
const timetable = await iENT.timetable(session, new Date());
console.log(timetable);
```

You can find guides at [**&nearr;&nbsp;ient.docs.literate.ink**](https://ient.docs.literate.ink) and if it's not enough you can also take a look at the [**&nearr;&nbsp;examples** directory on the GitHub repository`](https://github.com/LiterateInk/iENT.JS/tree/main/examples) for inspiration.

If none of those are helpful, you can always [&nearr;&nbsp;open an issue](https://github.com/LiterateInk/iENT.JS/issues) to ask for help or join the [&nearr;&nbsp;LiterateInk Discord server](https://literate.ink/discord).

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details.
