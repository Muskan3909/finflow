# Finflow · Finance Dashboard

A clean, interactive personal finance dashboard built with **React 18 + TypeScript + Vite**.

![Finflow Dashboard](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?style=flat&logo=typescript) ![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat&logo=vite) ![Recharts](https://img.shields.io/badge/Recharts-2.12-22b5bf?style=flat)

---

## Features

| Feature | Details |
|---|---|
| **Dashboard Overview** | Total Balance, Monthly Income, Expenses, Savings Rate cards |
| **Time-based Chart** | 6-month balance line chart (Oct 2025 – Mar 2026) |
| **Categorical Chart** | Spending breakdown donut chart by category |
| **Transactions Table** | Full list with date, amount, category, type |
| **Search & Filter** | Live search + filter by category and transaction type |
| **Sorting** | Sort by date or amount (ascending / descending) |
| **Role-based UI** | Viewer (read-only) vs Admin (Add / Edit / Delete) — toggle in header |
| **Insights Section** | Monthly bar chart, top category progress bars, MoM KPIs, smart tip |
| **State Management** | React Context + useReducer — no external state library needed |
| **Persistence** | All data, role, and theme saved to `localStorage` |
| **Dark / Light Mode** | Toggle in header, persisted across sessions |
| **Export** | One-click CSV and JSON download |
| **Responsive** | Sidebar drawer on mobile, reflow grid on small screens |

---

## Tech Stack

- **React 18** with functional components and hooks
- **TypeScript 5.5** — fully typed throughout
- **Vite 5** — instant HMR, fast builds
- **Recharts 2** — LineChart, PieChart, BarChart
- **CSS Variables** — theming without a CSS framework
- **React Context + useReducer** — state management

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/finflow.git
cd finflow

# Install dependencies
npm install

# Start dev server
npm run dev
```


### Build for Production

```bash
npm run build
# Output in /dist — deploy to Vercel, Netlify, or GitHub Pages
```

### Deploy to Vercel 
```bash
npm i -g vercel
vercel
```
### Live Demo
demo: [http://finflow-2pzt.vercel.app/](http://finflow-2pzt.vercel.app/)

---

## Project Structure

```
finflow/
├── public/
│   └── favicon.svg
├── src/
│   ├── types/
│   │   └── index.ts          # Shared TypeScript types
│   ├── data/
│   │   └── seed.ts           # 36 mock transactions + colour maps
│   ├── utils/
│   │   └── helpers.ts        # fmt, fmtFull, fmtDate, sumIncome, export…
│   ├── context/
│   │   └── AppContext.tsx    # Global state (Context + useReducer)
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── ui/
│   │   │   └── SummaryCard.tsx
│   │   ├── charts/
│   │   │   └── ChartTooltips.tsx
│   │   └── modals/
│   │       └── AddEditModal.tsx
│   ├── views/
│   │   ├── DashboardView.tsx
│   │   ├── TransactionsView.tsx
│   │   └── InsightsView.tsx
│   ├── styles/
│   │   └── globals.css       # Design tokens + all component styles
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Design Decisions & Trade-offs

### State Management: Context + useReducer
Chose React's built-in Context API with `useReducer` over Redux or Zustand. For a dashboard of this scale, a single reducer with typed actions (`ADD_TRANSACTION`, `EDIT_TRANSACTION`, etc.) is clear, testable, and requires zero extra dependencies. The trade-off is that Context isn't optimised for high-frequency updates — a dedicated state library would be preferable if real-time data streams were involved.

### Styling: CSS Variables, No Framework
Plain CSS with custom properties gives full design control without Tailwind's class verbosity or MUI's bundle overhead. The design tokens (colours, spacing, typography) live in `:root` and a `.light` override class, making dark/light mode a single `className` swap on `<html>`.

### Charts: Recharts
Recharts integrates naturally with React's declarative model. Custom tooltip components keep the visual language consistent with the rest of the UI. The trade-off versus a canvas-based library (e.g. Chart.js) is slightly larger bundle size, offset by better React compatibility.

### Role-based UI: Frontend-only
Viewer/Admin is toggled in the header and stored in `localStorage`. Viewer sees data only; Admin sees Add/Edit/Delete controls on the transactions table. This is a UI simulation — real RBAC would require backend enforcement.

### Data Persistence: localStorage
Transactions, role, and theme are serialised to `localStorage` on every state change via a `useEffect`. This gives session persistence without a backend. Trade-off: storage is limited to ~5 MB and is not shared across devices.

---

## Mock Data

36 transactions across **January – March 2026** covering 9 categories:

`Salary · Freelance · Rent · Food · Transport · Utilities · Shopping · Health · Entertainment`

All amounts are in Indian Rupees (₹), simulating a Bengaluru-based professional's monthly finances.

