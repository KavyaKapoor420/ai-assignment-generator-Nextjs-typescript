
[Link-of-the-crazzy-assignment](https://www.notion.so/VedaAI-Full-Stack-Engineering-Assignment-32748238bd318068a430e90272b485d7)
# Vedai Assignment Generator (Next.js)
[figma-file-link](https://www.figma.com/design/nB2HMm1BhTpmHcHrmEslGB/VedaAI---Hiring-Assignment?node-id=0-1&p=f&t=tUGLkRYU2B1jXhCg-0)

[my-figma-duplicated-copy-file](https://www.figma.com/design/CSiaWfh0xUNaag43sKP03b/VedaAI---Hiring-Assignment--Copy-?node-id=0-1&t=N5chhirCO1hRAUEq-0)

This repo contains the **Assignment Generator UI** (Next.js + TypeScript) for creating assignments and generating papers.


---

## Project Structure

- `client/` — Next.js (frontend)
  - `app/assignments/*` — assignment list, create flow, and generated paper views
  - `app/layout.tsx` — root layout


---

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

---

## Local Setup & Run (Frontend)

### 1) Install dependencies

```bash
cd Vedai-assignment/client
pnpm install
```

(If you prefer npm)

```bash
cd Vedai-assignment/client
npm install
```

### 2) Run the dev server

```bash
pnpm dev
```

(or)

```bash
npm run dev
```

### 3) Open in browser

Visit:
- `http://localhost:3000`

---

## Deployment

### Vercel

The project is configured for Vercel builds from `client/`.


---

## Architecture Overview

High-level flow (UI-only):

1. User navigates to **/assignments**
2. User opens **/assignments/create**
3. User fills assignment inputs (question type, topic, etc.)
4. The UI requests generation
5. Generated output is shown under **/assignments/output** (and related views)
