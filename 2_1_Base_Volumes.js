describe('OFManager Base Volume Test', function()  {
  beforeEach('Visit OpenFrame Manager', function() {
    cy.visit('http://192.168.14.110:1122/ofmanager/#!/login')

    cy.get('#input-id')
		.type('ROOT').should('have.value', 'ROOT')
    cy.get('#input-password')
		.type('SYS1').should('have.value', 'SYS1')
    cy.get('#button-submit').click(2000)

    cy.screenshot('2_1_base_volumes')
  })

  it('Base > Volumes : Volume full list', () => {
    cy.get('.top-menu_menu-lnb_volumes').click(3000)
    cy.screenshot('2_1_base_volumes')
   })

  it('Base > Volumes : Volume search', () => {
    cy.get('.top-menu_menu-lnb_volumes').click(3000)
    cy.get('#textfield-volume').find('.top-textfield-text').type('DEFVOL').should('have.value', 'DEFVOL')
    cy.get('#Button141_1').find('.top-button-root').click(1000)
    cy.request('POST', 'http://192.168.14.110:1122/ofmanager/batch/get-volumes-list-paging',
        {volume: "DEFVOL",
          devicetype: "",
          path: "",
          pageLength: "20",
          currentPage: "0",
          startIndex: 0,
          sortOrderBy: "1",
          sortColumnName: "Volume Serial"
        }).then((response) => {
        (expect(response.body.list[0]).to.deep.equal({
            volume: "DEFVOL",
            nonVsamUsage: "12.60(%)",
            nonVsamTotal: "410(GB)",
            vsamUsage: "99.98(%)",
            vsamTotal: "668(MB)",
            path: "/home/koolkb/oframe7/OHOME/volume_DEFVOL",
            deviceType: "3380"
      }))
    })
    cy.screenshot('2_1_base_volumes')
  })
})
