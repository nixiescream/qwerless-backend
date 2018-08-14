# Qwerless

Qwerless is a webapp that you can write a note with a stylus and convert it to a text note.

## User Stories

  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

  **500:** As an anon/user I can see a 500 page if the server has an internal error
  
  **Signup:** As an anon I can sign up in the platform so that I can start saving my handwritting notes
  
  **Login:** As a user I can login to the platform so that I can see handwritting notes
  
  **Logout:** As a user I can logout from the platform so no one else can use it 

  **List notes:** As a user I want to see my handwritting notes
 
  **Add note:** As a user I want to add a note so that I can save it and share it

  **Detail note:** As a user I want to see note in detail so that I can edit if I want

  **Edit note:** As a user I would like edit a note so I can edit the mistakes I could make

  **Delete note:** As a user I want to delete a note

  **My profile:** As a user I want to see my profile

  **Share the note:** As a user I want to share my notes so that I can send to my contacts

## Backlog
  **Multi-edit:** As a user I want to invite other users to edit the note
  
# Client

## Routes

  - / - Homepage (InitAuthGuard)
  - /auth/signup - Signup form (RequireAnonGuard)
  - /auth/login - Login form (RequireAnonGuard)
  - /notes - note list (RequireUserGuard)
  - /notes/new - add a new note (RequireUserGuard)
  - /notes/:id - see the detail of the note (RequireUserGuard)
  - /profile/me - my details and my notes (RequireUserGuard)
  - /notes/edit (RequireUserGuard)
  - /notes/delete (RequireUserGuard)

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
- Profile Service
  - profile.me()
- Notes Service
  - note.list()
  - note.add(data)
  - note.detail(id) 
  - note.edit(id)
  - note.delete(id)  

## Pages

- 404 Page
- Sign in Page
- Log in Page
- Home Page
- Notes List Page
- New Note Page
- Note Detail Page
- My Profile Page

## Components

- Navbar component
- Note Card component
- Login/Signup form component

## IO

- Note List Page inputs restaurante Note Card component: Display all notes in a grid
- Login/Sign up form outputs the form to the parent component

## Guards

- if logged in cannot access login/signup page
- if not logged in cannot access profile page
- if not logged in cannot access notes page

# Server

## Models

  User model

  ``` javascript
    const userSchema = new Schema({
        username: String,
        email: {type: String, unique: true},
        password: String
    });
  ```

  Note model

  ``` javascript
    const noteSchema = new Schema({
        owner: { type: ObjectId, ref: 'User' },
        title: String,
        content: String
    });
  ```

## API Endpoints/Backend Routes

  - GET /auth/me
  - POST /auth/signup
  - POST /auth/login
  - POST /auth/me
  - GET /profile/me
  - POST /favorite
  - GET /notes
  - GET /notes/:id
  - POST /notes
  - PUT /notes/:id
  - DELETE /notes/:id
  
  