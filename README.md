# rolling-task

> Bundles JS using Rollup using Cypress task command

Cypress 3.x has a new powerful command [`cy.task`](https://on.cypress.io/task) that runs in Node, so it has full access to the platform. This demo shows how we can bundle arbitrary JavaScript (Hyperapp with JSX, CSS-in-JS with Picostyle) using Rollup using `cy.task` and then test it.

See [cypress/integration/spec.js](cypress/integration/spec.js) and the application code in [app.js](app.js). The bundling code is in [cypress/plugins/index.js](cypress/plugins/index.js)

- [cypress-io/cypress](https://github.com/cypress-io/cypress)
- [rollupjs.org](https://rollupjs.org)
- [hyperapp.js.org](https://hyperapp.js.org/)
