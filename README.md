# Barker API

## Twitter for Dogs!

This is a node.js express API that I built to create, play around with, and demo a micro-front end application. Barker is Twitter for dogs because dogs love tweets and microfrontends.
<br />

<br />
I used my <a target="_blank" href="https://codewithwolf.com/how-to-use-jwt-with-node-express-and-sqlite"> node-jwt-sqlite-starter</a> template to start this project so it uses JWT for authentication. For now it uses a SQLite DB that runs locally in memory. I don't have it hosted at this time since it's just been for demo/experimental/dev purposes. 
<br/>
Check out<a target="_blank" href="https://codewithwolf.com/how-to-use-jwt-with-node-express-and-sqlite"> this blog post</a>  I wrote about that starter template to understand how auth, sqlite, and other features are set up in this project.

<br/>
<br/>

# Get Started

## 1. Install Node Packages

```
npm install
```

## 2. Environment Variables.

You will need a .env file with variables for: SESSION_SECRET, APP_SECRET, and DB_HOST.

Your secret strings can be anything and to get this running locally without a hosted db you can have `:memory:` for your DB_HOST value.

## 2. Run the Project

```
npm run start
```

or

```
npm run debug
```

## 3. Seed Data

If you look at `repositories/dao.js` you will see a static method called `setupDbForDev`. I built this to insert seed data into the `Users`, `Posts`, and `Comments` table so you can get started right away.

This function is invoked in the main `app.js` file when the initial project is run. If you host your DB, remove this call from that file so it doesn't run every time. I built this to run locally for demo purposes so I keep it in that file for now to run each time to insert seed data.

## 3. Authentication

In the seed data above, there were a few users added. You can pick one of these users and the password "123" to authenticate. `Bcrypt` is used to hash passwords in case you decide to allow users to create accounts later. For now, "123" is the password for the 6 seed accounts.

_NOTE: "123" is not a safe password to use. This is for development/experimental purposes only._

To authenticate, send a `POST` request to `localhost:3000/api/users/login` with a request body:

```
{"username": "banjo", "password": "123"}
```

and this will get you an access-token for future requests.

After that, add an `access-token` header to future requests with the value you recieved in the `/api/users/login POST` response.

## 4. Access Data

With a valid `access-token` header from the step above, you can now access other routes in this API.

To test, try a `GET` request to `localhost:3000/api/users/2`. You should get some user data from on of my dogs, Kahlo.
