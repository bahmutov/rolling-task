/// <reference types="cypress" />

beforeEach(function cleanDocumentBody () {
  const doc = cy.state('document')
  Array.from(doc.head.children).forEach(el => doc.head.removeChild(el))
  Array.from(doc.body.children).forEach(el => doc.body.removeChild(el))
  // reset body style
  doc.body.style.margin = 0
})

beforeEach(function mountComponent () {
  // filename from the root of the repo
  cy.task('roll', './text-app.js').then(bundle => {
    const { code } = bundle
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
