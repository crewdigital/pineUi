# Pine UI Support Matrix

## 1. Supported Frameworks and Runtimes

| Runtime / Framework | Supported Versions         | Notes / Integration Model                                   |
| ------------------- | -------------------------- | ----------------------------------------------------------- |
| **React**           | `^18.3.0 \|\| ^19.0.0`     | Strict Mode, React Server Components, React Compiler ready  |
| **Node.js**         | `>= 20.0.0` (LTS)          | Used for tooling, compiler, SSR, and build pipeline         |
| **Next.js**         | `>= 14.0.0 \|\| >= 15.0.0` | App Router & Pages Router, full RSC and SSR support         |
| **Vite**            | `>= 5.0.0 \|\| >= 6.0.0`   | Fast Refresh, ESM dev server, `@stylexjs/rollup-plugin`     |
| **TypeScript**      | `>= 5.4.0`                 | Strict Mode (`strict: true`), exact optional property types |

---

## 2. Supported Browsers

Pine UI targets all modern evergreen browsers supporting baseline web standards (CSS Logical Properties, `:has()`, `:focus-visible`, CSS Container Queries, CSS Custom Properties).

| Browser                        | Minimum Version Supported          |
| ------------------------------ | ---------------------------------- |
| **Google Chrome / Chromium**   | Last 2 major versions              |
| **Mozilla Firefox**            | Last 2 major versions + ESR        |
| **Apple Safari (macOS & iOS)** | Last 2 major versions (Safari 17+) |
| **Microsoft Edge**             | Last 2 major versions              |
| **Android Chrome / WebView**   | Last 2 major versions              |

_Internet Explorer 11 and legacy non-evergreen browsers are explicitly not supported._

---

## 3. Module & Distribution Formats

- **Module Format:** Pure ECMAScript Modules (`ESM`) with standard `package.json` `exports` maps.
- **Typings:** Bundled `.d.ts` declaration files generated directly from strict TypeScript sources.
- **Side Effects:** Explicitly tagged `"sideEffects": false` across all packages to guarantee zero dead-code bundling during tree-shaking.
