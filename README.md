# Organization user structure

[BASE URL](https://organization-user-structure.onrender.com/) - https://organization-user-structure.onrender.com/

Implemented a REST API server using Node.js/Express/Sequalize/PostgreSQL/Jwt stack.

## Available Endpoints

`/register` - accepts a post request with JSON body of { name, email, password, bossId },
returns normalized data of created user.
`/login` - accepts a get request with JSON body of { email, password },
returns normalized user body and accessToken.
`/users` - accepts a get request with an accessToken(Bearer Token),
returns normalized array of users based on role of authorized user.
Admin - sees every user, Boss sees himself and his subordinates,
Regular - sees himself only.
`/users/:userId` - accepts a patch request with an accesToken and action
based on action changes role. changeBoss action accepts userId in params and 
newBossId in request body. Returns normalized array of updated subordinate
and Boss. changeToAdmin action accepts userId in params. Returns normalized 
updated user.

You can test this endpoints using Postman.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
