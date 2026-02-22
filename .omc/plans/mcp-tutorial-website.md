# MCP Interactive Tutorial Website - Implementation Plan

## Overview

Build a comprehensive React interactive tutorial website for learning MCP (Model Context Protocol) with 6 modules covering concepts through deployment.

**Tech Stack**: Next.js 15 + React 19 + Tailwind CSS 4 + shadcn/ui + Zustand + MDX

---

## Phase 1: Foundation (Sequential - No Parallel)

### Task 1.1: Initialize Next.js Project
| Property | Value |
|----------|-------|
| Agent | `executor-low` (haiku) |
| Files | package.json, tsconfig.json, next.config.ts |
| Output | Working Next.js 15 app with TypeScript |

**Commands**:
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
npm install zustand next-themes lucide-react clsx tailwind-merge
npm install -D shadcn@latest
```

---

### Task 1.2: Configure Tailwind + shadcn/ui
| Property | Value |
|----------|-------|
| Agent | `executor-low` (haiku) |
| Dependencies | Task 1.1 |
| Files | tailwind.config.ts, components.json, src/lib/utils.ts |
| Output | Working dark mode with base UI components |

**Initialize shadcn**:
```bash
npx shadcn@latest init
```

**Add required components**:
```bash
npx shadcn@latest add button card accordion dialog progress tabs slider scroll-area separator
```

---

### Task 1.3: Install Additional Dependencies
| Property | Value |
|----------|-------|
| Agent | `executor-low` (haiku) |
| Dependencies | Task 1.1 |
| Packages | shiki, @mdx-js/loader, @mdx-js/react, remark-gfm, rehype-slug |
| Output | All dependencies installed |

```bash
npm install shiki @mdx-js/loader @mdx-js/react remark-gfm rehype-slug rehype-autolink-headings
```

---

## Phase 2: Core Infrastructure (Parallel)

### Task 2.1: Progress Store (Zustand)
| Property | Value |
|----------|-------|
| Agent | `executor` (sonnet) |
| Files | src/lib/progress/store.ts, types.ts, storage.ts |
| Output | Working progress tracking with localStorage |

**Interface**:
```typescript
interface ProgressState {
  completedModules: string[]
  completedSections: Record<string, boolean>
  quizScores: Record<string, { score: number; passed: boolean; attempts: number }>
  startModule(moduleId: string): void
  completeSection(moduleId: string, sectionId: string): void
  saveQuizScore(key: string, score: number, passed: boolean): void
  exportProgress(): ProgressExport
  importProgress(data: ProgressExport): void
}
```

---

### Task 2.2: MDX Configuration
| Property | Value |
|----------|-------|
| Agent | `executor` (sonnet) |
| Files | src/lib/mdx/config.ts, components.ts, mdx-components.tsx |
| Output | MDX compilation with custom components |

---

### Task 2.3: Tutorial Navigation Structure
| Property | Value |
|----------|-------|
| Agent | `executor` (sonnet) |
| Files | src/lib/navigation/tutorial-nav.ts, content/tutorials/config.ts |
| Output | Tutorial structure with all 6 modules defined |

**Structure**:
```typescript
const tutorials = {
  prerequisites: { id: 'prerequisites', title: 'Prerequisites', order: 1, sections: [...] },
  'mcp-concepts': { id: 'mcp-concepts', title: 'MCP Concepts', order: 2, sections: [...] },
  'first-server': { id: 'first-server', title: 'Your First MCP Server', order: 3, sections: [...] },
  'tools-resources': { id: 'tools-resources', title: 'Tools & Resources', order: 4, sections: [...] },
  prompts: { id: 'prompts', title: 'Prompts', order: 5, sections: [...] },
  deployment: { id: 'deployment', title: 'Deployment', order: 6, sections: [...] }
}
```

---

## Phase 3: Layout Components (Parallel)

### Task 3.1: Header Component
| Property | Value |
|----------|-------|
| Agent | `designer` (sonnet) |
| Files | src/components/layout/Header.tsx |
| Output | Responsive header with logo, theme toggle, progress indicator |

---

### Task 3.2: Sidebar Navigation
| Property | Value |
|----------|-------|
| Agent | `designer` (sonnet) |
| Files | src/components/layout/Sidebar.tsx, TableOfContents.tsx |
| Output | Collapsible sidebar with module/section tree, progress badges |

---

### Task 3.3: Progress Bar
| Property | Value |
|----------|-------|
| Agent | `executor` (sonnet) |
| Files | src/components/layout/ProgressBar.tsx |
| Output | Visual progress bar for module and overall completion |

---

### Task 3.4: Root Layout with Providers
| Property | Value |
|----------|-------|
| Agent | `executor` (sonnet) |
| Files | src/app/layout.tsx, src/components/providers/* |
| Output | Theme provider, progress provider wrapper |

---

## Phase 4: Tutorial Components (Parallel)

### Task 4.1: CodeBlock with Shiki
| Property | Value |
|----------|-------|
| Agent | `executor` (sonnet) |
| Files | src/components/tutorial/CodeBlock.tsx |
| Output | Syntax-highlighted code blocks with copy button, line numbers |

**Features**:
- Shiki-based highlighting (VS Code themes)
- Language detection
- Copy to clipboard with feedback
- Optional filename display
- Line highlighting support

---

### Task 4.2: Quiz Components
| Property | Value |
|----------|-------|
| Agent | `executor` (sonnet) |
| Files | src/components/tutorial/InlineQuiz.tsx, QuizModal.tsx |
| Output | Interactive quizzes with immediate feedback |

**Quiz Types**:
- Multiple choice
- True/False
- Code completion

---

### Task 4.3: Collapsible Sections
| Property | Value |
|----------|-------|
| Agent | `executor-low` (haiku) |
| Files | src/components/tutorial/Collapsible.tsx |
| Output | Expandable/collapsible content sections |

---

### Task 4.4: Callout Boxes
| Property | Value |
|----------|-------|
| Agent | `executor-low` (haiku) |
| Files | src/components/tutorial/Callout.tsx |
| Output | Info, warning, tip, error, success callout boxes |

---

### Task 4.5: Section Navigation
| Property | Value |
|----------|-------|
| Agent | `executor-low` (haiku) |
| Files | src/components/tutorial/SectionNav.tsx |
| Output | Previous/Next navigation buttons |

---

## Phase 5: Pages and Routes (Sequential)

### Task 5.1: Homepage
| Property | Value |
|----------|-------|
| Agent | `designer` (sonnet) |
| Files | src/app/page.tsx |
| Output | Landing page with intro, module overview, start button |

---

### Task 5.2: Tutorial Layout
| Property | Value |
|----------|-------|
| Agent | `executor` (sonnet) |
| Files | src/app/tutorials/layout.tsx |
| Output | Tutorial-specific layout wrapper |

---

### Task 5.3: Module and Section Pages
| Property | Value |
|----------|-------|
| Agent | `executor` (sonnet) |
| Files | src/app/tutorials/[module]/page.tsx, src/app/tutorials/[module]/[section]/page.tsx |
| Output | Dynamic routes for all modules and sections |

---

## Phase 6: Tutorial Content (6 Parallel Streams)

### Task 6.1: Prerequisites Module
| Property | Value |
|----------|-------|
| Agent | `writer` (haiku) |
| Files | src/content/tutorials/prerequisites/*.mdx |
| Sections | 4 sections, 30 min total |

**Content**:
1. Welcome & Setup Overview
2. Node.js Environment
3. TypeScript Setup
4. Docker Installation

---

### Task 6.2: MCP Concepts Module
| Property | Value |
|----------|-------|
| Agent | `writer` (haiku) |
| Files | src/content/tutorials/mcp-concepts/*.mdx |
| Sections | 5 sections, 45 min total |

**Content**:
1. What is MCP?
2. Architecture Overview
3. Core Concepts (Resources, Tools, Prompts)
4. Transports (stdio, SSE, HTTP)
5. MCP vs Function Calling

---

### Task 6.3: First Server Module
| Property | Value |
|----------|-------|
| Agent | `writer` (haiku) |
| Files | src/content/tutorials/first-server/*.mdx |
| Sections | 5 sections, 45 min total |

**Content**:
1. Project Setup
2. Basic Server Structure
3. Adding Your First Tool
4. Testing Locally
5. Connecting to Claude Desktop

---

### Task 6.4: Tools & Resources Module
| Property | Value |
|----------|-------|
| Agent | `writer` (haiku) |
| Files | src/content/tutorials/tools-resources/*.mdx |
| Sections | 5 sections, 60 min total |

**Content**:
1. Understanding Tools
2. Input Validation with Zod
3. Building a Calculator Tool
4. Understanding Resources
5. File System Resources

---

### Task 6.5: Prompts Module
| Property | Value |
|----------|-------|
| Agent | `writer` (haiku) |
| Files | src/content/tutorials/prompts/*.mdx |
| Sections | 3 sections, 30 min total |

**Content**:
1. What are Prompts?
2. Template Prompts
3. Prompt Best Practices

---

### Task 6.6: Deployment Module
| Property | Value |
|----------|-------|
| Agent | `writer` (haiku) |
| Files | src/content/tutorials/deployment/*.mdx |
| Sections | 5 sections, 60 min total |

**Content**:
1. Local Deployment Options
2. Docker Containerization
3. Cloud Deployment (Azure Container Apps)
4. VPS Deployment
5. Production Considerations

---

## Phase 7: Docker Configuration

### Task 7.1: Dockerfile and Config
| Property | Value |
|----------|-------|
| Agent | `executor` (sonnet) |
| Files | docker/Dockerfile, docker/nginx.conf, docker-compose.yml |
| Output | Production-ready Docker configuration |

---

## Phase 8: Build, Test, and Deploy (Sequential)

### Task 8.1: Build Verification
| Property | Value |
|----------|-------|
| Agent | `build-fixer` (sonnet) |
| Command | `npm run build` |
| Output | Successful build with no errors |

---

### Task 8.2: Link Checking and Navigation
| Property | Value |
|----------|-------|
| Agent | `verifier` (sonnet) |
| Checks | All links work, navigation flows correctly |
| Output | Verified navigation structure |

---

### Task 8.3: Quiz Validation
| Property | Value |
|----------|-------|
| Agent | `analyst` (sonnet) |
| Checks | All quizzes have correct answers, explanations make sense |
| Output | Validated quiz content |

---

### Task 8.4: Final Review
| Property | Value |
|----------|-------|
| Agent | `verifier` (haiku) |
| Checks | Progress tracking, dark mode, mobile responsive |
| Output | Complete feature checklist |

---

## Agent Summary

| Phase | Parallel Tasks | Agent Types | Est. Duration |
|-------|----------------|-------------|---------------|
| 1 - Foundation | 3 sequential | executor-low | 10 min |
| 2 - Infrastructure | 3 parallel | executor | 15 min |
| 3 - Layout | 4 parallel | designer, executor | 20 min |
| 4 - Tutorial Components | 5 parallel | executor, executor-low | 20 min |
| 5 - Pages | 3 sequential | designer, executor | 15 min |
| 6 - Content | 6 parallel | writer | 30 min |
| 7 - Docker | 1 | executor | 10 min |
| 8 - QA | 4 sequential | build-fixer, verifier, analyst | 15 min |

**Total Estimated Time**: ~2.5 hours of parallel execution

---

## Success Criteria

- [ ] All 6 modules with complete content
- [ ] All code examples are copy-paste executable
- [ ] Progress tracking persists across sessions
- [ ] Dark/light mode toggle works
- [ ] All quizzes provide immediate feedback
- [ ] Navigation allows jumping between any sections
- [ ] Docker build succeeds
- [ ] Site is mobile responsive

---

*Plan created: 2025-02-22*
