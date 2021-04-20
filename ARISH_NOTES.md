## 09 APR, 2021
* Initialized the repo
* Created two endpoints for user register and login with JWT - \
"/api/user/register" and 
"/api/user/login"

## 10 APR, 2021
* Created an endpoint for submitting article - \
"/api/article"
* Added starter React code for frontend

## 11 APR, 2021
* Added bootstrap link in the index.html
* Added initial Header and Footer from template in frontend
* Setup the routes for navigation in frontend
* Added EditorJs react component that creates the article

## 12 APR, 2021
* Added api endpoint that saves article images in the backend
* Added title field on article create page
* Added header tool to EditorJs

## 14 APR, 2021
* Added Article Context to ArticleCreate Component, context will help in sharing state between components

## 16 APR, 2021
* Added functions to save and submit the articles
* Added toast messages using react-toastify module

## 17 APR, 2021
* Changed type of article text in Article schema, it will now store the JS object
* Added /article/:id endpoint to get article by id
* Added Article component in frontend to view the article using editorjs-react-renderer module
* Added tags input in the article create page using react-tagsinput module

## 18 APR, 2021
* Added tags to context, for sending it to backend
* Added tags to Article schema and changed the ArticleController accordingly
* Added Like button on Article page

## 19 APR, 2021
* Changed style of Login and Signup page
* Connected signup page to backend

## 20 APR, 2021
* Connected login component to backend
* Save token in localstorage on login and remove it on logout
* Protect ArticleCreate component, only logged in user can access
* Protect login and signup components, only a logged off user can access