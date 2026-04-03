# Marcus Daley — AI-Driven Portfolio Platform

An event-driven, AI-integrated developer platform that showcases engineering, UX, and system design through interactive features. Built with Next.js, TypeScript, and Tailwind CSS.

**This is not a traditional portfolio.** It is a self-evolving system that demonstrates advanced software engineering through interaction — featuring a Tamagotchi-style AI companion, dynamic GitHub project loading, and a Python learning microservice.

---

## Key Features

- **Interactive AI Companion** — A Tamagotchi-style pet system powered by an event-driven architecture (EventBus, Observer pattern). Actions are gated behind educational quizzes about service dog training.
- **Dynamic Project Loading** — Projects are fetched from the GitHub API with ISR caching. New repos appear automatically. Recruiters can toggle how many projects are displayed (3/6/9/All).
- **Command Center UI** — Glassmorphism panels, terminal-style typography, animated gradients, and status indicators create a memorable developer experience.
- **Spline 3D Ready** — Architecture includes a SplineController adapter for future 3D scene integration. Zero bundle cost until a scene is connected.
- **Python Learning Microservice** — FastAPI service providing quiz questions and answer validation. Falls back to client-side question bank when unavailable.

---

## Architecture

```
UI Layer (React/Next.js)
    │
    ▼
EventBus (Observer Pattern) ◄──── SplineController (3D Adapter)
    │
    ▼
PetEngine (Game Logic)
    │
    ├──► PetRepository (localStorage)
    └──► LearningClient (API + Fallback)
```

**Principles:**
- Event-driven communication (no polling)
- Repository pattern for persistence
- Dependency injection via constructor parameters
- Strict separation of concerns (types / systems / repositories / state / UI)
- 95% reusable, 5% project-specific

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.x | Framework (App Router, ISR) |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling + animations |
| FastAPI | 0.109+ | Learning microservice (Python) |

---

## Project Structure

```
src/
├── app/              # Pages (Home, Projects, About, Blog, Contact)
├── components/       # UI components (NavBar, Tamagotchi, ProjectDisplayControl)
├── systems/          # Business logic (EventBus, PetEngine, SplineController, LearningClient)
├── repositories/     # Persistence (PetRepository, ProjectRepository)
├── state/            # React hooks (usePetSystem)
├── types/            # Type contracts (events, pet, spline, project)
└── data/             # Configuration (projectOverrides, projectVideos)

services/
└── learning-service/ # Python FastAPI microservice

docs/                 # QA reports and documentation
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Learning Microservice (Optional)

```bash
cd services/learning-service
pip install -r requirements.txt
uvicorn app:app --port 8001
```

The portfolio works without the microservice — it falls back to a built-in question bank.

---

## Author

**Marcus Daley**
- US Navy Veteran (9+ years)
- Full Sail University Graduate — BS Computer Science, Game Development
- Specializing in tool programming, quality assurance, and graphics engineering

[LinkedIn](https://www.linkedin.com/in/marcusdaley-gamedev) | [GitHub](https://github.com/GrizzwaldHouse) | [YouTube](https://www.youtube.com/@marcusdaley7301)

---

## License

This project is proprietary. All rights reserved.
