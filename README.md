# Paws & Preferences

A fun, interactive Tinder-like swipe interface for discovering and rating adorable cats! Swipe right to like, left to dislike and see a summary of your favorite kitties at the end.

![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)

## Features

- **Swipeable Interface**: Drag cards left or right, or use the action buttons
- **Smooth Animations**: Powered by Framer Motion for fluid card transitions
- **Persistent State**: Your preferences are saved using Zustand with localStorage
- **Celebration**: Confetti animation when you complete the session
- **Summary View**: See all your liked cats in a beautiful grid layout
- **Reset & Retry**: Start over with a fresh set of random cats
- **Error Handling**: Automatic fallback images for failed API requests
- **Optimized Performance**: Built with Next.js 16 App Router and SWR for efficient data fetching

## Tech Stack

### Core

- **[Next.js 16.0.5](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.0](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[class-variance-authority](https://cva.style/)** - Component variant management

### State Management & Data Fetching

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management with persistence
- **[SWR](https://swr.vercel.app/)** - Data fetching and caching

### Animations & Effects

- **[Framer Motion](https://www.framer.com/motion/)** - Animation library for React
- **[React Confetti](https://github.com/alampros/react-confetti)** - Celebration effects

### API

- **[CATAAS API](https://cataas.com/)** - Cat as a Service API for random cat images

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn/bun

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd paws-preferences
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_CATAAS_URL=https://cataas.com
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
paws-preferences/
├── app/
│   ├── api/
│   │   └── random-cats/      # API route for fetching random cats
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page component
├── components/
│   ├── ui/                    # Reusable UI components (shadcn/ui)
│   ├── CatCard.tsx            # Individual swipeable cat card
│   ├── CatStack.tsx           # Stack of cat cards with swipe logic
│   └── CatSummary.tsx         # Summary view of liked cats
├── hooks/
│   └── use-confetti.ts        # Confetti animation hook
├── stores/
│   └── cat-summary-store.ts   # Zustand store for app state
├── types/
│   └── cat.ts                 # TypeScript type definitions
└── lib/
    └── utils.ts               # Utility functions
```

## How to Use

1. **Swipe Cards**: Drag cards left (dislike) or right (like), or use the action buttons at the bottom
2. **Track Progress**: See your progress with the counter badge (e.g., "5 / 15")
3. **Complete Session**: After swiping through all 15 cats, view your summary
4. **Celebrate**: Enjoy the confetti celebration!
5. **Review**: Browse through all your liked cats in the summary grid
6. **Reset**: Click "Start Over" to get a fresh set of random cats

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Environment Variables

| Variable                 | Description                 | Required |
| ------------------------ | --------------------------- | -------- |
| `NEXT_PUBLIC_CATAAS_URL` | Base URL for the CATAAS API | Yes      |

## Deployment

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add the `NEXT_PUBLIC_CATAAS_URL` environment variable
4. Deploy!

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

MIT
