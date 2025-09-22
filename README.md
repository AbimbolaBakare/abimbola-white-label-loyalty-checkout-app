# White Label Loyalty - Grocery Store

A React checkout application built with TypeScript.

## Run locally
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test
```

## Project Overview
- Add products to the cart by clicking.
- Increment product quantity by clicking multiple times.
- Buy-one-get-one-free on Asparagus.
- 20% discount applied if total > £10.
- Cart summary shows subtotal, discounts, and final total.
- Unit tested.
- Memoized calculations and optimized re-renders.
- Component-based design with clear separation of concerns.
- Mobile-first approach with CSS Grid and Flexbox

## Tech Stack
- React + TypeScript
- Vite for fast build/dev server
- CSS modules for styling
- Reducer for cart state management
- Jest and RTL for testing

## Tradeoffs
- No backend: Kept product list static to reduce complexity.
- No global state lib (Redux/Zustand): Cart handled with  useReducer since scope is small.
- No use of styling library since focus is on functionality
  
## Future enhancements
- API-driven: Replace mock service with real API integration.
- Add persistent cart (localStorage/external library).
- Expand promotion engine for more complex discount rules.
- Product search
- Setup CI to run tests on every push
- Checkout + payment integration

## AI Usage
Used ChatGPT to verify discount logic.
