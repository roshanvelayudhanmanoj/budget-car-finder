# Budget Car Finder

A full-stack car discovery web app — find and compare cars by budget and fuel type. Built as a college mini project with HTML, CSS, JavaScript, Node.js, Express, and SQLite.

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
npm start
```

Open **http://localhost:3000**

## Tech stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** SQLite (`database/bcf.db`)

## Project structure

```
├── index.html, login.html, register.html
├── style.css, script.js
├── server.js
├── database/       # SQLite + seed data
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
