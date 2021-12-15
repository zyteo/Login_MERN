# Login - MERN with JWT + localisation

Coding challenge - making a login application.

I see this as a chance to practice my full stack development skills, and at the same time try out JSON Web Tokens (JWT) as I did not have the chance to do so.
At the same time, I would implement localisation and support multiple languages. This is also my first time trying out localisation.

Visit the app here: https://login-mern-jwt.herokuapp.com/

### Technology Used

Technologies used to build this project.

```
- MongoDB
- Express
- ReactJS + React router
- NodeJS
- Styled components
- bcrypt
- JWT
- mongoose

```

### User Stories

```
To use the app, user should:

- Create an account (default role is user)
- Log in
- See a welcome screen (name,username,role)
- If user's role is manager, they can see another webpage in welcome screen
- Logout button to link back to login screen
- Localisation included - supports multiple languages

```

---

## Planning and Development Process

Models:

-Users: name (string), username (string), password (string), role (string)

RESTful APIs
- Post (create user)
- Post (login)
- Get (logout)

Pages needed:
- Main login
- Create account
- Welcome page

3 buttons / selections for creating account, logging out and selecting language

```
Timeline

- 14 Dec: Dabbled a little with Java backend + spring boot.
Decided to try out a login application with MERN first before moving on to Java.

- 15 Dec: Plan out the application.
Set up backend models, controllers, routes.
Set up frontend, add various states.
Experiment around with JWT + localisation.
Got the set up done.

```
---

## References

Had to do some research to better understand the topic and here are some websites I visited:

Auth with JWT https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&ab_channel=TheNetNinja