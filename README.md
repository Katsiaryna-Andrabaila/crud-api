# crud-api

**Crud-api is a simple CRUD API app using in-memory database underneath**

### For work with Crud-api:

1. Use `node 18.x` or higher.
2. Clone this repo: `https://github.com/Katsiaryna-Andrabaila/crud-api`
3. Go to develop branch: `git checkout develop`
4. Install dependencies: `npm install`
5. Add file `.env` to the root directory
6. Insert `PORT = 4000` to the `.env` file
7. The server is started with commands `npm run start:dev` (development mode) or `npm run start:prod` (production mode)
8. To watch tests use `npm run test`
9. Available requests:

- **GET** `api/users` - to get all users

- **GET** `api/users/{userId}` - to get user by id

- **POST** `api/users` - to create record about new user and store it in database

  example of the body to send this type of request (all fields required):

  ```
  {
    "username": "John",
    "age": 25,
    "hobbies": ["reading", "soccer"]
  }
  ```

- **PUT** `api/users/{userId}` - to update existing user

- **DELETE** `api/users/{userId}` - to delete existing user from database
