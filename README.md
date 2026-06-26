# StudentHub

> A personal command centre for a student's academic and day-to-day life

## About the Project

**StudentHub** is a full-stack web application built as part of the ISTE WebDev Summer School. The project evolves week by week, starting from a static landing page and growing into a fully deployed, feature-rich platform.

### Planned Features (across 6 weeks)

- **Week 1** — Responsive landing page (HTML + CSS)
- **Week 2** — Interactive dashboard with persistent data
- **Week 3** — React-powered frontend with routing
- **Week 4** — Node.js + MongoDB backend with REST APIs
- **Week 5** — JWT authentication & cloud deployment
- **Week 6** — Dockerization, CI/CD, and final live demo

---

## Week 1 Progress — Responsive Landing Page

### What was built

A fully responsive landing page for StudentHub with the following sections:

- **Navbar** — Sticky navigation bar with logo, page links, and an Explore button
- **Hero Section** — Full viewport height (`100vh` / `min-h-screen`) hero banner featuring a headline, description, and call-to-action buttons alongside a dashboard preview image
- **Features Section** — Four feature cards (Task Management, Quick Links, Timetable, Study Habits) displayed in a grid
- **How it Works Section** — Step-by-step breakdown using a definition list with an accompanying illustration
- **CTA Section** — Final call-to-action encouraging users to get started
- **Footer** — Copyright and credits

### Tech used (Week 1)

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and content |
| CSS3 | Styling, layout (Flexbox + Grid), and responsive design |

---

## Week 2 Progress — Interactive Dashboard with Persistent Data

### What was built

A fully functional, persistent dashboard interface (`dashboard.html`) and landing page redesign powered entirely by utility-first **Tailwind CSS v4.0**:

- **Task Management** — Add, complete, and delete custom tasks with deadlines and category tags.
- **Weekly Class Timetable** — Manage a visual timetable. Columns automatically merge for longer classes and highlight class types/rooms with interactive hover-delete controls.
- **Habits Tracker** — Create daily habit checklists that track progress across 7 days.
- **Quick Links** — Save custom names and URLs to bookmark cards to quickly access reference sites.
- **Dynamic Quotes** — Fetches random quotes from the DummyJSON API with graceful fallback logic.
- **Tailwind CSS Integration** — Cleaned up project styling by removing all custom CSS files and replacing them with Tailwind CSS utility classes, utilizing CSS-first `@theme` settings for custom colors/fonts.

### Tech used (Week 2)

| Technology | Purpose |
|---|---|
| HTML5 | Page layouts and semantic structures |
| Tailwind CSS v4.0 | Utility-first responsive styling and typography rules |
| JavaScript (ES6) | LocalStorage persistence, DOM rendering, and API fetch calls |

---

## Project Structure

```
StudentHub/
├── index.html                   # Landing page
├── dashboard.html               # Interactive student workspace
├── package.json                 # Build script setups & dependencies
├── src/
│   ├── styles/
│   │   └── input.css            # Tailwind directives, theme variables, custom scrollbars
│   └── scripts/
│       ├── dashboard.js         # Handles dynamic rendering of tasks and habits
│       ├── timetable.js         # Controls weekly schedule cell creation and mergers
│       ├── links.js             # Handles link bookmark additions and deletions
│       └── quotes.js            # Fetches and renders daily quotes from the web
└── dist/
    └── css/
        └── output.css           # Compiled, minified stylesheet production bundle
```

---

## Author

**Harshith Saveesh**  
MIT CSE  

---

> Project built as part of ISTE Summer Camp — Week 2 Submission

