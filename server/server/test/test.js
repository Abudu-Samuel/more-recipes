import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';

const { expect } = chai;
const request = supertest(app);
let data = {};
let updateData = {};
const upVote = '1';
console.log('==========================================================');
describe('API Endpoints testing', (done) => {
  describe('Get all recipes in the application', () => {
    beforeEach(() => {
      data = {
        id: 1,
        name: 'Banana milk shake',
        img: 'www.igrl.com',
        description: 'Probably the best milk shake you ever had in your entire life',
        ingredients: ['Milk', 'Banana', 'Olive oil'],
        directions: ['Blend the banana properly', 'Filter and shake'],
        upVote: 0,
        downVote: 0,
        favorite: 0,
        reviews: [
          {
            review: '',
          },
        ],
      };
      updateData = {
        name: 'Banana milk shake',
        description: 'Probably the best milk shake you ever had in your entire life',
        ingredients: ['Milk', 'Banana', 'Olive oil'],
        instructions: ['Blend the banana properly', 'Filter and shake'],
      };
    });
    it('Should signup a user in the application', () => {
      request.post('/api/users/signup')
        .send({
          username: 'dave',
          password: '1234',
          email: 'dave@gmailly.com',
        })
        .end((err, res) => {
          console.log(res.body, '-----------------------------------');
          expect(res.status).to.equal(201);
          expect(res).to.be.an('object');
          if (err) return done(err);
        });
    });
    it('Should create new recipe in the application', () => {
      request.post('/api/recipes')
        .send(data)
        .end((err, res) => {
          console.log(res.body);
          expect(res.status).to.equal(201);
          expect(res).to.be.an('object');
        });
    });
    it('Should update the current recipe in the application', () => {
      request.put('/api/recipes/:recipeId')
        .send(updateData)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res).to.be.an('object');
        });
    });
    it('Should delete the recipe in the application', () => {
      request.delete('/api/recipes/:recipeId')
        .end((err, res) => {
          expect(res.status).to.equal(204);
        });
    });
    it('Should get recipe with most upvotes in the application', () => {
      request.get('/api/recipes?sort=upvotes&order=des')
        .end((err, res) => {
          expect(res.status).to.equal(201);
        });
    });
    it('Should create review for the recipe recipe', () => {
      request.post('/api/recipes/:recipeId/reviews')
        .send(upVote)
        .end((err, res) => {
          expect(res.status).to.equal(201);
        });
    });
  });
});
