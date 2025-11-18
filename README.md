# Companies Directory

A modern React-based frontend application that displays and filters company data with a responsive UI built using Vite, React.js, and Tailwind CSS.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Company Display**: View companies in card or table layout
- **Advanced Filtering**: Filter by name, industry, location, employee count, and status
- **Search**: Real-time search across company names and emails
- **Sorting**: Click column headers to sort table data
- **Pagination**: Navigate through company listings with optimized page selection
- **Loading States**: User-friendly loading and error states
- **View Toggle**: Switch between card and table views

## Deplyoment

**View demo**
[VIew Project]()

## Installation

### Setup

1. **Clone the repository**

```bash
git clone  https://github.com/vishnuu5/Frontend-task-FLM.git
cd companies-directory
```

2. **Install dependencies**

```bash
npm install
```

Terminal 1 - Frontend:

```bash
npm run dev
```

Terminal 2 - Backend:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will run on `http://localhost:3001`

## Technology Stack

### Frontend

- **Vite** - Next generation frontend tooling
- **React 18** - UI library
- **JavaScript** - Programming language
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Context API** - State management

### Backend (Mock API)

- **Express.js** - Web framework
- **Node.js** - JavaScript runtime
- **CORS** - Cross-origin resource sharing

## Features in Detail

### Filtering

- **Search**: Real-time filtering by company name or email
- **Industry Filter**: Select from available industries
- **Location Filter**: Filter companies by location
- **Employee Count**: Filter by company size
- **Status Filter**: Active, Inactive, or Pending

### Sorting

Click on table column headers to sort:

- Company Name
- Industry
- Location
- Employee Count
- Founded Year

### Pagination

- 10 companies per page
- Smart page number display
- Navigate with Previous/Next buttons

### View Modes

- **Card View**: Visual grid layout with company details
- **Table View**: Structured data table with inline sorting

## API Endpoints

### Get All Companies

```js
GET / api / companies;
```

### Get Company by ID

```js
GET /api/companies/:id
```

### Create New Company

```js
POST /api/companies
Content-Type: application/json

{
  "name": "Company Name",
  "email": "company@example.com",
  "industry": "Technology",
  "location": "AP",
  "employeeCount": 100,
  "foundedYear": 2020,
  "status": "Active"
}
```

## Component Documentation

### Header Component

Displays the application title and key statistics about companies.

### FilterPanel Component

Sidebar with filtering options:

- Search input
- Industry dropdown
- Location dropdown
- Employee count dropdown
- Status dropdown
- Reset button

### CompanyList Component

Main content area with:

- List header and view toggle
- Dynamic rendering based on view type
- Pagination controls
- Loading/error/empty states

### CompanyCard Component

Card-based company display with:

- Company icon
- Basic information
- Status badge
- Details button

### CompanyTable Component

Table-based company display with:

- Sortable columns
- Company details
- Status badges
- Responsive design

### Pagination Component

Page navigation with:

- Previous/Next buttons
- Page number buttons
- Current page indicator
- Ellipsis for large page counts

## State Management

The application uses **React Context API** with custom hooks for state management:

### CompanyContext

Manages:

- Companies list
- Loading and error states
- Filter state
- Sort configuration
- Pagination state

### useCompanies Hook

Custom hook for accessing context in components

## Performance Optimizations

- Efficient filtering and sorting algorithms
- Memoized callback functions
- CSS-based animations
- Responsive images
- Optimized re-renders with Context API

## Troubleshooting

### Problem 1: CORS Error - "Access to XMLHttpRequest blocked"

**Error Message:**

Access to XMLHttpRequest at 'http://localhost:3001/companies' from origin 'http://localhost:5173'
has been blocked by CORS policy

**Root Cause:**
The backend CORS configuration was set to accept requests only from `http://localhost:3000`, but the Vite development server runs on `http://localhost:5173` by default.

**Solution:**
Update your `backend/server.js` CORS configuration to accept multiple localhost ports:

```javascript
const cors = require("cors");

const corsOptions = {
  origin: function (origin, callback) {
    // Allow localhost with any port for development
    if (
      !origin ||
      origin.includes("localhost") ||
      origin.includes("127.0.0.1")
    ) {
      callback(null, true);
    } else {
      // For production, check against specific URL
      const allowedOrigins = [
        process.env.CORS_ORIGIN || "http://localhost:5173",
      ];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
```

Also ensure your `.env` has the correct ports:

```bash
FRONTEND_PORT=5173
BACKEND_PORT=3001
VITE_API_URL=http://localhost:3001
```

### Problem 2: "Failed to fetch companies" - Backend Not Running

**Error Message:**
Error loading companies: Error: Failed to fetch companies
Failed to load resource: net::ERR_FAILED

**Root Cause:**
The backend server is not running or not accessible at the configured URL.

**Solution:**

1. Make sure the backend is running:

```bash
npm run server
```

You should see: `Server running on http://localhost:3001`

2. Verify the API is accessible:

```bash
curl http://localhost:3001/companies
```

3. Check that both servers are running.

### Problem 3: Filters Not Working - Context Not Initialized

**Error Message:**
Cannot read property of undefined (reading 'companies')

**Root Cause:**
CompanyContext is not properly wrapping the application.

**Solution:**
Verify `src/main.jsx` includes the provider:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CompanyProvider } from "./context/CompanyContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CompanyProvider>
      <App />
    </CompanyProvider>
  </React.StrictMode>
);
```

## License

MIT License - feel free to use this project for educational purposes.
