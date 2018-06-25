/// <reference types="cypress" />

beforeEach(() => {
  // filename from the root of the repo
  cy.task('roll', './text-app.js').then(({ code }) => {
    const doc = cy.state('document')
    const script_tag = doc.createElement('script')
    script_tag.type = 'text/javascript'
    script_tag.text = code
    doc.body.appendChild(script_tag)
  })
})

it('loads picostyle', () => {
  cy
    .contains('.p0', 'Picostyle')
    .invoke('css', 'fontSize')
    .should('be.equal', '64px')
})

const checkFont = size =>
  cy
    .contains('.p0', 'Picostyle')
    .invoke('css', 'fontSize')
    .should('be.equal', size)

it('uses smaller font on smaller screen', () => {
  cy.viewport(200, 200)
  cy.wait(1000)
  checkFont('32px')
})
