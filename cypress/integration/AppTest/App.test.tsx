import "@cypress/code-coverage/support";
describe("Interface", () => {
  it("Content", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("No properties in store yet!").should("exist");
    cy.contains("New property").should("exist");
  });

  it("AddProperty", () => {
    const addpropertyBtn = cy.get(`[data-testid=addBtn]`).should("exist");
    addpropertyBtn.click();
  });
});
