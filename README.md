# MCP Interactive Tutorial Website

A comprehensive, interactive tutorial website for learning MCP (Model Context Protocol) from concepts to deployment.

## Overview

This tutorial teaches developers how to build their own MCP servers through 6 comprehensive modules covering everything from basic concepts to production deployment.

### Features

- **6 Complete Modules**: Prerequisites, MCP Concepts, First Server, Tools & Resources, Prompts, Deployment
- **Interactive Quizzes**: Inline quizzes for immediate reinforcement, section-end quizzes for knowledge checks
- **Progress Tracking**: Automatic localStorage persistence of learning progress
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Syntax Highlighting**: VS Code-quality code highlighting with Shiki
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Docker Ready**: Complete Docker configuration for easy deployment

## Tech Stack

- **Framework**: Next.js 15 + React 19
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Code Highlighting**: Shiki
- **State Management**: Zustand
- **Content**: MDX with custom components
- **Deployment**: Docker + nginx

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit http://localhost:3000

## Docker Deployment

```bash
cd docker
make build
make up
```

Visit http://localhost

## Project Structure

```
mcp-tutorial/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── tutorials/          # Tutorial routes
│   │   │   ├── [module]/       # Module pages
│   │   │   └── [section]/      # Section pages
│   │   └── api/health/         # Health check
│   ├── components/
│   │   ├── layout/             # Header, Sidebar, Footer
│   │   ├── tutorial/           # CodeBlock, Quiz, etc.
│   │   ├── providers/          # Theme, Progress providers
│   │   └── ui/                 # shadcn/ui components
│   ├── content/
│   │   └── tutorials/          # All MDX content
│   │       ├── prerequisites/  # Module 1
│   │       ├── mcp-concepts/   # Module 2
│   │       ├── first-server/   # Module 3
│   │       ├── tools-resources/# Module 4
│   │       ├── prompts/        # Module 5
│   │       └── deployment/     # Module 6
│   └── lib/
│       ├── mdx/                # MDX configuration
│       ├── navigation/         # Tutorial structure
│       └── progress/           # Progress store
├── docker/                     # Docker deployment
└── public/                     # Static assets
```

## Modules

### 1. Prerequisites (45 min)
- Environment setup
- Node.js verification
- TypeScript configuration
- Docker installation

### 2. MCP Concepts (60 min)
- What is MCP?
- Architecture overview
- Resources, Tools, Prompts
- Transport mechanisms

### 3. First Server (90 min)
- Project initialization
- Basic server structure
- Adding tools
- Testing with MCP Inspector
- Connecting to Claude Desktop

### 4. Tools & Resources (75 min)
- Dynamic resources
- Input validation with Zod
- Calculator tool example
- File system resources
- Best practices

### 5. Prompts (45 min)
- Prompt templates
- Variable substitution
- Prompt strategies

### 6. Deployment (60 min)
- Local deployment options
- Docker containerization
- Azure Container Apps
- VPS deployment
- Production considerations

## Development

### Adding New Content

1. Create MDX files in `src/content/tutorials/{module}/`
2. Update `src/lib/navigation/tutorial-nav.ts` with new sections
3. Use custom components in MDX:
   - `<CodeBlock>` - Syntax highlighted code
   - `<Quiz>` - Inline quizzes
   - `<Callout>` - Info boxes
   - `<Collapsible>` - Expandable sections

### Adding New Components

1. Create component in appropriate directory
2. Export from `index.ts`
3. Add to MDX components in `src/lib/mdx/components.ts`

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Docker

```bash
cd docker
docker-compose up -d
```

### VPS

See `docker/README.md` for complete VPS deployment instructions.

## License

MIT

## Contributing

Contributions welcome! Please read our contributing guidelines.

---

**Built with Next.js, React, and a passion for teaching MCP**
