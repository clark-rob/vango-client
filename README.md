## Welcome to V.A.N.Go!
The Drawing App for All Ages

# Snapshot of App
![alt screenshot](./public/vango-screenshot.png)

## Description
- User can sign up and sign in using email and password
- Once signed in, they can change password and sign out
- As well as Create and View all drawings
- On the View Drawings page, users can delete and update their personal created drawings (other user drawings can not be manipulated)

## Preparation
1. Fork and Clone this repository.
1. `git checkout` to a new branch
1. Install dependencies with `npm install`
1. Install React CanvasDraw with `npm install react-canvas-draw --save`
1. Run `npm start` in terminal to test front-end server
1. To test along with the back-end server, fork and clone the repository in the following link: <https://github.com/clark-rob/vango-server>

## Repo URL's
- Front-end: <https://github.com/clark-rob/vango-client>
- Back-end: <https://github.com/clark-rob/vango-server>

## Deployed Site URL's
- Front-end: <https://clark-rob.github.io/vango-client/>
- Back-end: <https://vango-server.herokuapp.com/>

## Technologies
- React JS was used to create the entire front end, Single Page App.
- React-canvas-draw: <https://github.com/embiem/react-canvas-draw>
- used to create each canvas drawing within the application

```javascript

  import CanvasDraw from "react-dom"

```

- Express/ Node.js was used with MongoDB on the backend

## Idea Behind the App
- Based off a party game called 'Scrawl,' it's pictionary meets telephone.
- BUT, Version 1 is a basic drawing application that saves and showcases
a group of individuals creations.

## Future Fixes
- stop the error about 'drawImage'
- Proceed with creating the game version
- create images instead of an array of points, upload to Amazon Web Services

## Stories
### User
- As a user, I want to be able to have authorized access so that I can create and view my current and past drawings
- As a user, I want to be able to label each drawing to understand what was drawn
- As a user, I want to be able to draw on my screen on mouse click so that once
my mouse is not clicked, the drawing stops
- As a user, I want to be able to update my drawing so that I can change any
mistakes
- As a user, I want to be able to save past drawings so that I can view them at
another time
- As a user, I want to be able to save past drawings so that I can delete them at
another time
### Developer
- As a developer, I want to create an application that allows users to freely
make small drawings with out errors
- As a developer, I want each onscreen action to perform correctly and smoothly
- As a developer, I want to be able to understand and read each piece of code
to avoid prolonged debugging
- As a developer, I want an application that can easily be reused and inserted within other applications



## Wireframe
![alt wireframe](./public/vango-wireframe.jpg)

## Resources
  The drawing canvas was made by <https://github.com/embiem/react-canvas-draw>
  Check out the great package for yourself.

  This app was built using the assistance of the following:
  <https://developer.mozilla.org/en-US/>
    <https://www.w3schools.com/>
    <https://stackoverflow.com/>
    <https://css-tricks.com/>

  Majority of all my questions, led me to past training notes and
  practices.

  Other problems were assisted by fellow colleagues in GA WDI PVD-04
    -Thank you all for the help.
