# Cosmos Odyssey

**Cosmos Odyssey** is a web application that allows users to explore travel routes, make reservations, and view prices between planets in the solar system. The application provides an intuitive interface for users to choose their destinations, explore available routes, and make reservations.

## Purpose

The goal of Cosmos Odyssey is to provide users with an interactive platform to explore and manage space travel routes between planets in the solar system. The app is designed for both exploration and reservation management, making it easy for users to plan and book trips to distant planets.

## The app fetches route data from an API and enables the following features

[Travel Prices API](https://cosmosodyssey.azurewebsites.net/api/v1.0/TravelPrices)

- ***View detailed travel routes, including multi-leg journeys, prices, durations, and distances.***
- ***Filter and sort routes by various parameters (company, price, travel time, and distance).***
- ***Make reservations for space travel based on selected routes.***

## Features

- **Route Display:** Shows travel routes between planets, including multiple legs of the journey.
- **Filter and Sort:** Filter routes by provider and sort them based on price, travel time, or distance.
- Reservation Management:** Users can reserve a route, providing their personal information and managing reservations.
- **Dynamic Price List:** The application fetches the latest price list and updates accordingly.
- **Multi-leg Travel:** The system supports complex multi-leg travel routes, calculating the best options for users.

## Technologies Used

- **React** frontend for user interactions.
- **Vite** build tool for fast and efficient development.
- **Tailwind CSS** for styling.
- **API:** Fetching and displaying route data from a third-party API.

## Getting Started

To run Cosmos Odyssey locally, follow these steps

### Clone repository

```json
git clone https://github.com/Martenelias/cosmos-odyssey.git
cd cosmos-odyssey-project
```

### Install dependencies

```json
npm install
```

### Run the application

```json
npm run dev
```

This will start the application locally. You can view the app in your browser at [http://localhost:5173](http://localhost:5173)
