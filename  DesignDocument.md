# 🏗️ Architecture & Design

## ✅ Tech Stack

| Layer           | Technology                           | Purpose                                                                                                                            |
| --------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Frontend        | **React + Vite + TypeScript**        | Core of the application — component-driven architecture, fast dev server, and strong type safety for models and ride logic         |
| Styling         | **Tailwind CSS + MUI Icons**         | Tailwind for responsive design with gradient themes and card layouts; Material Icons for visual clarity and modern UI elements     |
| Animations      | **Framer Motion**                    | Lightweight animations (fade, slide) to enhance UX without overwhelming the user                                                   |
| Routing         | **React Router DOM**                 | Navigation between Login, Register, Passenger and Driver Dashboards                                                                |
| State & Storage | **LocalStorage + TypeScript Models** | All user and ride data is stored in the browser — simulating a database locally using consistent schema definitions via interfaces |

---

## 💡 Why This Stack?

This project was designed to solve a real-world **safety concern for female passengers** using bike ride services. The chosen tech stack enables:

* ✅ **Full functionality without a backend** — works in any browser
* ✅ **User data persistence** using browser localStorage
* ✅ **Safety-focused logic**, where **only female passengers** can request a **female driver**, enforcing gender-aware ride matching
* ✅ **Quick interaction**, smooth animations, and responsive design, usable on both mobile and desktop

This architecture demonstrates how strong frontend logic and storage simulation can solve critical UX and safety problems, without relying on a backend.

---

## 🏛️ High-Level Architecture Diagram

```mermaid
graph TD
  A1[Login / Register Page] --> A2[Authentication Logic (auth.ts)]
  A2 -->|Create/Get User| B1[LocalStorage (user data)]

  A1 --> A3[Passenger Dashboard]
  A1 --> A4[Driver Dashboard]

  A3 --> B2[RideBookingForm Component]
  A3 --> B3[RideHistoryList Component]
  A3 --> C1[localStorage (rides)]

  A4 --> B4[AvailableRidesList Component]
  A4 --> B5[RideStatusManager Component]
  A4 --> C1

  B1 --> C1[localStorage]
```

---

## 🗃️ Data Schema (TypeScript-Based Simulation)

Though no database was used, the application simulates data modeling using TypeScript interfaces and stores all data in `localStorage`. This ensures structured data handling even in a purely frontend environment.

### TypeScript Interfaces

```ts
// Passenger
interface Passenger {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: 'male' | 'female';
}

// Driver
interface Driver {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: 'male' | 'female';
  vehicleType: 'Bike' | 'Car' | 'Rickshaw';
  availability: boolean;
}

// Ride
interface Ride {
  id: string;
  passengerId: string;
  driverId?: string;
  pickup: string;
  drop: string;
  rideType: 'Bike' | 'Car' | 'Rickshaw';
  status: 'Requested' | 'Accepted' | 'In Progress' | 'Completed';
  preferredDriverGender?: 'male' | 'female';
}
```

---

## 🚦 Gender-Aware Ride Matching Logic

Key logic that differentiates this project:

* 🚺 **Only female passengers** booking **bike rides** can select preferred driver gender.
* 🚹 **Male passengers** cannot choose driver gender — platform prevents enforcement of female driver selection.
* 🤝 Drivers only see ride requests that match:

  * their vehicle type
  * and if specified, the correct gender filter (for female riders)

This logic is enforced in the ride filtering and assignment code and is central to the app's **female-safety-first design philosophy**.

---

## 🧱 Simulated Data Persistence (LocalStorage)

All runtime data is persisted using `localStorage` keys:

* `ride_booking_passengers`
* `ride_booking_drivers`
* `ride_booking_rides`

A helper utility (`localStorage.ts`) ensures:

* Initial data is seeded once if keys are missing
* Read/write logic is abstracted and typed
* App can be refreshed without losing session/ride data

