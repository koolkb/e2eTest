describe('OFManager Base Catalog Test', function()  {
  beforeEach('Visit OpenFrame Manager ', () => {
    cy.visit('http://192.168.14.110:1122/ofmanager/#!/login')

    cy.get('#input-id')
      .type('ROOT').should('have.value', 'ROOT')

    cy.get('#input-password')
      .type('SYS1').should('have.value', 'SYS1')

    cy.get('#button-submit').click(1000)
  
    cy.screenshot('2_2_base_catalogs')
  })

  it('Base > Catalog : Catalog list Check', () => {
    cy.screenshot('2_2_base_catalogs')

    cy.get('.top-menu_menu-lnb_catalogs').click(1000)

    cy.request('POST', 'http://192.168.14.110:1122/ofmanager/base/get-catalogs-list',
        {catalogName: "",  
     volumeName: "",  
     pageLength: "20", 
     currentPage: "0", 
     startIndex: 0,  
     sortOrderBy: "1", 
     sortColumnName: "Catalog Name"
        }).then((response) => {
        (expect(response.body.list[0]).to.deep.equal({
           name: "SYS1.MASTER.ICFCAT",
           volser : "",
           type: "MASCAT",
           supname:""
        }))
      })
    })
  
  it('Base > Catalog : fixture Test', () => {
    cy.screenshot('2_2_base_catalogs')

    cy.get('.top-menu_menu-lnb_catalogs').click(1000)

    cy.request('POST', 'http://192.168.14.110:1122/ofmanager/base/get-catalogs-list',
        {catalogName: "",  
     volumeName: "",  
     pageLength: "20", 
     currentPage: "0", 
     startIndex: 0,  
     sortOrderBy: "1", 
     sortColumnName: "Catalog Name"
        }).then((response) => {
      cy.writeFile('cypress/fixtures/catalog_item.json', response.body.list)
    })
  cy.fixture('catalog_item').should((catalog_item) => {
    expect(catalog_item[0].name).to.eq('SYS1.MASTER.ICFCAT')
     })    
    })
})
