# AI Finance Tracker

A modern, AI-powered personal finance management application built with React, Vite, and Tailwind CSS.

![FinanceAI Banner](https://via.placeholder.com/1200x400/6366f1/ffffff?text=AI+Finance+Tracker)

## ✨ Features

- ** Dashboard** - Visual overview of your financial health with key metrics
- ** Transaction Management** - Add, track, and manage income & expenses
- ** Analytics** - Detailed charts and spending insights
- ** AI-Powered Advice** - Personalized financial recommendations
- ** Budget Planning** - Set and monitor monthly budgets
- ** Dark/Light Mode** - Beautiful themes for any time of day
- ** Responsive Design** - Works seamlessly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-finance-tracker.git
cd ai-finance-tracker

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Vercel Deployment

1. Push this repository to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Vercel automatically detects the Vite configuration
5. Deploy - Your app will be live in seconds!

##  Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Charts:** Recharts
- **Icons:** Lucide React
- **Deployment:** Vercel

##  Project Structure

```
ai-finance-tracker/
├── index.html              # Entry HTML with SEO & theme script
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment config
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── public/                 # Static assets
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main app component
    ├── index.css           # Global styles
    ├── utils/
    │   └── helpers.js      # Utility functions
    └── components/
        ├── Header.jsx      # Top navigation bar
        ├── Dashboard.jsx   # Main dashboard view
        ├── TransactionForm.jsx  # Add transaction form
        ├── TransactionList.jsx  # Transaction history
        ├── Charts.jsx      # Analytics charts
        ├── AIAdvice.jsx    # AI recommendations
        └── BudgetSettings.jsx  # Budget configuration
```

##  Design System

### Color Palette

| Mode | Background | Primary | Secondary |
|------|-----------|---------|-----------|
| Light | Pastel Blue (#eff6ff) | Indigo → Purple | Pink |
| Dark | Dark Slate (#1e293b) | Indigo → Purple | Pink |

### Typography

- **Font:** Inter (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700, 800

### Components

- **Cards:** Rounded corners (16px), subtle shadows, hover effects
- **Buttons:** Gradient backgrounds, scale & shadow on hover
- **Inputs:** Full-width, rounded borders, focus states
- **Navigation:** Top bar with horizontal links, mobile hamburger menu

##  Responsive Breakpoints

| Breakpoint | Width |
|------------|-------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Desktop | > 1024px |

##  Configuration

### Theme Toggle

The app uses a theme toggle in the header. Theme preference is saved to localStorage and persists across sessions.

```javascript
// Theme is stored in localStorage
localStorage.getItem('finance-tracker-theme') // 'dark' or 'light'
```

### Budget Settings

Configure your monthly budget and alert threshold in Settings:

```javascript
{
  monthlyLimit: 5000,      // Monthly spending limit
  alertThreshold: 80       // Alert at 80% of budget
}
```

## 📈 Features Detail

### Dashboard

- **Income/Expense Summary** - Quick view of current month totals
- **Net Balance** - Calculate your current financial position
- **Budget Progress** - Visual circular progress indicator
- **Quick Actions** - Fast access to add transactions

### Transaction Management

- **Add Transactions** - Record income/expenses with categories
- **Filter & Search** - Find transactions quickly
- **Sort Options** - By date or amount
- **Delete** - Remove unwanted entries

### Analytics

- **Monthly Trends** - Area chart showing income vs expenses
- **Expense Distribution** - Bar chart by category
- **Trend Indicators** - Compare with previous month

### AI Advice

- **Financial Health Score** - 0-100 rating
- **Personalized Tips** - Based on your spending patterns
- **Quick Tips** - General financial advice

##  Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Code Style

- ESLint configured for React
- Prettier for code formatting
- Tailwind CSS for styling

##  License

MIT License - feel free to use this project for personal or commercial purposes.

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##  Support

For support, please open an issue in the GitHub repository.

---

##  TODO - Development Log

### Phase 1: Foundation Updates
- [x] Update index.css - Add dark mode CSS variables and modern styling
- [x] Update tailwind.config.js - Add dark mode colors and modern color palette

### Phase 2: Core Layout Changes
- [x] Update App.jsx - Add dark mode state, remove left sidebar, add top navigation
- [x] Update Header.jsx - Transform to modern top navigation with theme toggle

### Phase 3: Component Updates
- [x] Update Dashboard.jsx - Dark mode compatible with modern design
- [x] Update TransactionForm.jsx - Dark mode compatible form
- [x] Update TransactionList.jsx - Modern table design with dark mode
- [x] Update Charts.jsx - Dark mode compatible charts
- [x] Update AIAdvice.jsx - Modern card design
- [x] Update BudgetSettings.jsx - Clean settings interface

### Phase 4: Cleanup & Deployment Prep
- [x] Remove Sidebar.jsx (replaced by top navigation)
- [x] Add vercel.json for Vercel deployment
- [x] Add theme flash prevention script
- [x] Add meta tags for SEO
- [x] Run production build - SUCCESS

### Phase 5: Final Polish
- [x] Remove non-functional hover arrow from chart card
- [x] Create README.md with deployment instructions

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

