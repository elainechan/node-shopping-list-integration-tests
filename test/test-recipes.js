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
			expect(res).to.have.status(200); // 'okay'
			expect(res).to.be.json;
			expect(res.body).to.be.a('array');
			expect(res.body.length).to.be.at.least(1);
			res.body.forEach(function(item) {
				expect(item).to.be.a('object');
				expect(item).to.include.keys('id','name', 'ingredients');
			});
		});
	});
	// POST
	it('should add an item to Recipes on POST', function() {
		const newItem = {name: 'fried egg', ingredients: ['eggs', 'oil', 'salt']};
		return chai.request(app)
		.post('/recipes')
		.send(newItem)
		.then(function(res) {
			expect(res).to.have.status(201); // 'created'
			expect(res).to.be.json;
			expect(res.body).to.be.a('object');
			expect(res.body).to.include.keys('id', 'name', 'ingredients');
			expect(res.body.id).to.not.equal(null);
			expect(res.body).to.deep.equal(Object.assign(newItem, {id: res.body.id}));
		}); // status
	});
	
	// PUT
	it('should update Recipes item on PUT', function() {
		const updateData = {
			name: 'name',
			ingredients: []
		};
		return chai.request(app)
		.get('/recipes')
		.then(function(res) {
			updateData.id = res.body[0].id;
			return chai.request(app)
			.put(`/recipes/${updateData.id}`)
			.send(updateData);
		}) // send update
		.then(function(res) {
			expect(res).to.have.status(204);
		}); // status
	});
	// DELETE
	it('should delete Recipes item on DELETE', function() {
		return chai.request(app)
		.get('/recipes')
		.then(function(res) {
			return chai.request(app)
			.delete(`/recipes/${res.body[0].id}`);
		}) // delete
		.then(function(res) {
			expect(res).to.have.status(204);
		}); // status
	});
	/*
	// Edge case
	it();
	// Edge case
	it();
	*/
});