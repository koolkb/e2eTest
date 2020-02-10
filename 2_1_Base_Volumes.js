describe('OFManager Base Volume Test', function()  {
  beforeEach('Visit OpenFrame Manager ', () => {
    cy.visit('http://192.168.14.110:1122/ofmanager/#!/login')

    cy.get('#input-id')
      .type('ROOT').should('have.value', 'ROOT')

    cy.get('#input-password')
      .type('SYS1').should('have.value', 'SYS1')

    cy.get('#button-submit').click(1000)
  })

  it('Base > Volume : Volume list Check', () => {
    cy.screenshot('2_1_base_volumes')

    cy.server()

    cy.route({
	method: 'POST',
	url: '**/base/volumes',
	response: [{
        volume: "100001",
        nonVsamUsage: "12.60(%)",
        nonVsamTotal: "410(GB)",
        vsamUsage: "0.25(%)",
        vsamTotal: "100(MB)",
        path: "/home/koolkb/oframe7/OHOME/volume_100001",
	deviceType: "3380"}, {
	}, {
        volume: "100002",
        nonVsamUsage: "12.60(%)",
        nonVsamTotal: "410(GB)",
        vsamUsage: "0.25(%)",
        vsamTotal: "100(MB)",
        path: "/home/koolkb/oframe7/OHOME/volume_100002",
        deviceType: "3380"
	}, {
        volume: "DEFVOL",
        nonVsamUsage: "12.60(%)",
        nonVsamTotal: "410(GB)",
        vsamUsage: "99.98(%)",
        vsamTotal: "668(MB)",
        path: "/home/koolkb/oframe7/OHOME/volume_DEFVOL",
        deviceType: "3380"
	}, {
        volume: "VSPOOL",
        nonVsamUsage: "12.60(%)",
        nonVsamTotal: "410(GB)",
        vsamUsage: "",
        vsamTotal: "",
        path: "/home/koolkb/oframe7/OHOME/spool",
        deviceType: ""
	}]
	})
  })
})
