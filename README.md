# BookingApp (MERN) — Hotel Search & Room Reservation

A Booking.com-inspired MERN app where users can **search hotels by city + dates**, filter by **price range**, view **hotel details with a photo slider**, and **reserve available rooms** for the selected date range.

**Frontend:** React (Vite), React Router, Axios, react-date-range, FontAwesome  
**Backend:** Node.js/Express, MongoDB (Mongoose), JWT (httpOnly cookie), bcrypt

---

## Screenshots

> Put your screenshots in `docs/screenshots/` (example file names below) so GitHub can render them in the README.

![Home](docs/screenshots/main.png)
![Homes guests love](docs/screenshots/homes-guests-love.png)
![Search results](docs/screenshots/search-results.png)
![Hotel details](docs/screenshots/hotel-details.png)
![Reservation modal](docs/screenshots/reservation-modal.png)
![Footer](docs/screenshots/footer.png)

---

## Core features

- **Hotel discovery**
  - Browse featured “Homes guests love”
  - Browse property types (hotel, apartment, resort, villa, cabin)
  - Browse counts by city (Berlin, Madrid, London)
- **Search + filters**
  - Destination (city) search
  - Date range picker
  - Adults / children / rooms selector
  - Min / max price per night filter
- **Hotel details**
  - Image gallery + full-screen slider
  - Price breakdown based on selected dates and rooms
- **Room reservation**
  - Room selection modal
  - Disables rooms that overlap with previously reserved dates
  - Persists reservations by updating `unavailableDates` in MongoDB
- **Auth**
  - Register + login
  - JWT stored in an **httpOnly cookie**
  - Admin-protected user listing endpoint (basic example)

---

## Tech stack

### Frontend
- React + Vite
- React Router
- Axios
- react-date-range + date-fns
- FontAwesome icons

### Backend
- Express
- MongoDB + Mongoose
- JWT auth + cookie-parser
- bcrypt password hashing
- dotenv for configuration

---

## High-level flow

1. User searches on the home header (city, dates, people).
2. Search state is stored in `SearchContext` and user is routed to `/list`.
3. `/list` fetches hotels by city and can re-fetch with min/max price.
4. Selecting a hotel opens `/hotel/:id` where photos + pricing are shown.
5. Clicking “Reserve/Book”:
   - If logged in, opens the reservation modal
   - If not logged in, redirects to `/login`
6. Reservation modal fetches rooms for the hotel, checks availability against selected dates, and updates `unavailableDates` when reserved.

---

## Project structure

```
backend/
  server.js
  routes/
  controller/
  models/
  config/
  utils/
frontend/bookingApp/
  src/
    Components/
    Pages/
    context/
    Hooks/
```

---

## Getting started (local dev)

### Prerequisites
- Node.js 18+ (recommended)
- A MongoDB database (local or MongoDB Atlas)

### 1) Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=8008
mongoURI=your_mongodb_connection_string
JWT=your_jwt_secret
```

Run the server:

```bash
npm start
```

Backend runs on: `http://localhost:8008`

### 2) Frontend setup

```bash
cd frontend/bookingApp
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

> Vite is configured to proxy API requests from `/api/*` → `http://localhost:8008/*` (and it strips the `/api` prefix).  
> That means frontend calls like `/api/hotel?...` hit the backend route `/hotel?...`.

---

## Environment variables

| Variable | Where | Description |
|---|---|---|
| `PORT` | `backend/.env` | Express server port (matches Vite proxy target) |
| `mongoURI` | `backend/.env` | MongoDB connection string |
| `JWT` | `backend/.env` | Secret used to sign JWT tokens |

✅ Recommended: commit an example file like `backend/.env.example` and keep real `.env` private.

---

## API endpoints (backend)

### Auth
- `POST /auth/register` — register a user
- `POST /auth/login` — login and set `access_token` cookie  
  **Note:** login looks up a user by **email**, but the frontend input id is named `username`.

### Hotels
- `GET /hotel` — list hotels  
  Query params used in the UI: `city`, `min`, `max`, `featured`, `limit`
- `GET /hotel/:id` — get one hotel
- `POST /hotel` — create a hotel
- `PUT /hotel/:id` — update a hotel
- `DELETE /hotel/:id` — delete a hotel
- `GET /countByCity?cities=berlin,madrid,london` — hotel counts by city
- `GET /countByType` — hotel counts by property type
- `GET /hotel/rooms/:id` — get all rooms for a hotel

### Rooms
- `POST /rooms/:hotelId` — create a room and attach it to a hotel
- `GET /rooms/:id` — get one room
- `PUT /rooms/:id` — update a room
- `DELETE /rooms/:hotelId/:id` — delete a room and detach it from a hotel
- `PUT /rooms/availability/:roomId` — reserve dates for a specific room number (pushes into `unavailableDates`)

### Users (example protected route)
- `GET /users` — requires a valid JWT cookie; returns all users only if `isAdmin=true`

---

## Notes

- **Do not commit secrets.** Keep `.env` out of Git.
- If you deploy frontend + backend on different domains, you’ll need:
  - CORS on the backend
  - `withCredentials: true` in Axios calls (so cookies are sent)
  - secure cookie settings for production

---

## Roadmap / improvements

- Create a dedicated `Booking` model (instead of only writing into `unavailableDates`)
- Better validation + error handling (centralized error middleware)
- Pagination + sorting on hotel search results
- Proper admin panel for managing hotels/rooms
- Production deployment (Docker + environment-based configs)

---

## License

For learning / portfolio use.
