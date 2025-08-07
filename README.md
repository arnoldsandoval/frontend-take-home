# Frontend Take-Home Assignment - Arnie Sandoval

## Project Overview

> [!TIP]  
> If you're looking to get started, skip ahead to the [Getting Started](#getting-started) section.

This is my implementation of the WorkOS Frontend Take-Home Assignment, completed within the 8-hour time limit. The application is a user and role management interface built with modern React technologies and best practices.

### AI Disclosure

I limited my LLM usage (Claude Code and Cursor) to autocomplete and rubber ducking. While AI has become integral to my workflow in the past few years, I wanted to demonstrate my independent problem-solving and architectural thinking rather than delegating core implementation to an LLM.

### Loom Walkthrough

I've recorded a visual walkthrough highlighting key features and rough edges that may not be
obvious from code alone. This reflects how I approach async collaboration through video
documentation. I have found this to be a hugely valuable tool for distributed team collab as well as for reference in the future. `LINK TO LOOM WALK THROUGH`

### Code Review

I conducted a self-review prior to submission as a quality check and to identify areas for
improvement. You can see it here `LINK TO CODE REVIEW`

## Getting Started

### Prerequisites

- Node.js (22.14.0)
- pnpm (recommended) or npm

### Installation & Running

```bash
# Install dependencies
pnpm install

# You can start both the client and server packages from the monorepo root by running the dev script.
pnpm dev
```

The application will be available at `http://localhost:3000`

If you wish, you can still run the client and server apps independently as you could before the monorepo refactor.

## Implementation Highlights

### Completed Features

- [x] Users and Roles tab structure
- [x] Users table with avatar, name, role, and join date
- [x] Search functionality with URL state persistence
- [x] User deletion with confirmation dialog
- [x] Roles table with name, description, and default badge
- Not completed within time limit:
  - [ ] Role renaming
  - [ ] Pagination

> [!NOTE]  
> **Areas for Improvement**
>
> 1. Complete role renaming functionality and implement pagination for the user table.
> 2. The `default` role will always fail when trying to delete it. This functionality is intentional on the server side. We should allow the user to change the default role so that they can delete a role and add a new default role.

## Architecture & Technical Decisions

### Technology Stack

**Stack**: Next.js 15 + App Router, Radix Primitives/shadcn UI, TailwindCSS v4, useSWR + nuqs for state, TypeScript, Turborepo monorepo.

### User Experience Philosophy

Understanding that WorkOS really values top-tier UX, I prioritized methods and technologies that enhance user experience. I initially wanted server-rendered components, but pivoted to client-side fetching with useSWR (13.6 kB minified) for optimistic UI updates within time constraints.

I also felt it was important to let the API be the source of truth for managing state. Instead of managing global state on the client-side, I let query parameters act as the source of truth for our client-side state using `nuqs` (13.6 kB minified). This mimics our API interface and allows for refreshing of a page and sharing of a URL without losing your position on the page.

### Component Architecture

**Modular and reusable components**

```
app/          # Application routes, layout, pages and suspense boundaries
services/     # API fetcher utilities, separated by resources (users, roles, etc.)
lib/          # Utilities for CSS class names and data formatting (dates, names, etc.)
hooks/        # React hooks for data fetching (useSWR abstractions)
components/   #
├── app/      # Application-specific components, these components are deliberately *not* designed
│             # to be composable. They are meant to be reusable drop in components (think WorkOS widgets)
│
└── ui/       # Smaller atomic pieces of UI, think Buttons, Inputs, Tables etc. Fully composable by design.
```

Built with shadcn/Radix UI primitives, variant-based styling, and full TypeScript (with one time-constrained hack I documented in code review).

#### Tabs vs Navigation

While the design visually looks like tabs, I implemented these as separate pages. Tabs work best for different views of the same content, but Users and Roles are completely different entities.

With navigation, you can bookmark the Roles page, share a URL directly to Users, and the browser back button works as expected. While you can achieve this with tabs, it requires a lot more code overhead and isn't a better experience from an accessibility or usability perspective.

### State Management Strategy

**Why useSWR over `useOptimistic`?** While I could've used React's native hooks, useSWR provides cache invalidation, background revalidation, and `keepPreviousData` for smooth transitions - more utility with fewer tradeoffs.

**Local State**: Minimal component state with proper lifting for user/role delete dialogs.

## Performance & Loading Strategy

As I have been known to say, the best loading state is no loading state. Currently there's a staggered cascade: Suspense → API loading → content shift. In production, I'd server-fetch everything and only show loaders for user-triggered filtering. Time constraints and API latency led me to a "traditional" client-side approach that still felt somewhat good here.

Regardless of approach, the loading states could have been refined further. It was an area I would have invested more time in had I had it.

> [!NOTE]  
> **Area for Improvement**: Refine the loading state cascade and reduce the jarring transitions between loading phases.

## Quality & Standards

### Error Handling & Resilience

I prioritized clean architecture with error boundaries, though this came with trade-offs. Users get clear toast notifications for operation feedback, and I implemented optimistic updates that rollback when operations fail. Error boundaries provide clean separation of concerns and catch unexpected failures.

However, SWR's automatic retry doesn't play nicely with error boundaries in suspense mode ([this is a known issue](https://github.com/vercel/swr/issues/1907)). From an architecture perspective, error boundaries are the right approach, but time constraints prevented me from attempting to implement the middleware workaround needed to restore retry functionality.

> [!NOTE]  
> **Areas for Improvement**:
>
> 1. Implement the middleware workaround to restore SWR's automatic retry functionality while maintaining error boundary architecture.
> 2. I used lucide-react icons, I realize that was not as part of the original design spec. With more time I would have implemented a custom icon package using SVGO and SVGR for reuse across apps.

### Accessibility

I built this with keyboard users in mind from the start. Every interaction works without a mouse, dialogs close with Escape, and focus indicators are clear throughout. The semantic HTML structure and ARIA labels ensure screen readers can navigate effectively.

> [!NOTE]  
> **Area for Improvement**: Implement live regions for dynamic content - vital for screen reader users when filtering search results.

## Thank you!

⭐ If you read this far, thank you!
