# news-app

**News-app application description:**
React and Node base application connecting news writers directly with readers.
Writers will be able to create articles by categories and then select if their article is free or paid. Writers will be able to create one  article price and monthly plan for their readers.
Readers will be able to read the news by selecting categories or selecting/filtering writers. Not registered readers can only read free articles. Logged-in readers will be able to add funds to their accounts and then use it to read a specific paid article or subscribe to a specific writer's monthly plan.


**Working time**
| Day | Time | What I did |
| :----:|:-----| :-----|
| 4.2. | 1 | Initial commit |
| 8.2. | 2.5 | Creating node backend with express, adding basic routing structure and eslint |
| | 2 | Creating basic frontend structure with react, redux, eslint | 
| | 2.5 | Connecting backend to MongoDB, creating controllers for articles, and writers | 
| 9.2 | 3 | Creating all controllers and modifing models in backend and testing them with Postman |
| | 4 | Creating dummy data for backend, adding materialUI to frontend: Drawer and AppBar components |
| 10.2 | 3.5 | Working Material UI theme, Creating Grid, ArticleCard components |
| | 1.5 | Adding react router, creating single article view |
| 11.2 | 4 | Creating writer component with reducer and services, improving interaction between all components |
| 12.2 | 7 | Adding search bar component, improving router, adding redux persist to fix state problem after reload, other minor improvements |
| 13.2 | 5 | Implemeneting token authentification in the backend with cookies. Started login implementation in frontend with Login component |
| 15.2 | 6 | Modifing backend for login in the backend, creating login component with formik and yup. Adding comments component for ArticlePage |
| 16.2 | 2 | Fixing token issue while creating new comments, comments to articles are possible only for logged in users |
| | 1 | Creating Sign up component and connecting it to backend. Fixing issue of page not re-loading while running static file |
| | 4 | Creating Reader component, adding ability to add funds |
| 18.2 | 3 | Adding favorite writers, subscriptions and comments to readers page. Renewing db models and adding new data |
| 19.2 | 4 | Working on ability to add writers to favorites list, and readers apear on writers follower list |
| 20.2 | 6 | Refactoring writers and readers reducer, adding ability to add and remove writers to and from favorite list |
| | 2 | Adding ability to select category My favorites |
| 21.2 | 6 | Updating Navbar to work with logged in Writer, creating Writer register form with formik |
| 22.2 | 2 | Connecting Writer signup form to back end, and fully implementing writer login |
| 23.2 | 7 | Creating subscription ability in the back end, implementing in the front end |
| 24.2 | 2 | Planing how subscription model should look and work in the front end |
| 25.2 | 7 | Working on reducers and and writer component to implement subscription functionality |
| 26.2 | 2.5 | Finilizing montly or yearly subscriptions functionality, started to work on all writers component |
| 27.2 | 1.5 | Finilizing all writers component |
| | 3.5 | Adding filter for all, paid, free articles, working on creating writers admin page |
| 28.2 | 3.5 | Created writer admin page |
| 1.3 | 7 | Bug fixes on WriterAdmin components, creating formik-material-ui form in front end |
| 2.3 | 2 | Connecting new article creation with back end and with authorization |
| | 2 | Creating notification component with Mui Snackbar and redux |
| 3.3 | 1.5 | Adding view count functionality to articles |
| | 1 | Refactoring login/signup forms |
| | 1 | Unique username validation with formik and in the back end for new writers and readers, minor form improvements |
| | 2.5 | Working on error handling in the backend and front end |
| 4.3 | 3 | Error handling in the front end |
| | 4 | Figuring out best way to log out user if token expires, implementing it to AddComment component |
| 5.3 | 2 | Implementing log out if token expires to all components |
| | 2 | Fixing bugs related to expired tokens |
| 6.3 | 5 | Adding funcionality that paid articles can only read by subscribers or by logged in users who paid for one |
| | 1 | Started implementing image upload for articles |
| 8.3 | 3.5 | Implementing image upload component to new article components |
| | 4 | Trying to connect image upload from client to server |
| 9.3 | 6 | Completed images implementation for article card and article page |
| 10.3 | 1 | Creating back end for readers and writers profile pictures |
| | 3.5 | Creating writers and readers profile images and connecting them to back end |
| 11.3 | 0.5 | Adding readers My subscriptions option in left side menu |
| | 7.5| (commit after midnigtht for 11.3) Full implementation of expired subscriptions removal |
| 12.3 | 1 | Starting to implement refresh token functionality |
| | 3.5 | Implementing refresh token functionality both for writer and reader |
| | 1 | Started to work on E2E testing with cypress |
| 13.3 | 6 | Creating cypress tests |
| | 1 | Adding project back end to Heroku and front end to Netlify |
| 14.3 | 0.5 | Adding env base url for react to work localy with localhost and in netlify with heroku |
| | 2 | Trying to fix and issue of cookies not being set on netlify from response |
| | 1.5 | Did not manage to make cookies work on Netlify. App now is fully functional backend and front end on Heroku |
| | 2 | File imports clean up and restructuring, front end file restructuring, minor bug fixes |
| | 1 | Fixing issue that page brakes when images are not loaded with material ui Skeleton |
| Total | 178.5 | | 
