
https://travis-ci.org/Abudu-Samuel/more-recipes.svg?branch=develop

# MORE-RECIPES
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they 
have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on 
More-Recipes and  get feedback in form of reviews and votes from other users who explore that 
recipe. Users can also keep a list of their favorite recipes on the application. 


## Development
The application leverages Node; Express for routing and sequelize for ORM.

## Installation
- Install `node` and `postgres`
- Clone the repository git clone https://github.com/Abudu-Samuel/more-recipes.git
- Install dependencies `npm i`
- Test `npm test`
- Start app `npm start`
- Consume via postman

## Endpoints

### Users
- User Signup  - api/users/signup               - Registers a user
- User Signin  - api/users/signin               - Logs a user in
- Add Recipe   - /api/recipes                   - allows a user to add recipes
- Edit Recipe  - /api/recipes/:recipeId         - allows a user to edit recipes
- Delete Recipe     - /api/recipes/:recipeId    - allows a user to delete a recipe
- Get Recipe  - /api/recipes                    - allows a user to get all recipes
- Add Review  - /api/recipes/:recipeId/reviews  - allows a user to add reviews to recipes
- Get Favorite - api/users/:userId/recipes      - allow a user to get favorited recipes

## Verbs
- GET
- POST
- PUT
- DELETE
