import "@cypress/code-coverage/support";
describe("Interface", () => {
  it("Content", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("No properties in store yet!").should("exist");
    cy.contains("New property").should("exist");
  });

  it("AddProperty withouth inputs", () => {
    const addpropertyBtn = cy.get(`[data-testid=addBtn]`).should("exist");
    addpropertyBtn.click();
    const submitBtn = cy.get(`[data-testid=submitBtn]`).should("exist");
    submitBtn.click();
    cy.contains("Name is missing!").should("exist");
    cy.contains("Street is missing!").should("exist");
    cy.contains("Streetnumber is missing!").should("exist");
    cy.contains("Postcode is missing!").should("exist");
    cy.contains("City is missing!").should("exist");
    cy.contains("Country is missing!").should("exist");
    cy.contains("longitude is missing!").should("exist");
    cy.contains("latitude is missing!").should("exist");
  });
  it("Add property with filled inputs", () => {
    cy.get(`[name=name]`)
      .should("exist")
      .type("200 W 53rd St, New York, NY 10019, United States");
    cy.get(`[name=street]`).should("exist").type("200 W 53rd St");
    cy.get(`[name=number]`).should("exist").type("53");
    cy.get(`[name=postalcode]`).should("exist").type(" 10019");
    cy.get(`[name=city]`).should("exist").type("New York");
    cy.get(`[name=country]`).should("exist").type("United States");
    cy.get(`[data-testid="getcordsBtn"]`).should("exist").click();
    cy.contains("Fetching coordinates , please wait! ...").should("exist");
    cy.contains(
      "You searched for: 200 W 53rd St, New York, NY 10019, United States 200 W 53rd St 53 New York 10019 United States",
      { timeout: 10 * 1000 }
    ).should("exist");
    cy.get('[type="radio"]').should("exist").first().check();
    cy.get(`[data-testid=submitBtn]`).click().should("exist");
    cy.get(`[data-testid=editBtn]`).should("exist");
    cy.get(`[data-testid=delBtn]`).should("exist");
    cy.get(`[data-testid=infoBtn`).should("exist");
  });
  it("Info Btn test", () => {
    cy.get(`[data-testid=infoBtn`).should("exist").click();
    cy.contains("description").should("exist");
    cy.get(`[data-testid=closeModalBtn`).should("exist").last().click();
  });
  it("Edit Property test", () => {
    cy.get(`[data-testid=editBtn`).should("exist").click();
    cy.get(`[name=name`).last().should("exist").type(".");
    cy.get(`[data-testid=submitBtn]`).last().click();
  });
  it("Delete Property test", () => {
    cy.get(`[data-testid=delBtn]`).click();
    cy.contains("Are you sure you want to delete:").should("exist");
    cy.get(`[data-testid=confirmBtn]`).last().click();
    cy.contains("No properties in store yet!").should("exist");
  });
});
