# MCP Interactive Tutorial Website - Specification

## Project Overview

Create a comprehensive React interactive tutorial website for learning MCP (Model Context Protocol). The tutorial targets technical people and guides them from concepts to building and deploying their own MCP servers.

---

## 1. Functional Requirements

### Core Features
1. **Tutorial Content Management**
   - 6 modules: Prerequisites, MCP Concepts, First Server, Tools/Resources, Prompts, Deployment
   - MDX-based content authoring with embedded React components
   - Code examples with syntax highlighting (Shiki)
   - Copy-to-clipboard functionality for all code blocks

2. **Interactive Elements**
   - Inline quizzes for immediate reinforcement
   - Section-end quizzes for knowledge verification
   - Collapsible code sections and explanations
   - Callout boxes (info, warning, tip, error, success)
   - Terminal output blocks

3. **Progress Tracking**
   - Section-level completion tracking
   - Module-level progress visualization
   - Quiz score tracking with attempts
   - LocalStorage persistence
   - Export/import progress as JSON

4. **Navigation**
   - Collapsible sidebar with module/section tree
   - Breadcrumb navigation
   - Previous/Next section buttons
   - Deep linking to any section
   - Keyboard shortcuts support

5. **Theming**
   - Dark mode (default)
   - Light mode toggle
   - System preference detection

### Content Modules

| Module | Description | Est. Time |
|--------|-------------|-----------|
| Prerequisites | Node.js, TypeScript, Docker setup | 30 min |
| MCP Concepts | Architecture, protocol, core concepts | 45 min |
| First Server | Build hello-world MCP server locally | 45 min |
| Tools & Resources | Adding capabilities to your server | 60 min |
| Prompts | Template management and advanced features | 30 min |
| Deployment | Local, Docker, Cloud (Azure/VPS) | 60 min |

---

## 2. Non-Functional Requirements

### Performance
- Page load (p95) < 2 seconds
- Time to first code sample < 30 seconds
- Static generation for all content
- Code splitting for quiz components

### Accessibility
- Keyboard navigation support
- Screen reader compatible (ARIA labels)
- High contrast in both themes
- Focus indicators on all interactive elements

### Browser Support
- Latest 2 versions of Chrome, Firefox, Safari, Edge
- Mobile responsive (reading mode)
- Desktop recommended for code exercises

### Security
- No user data collection (zero-knowledge)
- LocalStorage only (no backend required for MVP)
- CSP headers for production deployment

---

## 3. Technical Architecture

### Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | Next.js 15 + React 19 | App Router, RSC, excellent DX |
| Styling | Tailwind CSS 4 + shadcn/ui | Dark mode, accessible, customizable |
| Code Highlighting | Shiki | VS Code engine, zero runtime |
| State | Zustand | Lightweight, TypeScript-first |
| Content | MDX | Markdown + React components |
| Deployment | Vercel / Docker | Multiple options |

### File Structure

```
mcp-tutorial/
├── src/
│   ├── app/
│   │   ├── tutorials/
│   │   │   └── [module]/
│   │   │       └── [section]/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/ (Header, Footer, Sidebar, ProgressBar)
│   │   ├── tutorial/ (CodeBlock, Quiz, Collapsible, Callout)
│   │   └── ui/ (shadcn components)
│   ├── content/
│   │   └── tutorials/ (all MDX files)
│   ├── lib/
│   │   ├── progress/ (store, storage, types)
│   │   ├── mdx/ (config, components)
│   │   └── navigation/ (tutorial structure)
│   └── styles/
├── public/
├── docker/
└── package.json
```

---

## 4. Target Audience

**Primary Persona**: Backend/Full-stack developers exploring AI tooling
- Familiar with Node.js and TypeScript
- Comfortable with terminal/command line
- Want to understand MCP architecture and build custom servers
- Interested in production deployment strategies

**Secondary Persona**: Technical product managers, DevOps engineers
- Need to understand MCP capabilities
- Want to evaluate integration options

---

## 5. Success Criteria

- Student completes first working MCP server within 30 minutes
- Average completion time: 3-4 hours for full tutorial
- Quiz pass rate > 80%
- Post-turvey confidence > 80% for building own MCP
- Zero external dependencies for running the tutorial site

---

## 6. Out of Scope

- Full code playground (WebContainers) - future enhancement
- User authentication/cloud sync - future enhancement
- Video content - text/code focused
- Multi-language support - English only
- MCP Inspector integration - referenced but not embedded

---

## 7. Key Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "shiki": "^1.24.0",
    "zustand": "^5.0.0",
    "next-themes": "^0.4.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "lucide-react": "^0.468.0"
  }
}
```

---

## 8. Deployment Options

### Option 1: Vercel (Recommended)
- Zero-config deployment
- Automatic HTTPS
- Preview deployments

### Option 2: Docker + VPS
- Full control
- Single binary deployment
- nginx reverse proxy

### Option 3: Static Export
- GitHub Pages
- Netlify Drop
- CDN hosting

---

*Specification created: 2025-02-22*
