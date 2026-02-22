import Link from 'next/link'
import { BookOpen, Github, Heart, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn("border-t border-border/40 bg-background/50 backdrop-blur-sm", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">MCP Tutorial</span>
                <span className="text-[10px] text-muted-foreground">Learn by building</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Learn to build Model Context Protocol servers from scratch with hands-on tutorials.
            </p>
          </div>

          {/* Learning */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Learning
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/tutorials/prerequisites" className="hover:text-primary transition-colors inline-flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/tutorials/mcp-concepts" className="hover:text-primary transition-colors inline-flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                  MCP Concepts
                </Link>
              </li>
              <li>
                <Link href="/tutorials/first-server" className="hover:text-primary transition-colors inline-flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                  Build Your First Server
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Github className="h-4 w-4 text-primary" />
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://modelcontextprotocol.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                  Official Docs
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/modelcontextprotocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors inline-flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Community</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/modelcontextprotocol/servers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors group"
                >
                  <Github className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  Example Servers
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/modelcontextprotocol/typescript-sdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors group"
                >
                  <Github className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  TypeScript SDK
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground md:flex-row md:justify-between">
            <p className="flex items-center gap-1.5">
              Built with
              <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 dark:fill-transparent" />
              using Next.js, TypeScript, and MDX
            </p>
            <p>© {currentYear} MCP Tutorial</p>
            <a
              href="https://github.com/antin0de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              @antin0de
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
