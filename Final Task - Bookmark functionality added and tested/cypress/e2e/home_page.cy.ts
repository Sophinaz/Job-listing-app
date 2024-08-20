describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/", { failOnStatusCode: false });
    cy.get(".btna", { timeout: 10000 }).click();

    cy.get("#a")
      .type("sophidemiss@gmail.com")
      .should("have.value", "sophidemiss@gmail.com");

    cy.get("#b")
        .type("string")
        .should("have.value", "string");

    cy.get("button").click();
    cy.get("#65509e9353a7667de6ef5a60", { timeout: 10000 } ).click()

    cy.get(".btnc").click()
  });
});
