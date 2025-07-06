
# Ride-Sharing App

## Overview
This is a ride-sharing web application built for a hackathon, designed to provide a safe and visually appealing experience for passengers and drivers. The app features a responsive UI with a key female-friendly feature: female passengers can request female drivers for bike rides to enhance safety. Male passengers cannot enforce a female driver, as gender selection is exclusive to female passengers for bike rides. The app supports user registration, login, ride booking, ride assignment, and ride status management, with a clean and consistent design across all pages.

## Features
- **User Authentication**:
  - Register as a passenger or driver with name, email, password, gender, and vehicle type (for drivers).
  - Login with email, password, and user type, with a show/hide password toggle.
- **Female-Friendly Feature**:
  - Female passengers booking bike rides can select a preferred driver gender (male or female) to prioritize safety.
  - Male passengers cannot select driver gender, ensuring no enforced female driver preference.
- **Passenger Dashboard**:
  - Book new rides with pickup, drop-off, ride type, and optional gender preference (for female passengers on bike rides).
  - Passengers cannot request multiple rides simultaneously; only one active ride is allowed.
  - View current ride status (Requested, Accepted, In Progress, Completed) with icons.
  - Display ride history for completed rides.
- **Driver Dashboard**:
  - View and accept/reject available rides matching the driver’s vehicle type (Bike, Car, or Rickshaw) and gender (if specified by female passengers).
  - Drivers cannot accept a second ride while on an active ride, ensuring focus on one ride at a time.
  - Update ride status (Start Ride, Complete Ride) for assigned rides.
- **Ride Matching**:
  - Rides are only shown to drivers whose vehicle type matches the ride type requested by the passenger.
- **Responsive UI**:
  - Consistent design with purple/pink gradient backgrounds, translucent cards (`card-gradient`).
  - Mobile-friendly layout with stacked cards and a top car animation; desktop layout with side-by-side panels for login/register.
- **Animations**:
  - Minimal `framer-motion` transitions (fade-in, slide-in) for smooth UX without overwhelming effects.
  - Animated car icon (`DirectionsCar`) on login/register pages for visual appeal.

## Entity-Relationship Diagram (ERD)
The ERD below, rendered in Mermaid syntax, outlines the relationships between `Passenger`, `Driver`, and `Ride` entities.

```mermaid
erDiagram
    Passenger ||--o{ Ride : books
    Driver ||--o{ Ride : assigned_to
    Passenger {
        string id PK
        string name
        string email
        string password
        string gender
    }
    Driver {
        string id PK
        string name
        string email
        string password
        string gender
        string vehicleType
        boolean availability
    }
    Ride {
        string id PK
        string passengerId FK
        string driverId FK
        string pickup
        string drop
        string rideType
        string status
        string preferredDriverGender
    }
````


- Passenger: Represents users who book rides, with attributes for identification and authentication.
- Driver: Represents users who provide rides, with additional attributes for vehicle type and availability.
- Ride: Represents a ride request, linking a passenger and optionally a driver, with details like pickup, drop-off, and status.


## Project Structure

The project follows a clean, modular structure for maintainability and scalability.

```
ride-sharing-app/
├── docs/
│   ├── er_diagram.png        # ERD diagram (exported from draw.io)
│   └── design.md            # Design document with UI/UX details
├── src/
│   ├── components/
│   │   ├── RideBookingForm.tsx  # Form for passengers to book rides
│   │   └── RideHistoryList.tsx  # List of completed rides for passengers
│   ├── pages/
│   │   ├── LoginPage.tsx        # Login page with responsive UI
│   │   ├── RegisterPage.tsx     # Registration page with responsive UI
│   │   ├── PassengerDashboard.tsx  # Passenger dashboard for ride booking/history
│   │   └── DriverDashboard.tsx     # Driver dashboard for ride management
│   ├── types/
│   │   └── models.ts            # TypeScript interfaces for Passenger, Driver, Ride
│   ├── utils/
│   │   ├── auth.ts              # Authentication logic (login, register)
│   │   ├── ride.ts              # Ride management logic (create, assign, update)
│   │   └── localStorage.ts      # LocalStorage utility for data persistence
│   └── index.css                # Global Tailwind CSS styles
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation (this file)
```

## Flow Diagram

The following text-based flow diagram describes the user journey and logical flow of the application.

```
[Start]
   |
   v
[Login/Register Page]
   | User selects user type (Passenger/Driver)
   | Enters credentials (email, password, name, gender, vehicle type for drivers)
   | Female passengers can select preferred driver gender for bike rides (males cannot)
   |
   v
[Authentication]
   | Login: Validates credentials, navigates to respective dashboard
   | Register: Creates user, stores in LocalStorage, navigates to dashboard
   |
   v
[Passenger Dashboard]                [Driver Dashboard]
   | Book Ride:                      | View Available Rides:
   | - Enter pickup, drop-off        | - Filter by vehicle type, gender (if specified)
   | - Select ride type (Bike/Car)   | - Only shown rides matching driver’s vehicle type
   | - Female: Select driver gender  | - Cannot accept second ride if active
   | - Only one active ride allowed  | Update Ride Status:
   | View Current Ride Status       | - Start Ride (Accepted -> In Progress)
   | View Ride History (Completed)  | - Complete Ride (In Progress -> Completed)
   |
   v
[Logout]
   | Clears LocalStorage, returns to Login Page
```

```
Login/Register: Users authenticate or create an account, with responsive UI and female-friendly gender selection for bike rides (exclusive to female passengers).
Passenger Dashboard: Passengers book one ride at a time, view current ride status (with icons), and see ride history.
Driver Dashboard: Drivers view rides matching their vehicle type and gender (if specified), accept/reject one ride at a time, and update status.
Logout: Clears session and redirects to login.
```

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd ride-sharing-app
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

   Ensure dependencies like react, react-router-dom, framer-motion, @mui/icons-material, and tailwindcss are installed (see package.json).

3. **Run the Application:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) (or the Vite default port) in your browser.

4. **Test Responsiveness:**

   * Use Chrome DevTools to simulate mobile devices (e.g., iPhone, iPad) and verify UI consistency.
   * Test login, registration, ride booking, and ride management flows.

5. **Build for Production:**

   ```bash
   npm run build
   ```

## Dependencies

* **React**: Frontend framework for building UI components.
* **React Router**: Handles client-side routing (/login, /register, /passenger/dashboard, /driver/dashboard).
* **Framer Motion**: Minimal animations for smooth transitions (fade-in, slide-in).
* **Material-UI Icons**: Icons for UI elements (DirectionsCar, Person, CheckCircle, etc.).
* **Tailwind CSS**: Utility-first CSS for responsive design and consistent styling.
* **TypeScript**: Type safety for models (Passenger, Driver, Ride) and components.
* **LocalStorage**: Persists user and ride data (via localStorage.ts).

## Notes
- Platform has localStorage.ts file for initial population of data (will only be loaded if if no same key value is in local storage).
- Platform can also handle dynamic creation of Accounts, rides and proper state management of rides and history.