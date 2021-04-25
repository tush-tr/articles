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

## 21 APR, 2021
* Fixed models of Article and User
* Made backend to save article only when the auth-token is received
* Added get recent articles endpoint in backend
* Added recent articles section on home page
* Changed article like controller to like as well as unlike article in the backend
* Protected article like controller, only logged in user can like or unlike
* Connect like button of article page to backend

## 22 APR, 2021
* Protected the article comment controller , only logged in user can comment
* Made the comment controller to send the current comment in response
* Created a CommentBox component and added it to the Article page, styling of the component is remaining

## 23 APR, 2021
* Added endpoint /admin/login for admin login in backend

## 24 APR, 2021
* Added Admin Login component to frontend
* Connected Admin Login with backend

## 25 APR, 2021
* Added template for admin dashboard
* Added route /admin/dashboard to get dashboard data from backend
* Connected AdminDashbaord component to backend
* Added contoller to get published articles by admin
