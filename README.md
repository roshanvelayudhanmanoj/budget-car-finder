# Budget Car Finder

A full-stack car discovery web app — find and compare cars by budget and fuel type. Built as a college mini project with HTML, CSS, JavaScript, Node.js, Express, and MongoDB Atlas.

## Features

- User registration & login (JWT + bcrypt)
- 20+ Indian cars with filters (budget, fuel)
- Favorites saved per user in database
- Contact form stored in database
- Responsive premium UI

## Quick start

```bash
npm install
copy .env.example .env
# Add your MONGODB_URI to .env
npm start
```

Open **http://localhost:3000**

## Tech stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas (`budget_car_finder`)

## Deploying to Render

This app is ready for Render deployment with a Node web service.

- Render will use `npm install` and `npm start`.
- Use `render.yaml` in the repo to configure the web service.
- Add `MONGODB_URI` as an environment variable in Render dashboard.
- Render automatically provides the correct `PORT` value, and the server uses `process.env.PORT`.

## Project structure

```
├── index.html, login.html, register.html
├── style.css, script.js
├── server.js
├── database/       # MongoDB connection + seed
├── models/         # Mongoose schemas (users, cars, favorites)
├── routes/         # API routes
└── middleware/     # JWT auth
```

## API

- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `GET /api/cars` — List cars
- `GET /api/favorites` — User favorites (auth required)
- `POST /api/contact` — Contact form

## License

MIT
