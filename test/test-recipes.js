const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Recipes', function() {
	before(function() {
		return runServer();
	});
	after(function() {
		return closeServer();
	});
	// GET
	it('should list Recipes items on GET', function() {
		return chai.request(app)
		.get('/recipes')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.a('array');
			expect(res.body.length).to.be.at.least(1);
			const expectedKeys = ['id','name', 'ingredients'];
			res.body.forEach(function(item) {
				expect.item.to.be.a('object');
				expect.item.to.includ.keys(expectedKeys);
			});
		});
	});
	// POST
	it('should add an item to Recipes on POST', function() {
		const newItem;
		return chai.request(app)
		.post()
		.send(newItem)
		.then(); // status
	});
	// PUT
	it('should update Recipes item on PUT', function() {
		const updateData;
		return chai.request(app)
		.get()
		.then() // send update
		.then(); // status
	});
	// DELETE
	it('should delete Recipes item on DELETE', function() {
		return chai.request(app)
		.get()
		.then() // delete
		.then(); // status
	});
	// Edge case
	it();
	// Edge case
	it();
});