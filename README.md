# Capstone-JS

## Japanese Single Kanji guide

### Problem Statement 

There is google translate to tell you what a kanji word says based on the combination but does not go into
detail what each kanji used means or how its read.

# Client Side

## Components and API 

### Component AuthRoute

This component is encased in the main App component. what this does is that theres check in state
if the user is logged in the components encased in this component will become available and not accessable 
outside if not logged in.

### Component AuthService

this component uses axios to comunicate and various functions such executeJwtDeleteService,
executeJwtAuthenticationService, executeJwtUpdateService, registerSuccessfulLoginForJwt, createJWTToken,registerSuccessfulLogin
,logout, getLoggedInUserName, getLoggedInID, setupAxiosInterceptors as to communicate with the backend to 
retriece token data and login data. This is also used to confirm the login data and add the information and token 
data to the session storage as well as remove if necessary

### Component ErrorPage

this component will only pop up if there address is taken to is invalid

### Component Footer

this component is made to set the footer for the site

### Component Header

this sets the header and has all the links to the other components at first the components will not show as one 
is not logged in but once your logged in the other components will become available.

### Component Logout

this component just when sent you are told youve been logged out reachable by the logout button

### Component Login

This component handles the login to the application. What is done is that the application takes the username and 
password input and then sends it to the backend via axios posts under executeJwtAuthenticationService function in  with auth/login AuthService
if successful a token is given and the username and id is saved.


### Component Register

This component handles the Registration to the application. What is done is that the application takes the username and 
password input and then sends it to the backend via axios and posts to the mongo db server


### Component EditUser

This component handles the login to the application. What is done is that the application takes the username and 
password input and then sends it to the backend via executeJwtAuthenticationService and if successful a successful 
login is registered in state and the state for being logged in is changes and set 

### Component HomePage

This component is the center component that is first seen once one logs in a main center page basically.

### Component Main

This component is the center component that is first seen once one logs in a main center page basically.


# Server Side

## Components and API 

### BcryptEncoder

this main application takes a string inside the encoder space and when run returns encoded
string of the word in the space up to 10 different times. This is mainly used for encoding the 
password.

## Models and API 



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.

This connects to the java portion is run which is run in [http://localhost:8081](http://localhost:8081)
with the H2 database.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
