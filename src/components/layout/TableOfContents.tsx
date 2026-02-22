"use client"

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from the document
    const elements = Array.from(
      document.querySelectorAll('h1, h2, h3, h4')
    )

    const headingData: Heading[] = elements
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName.substring(1))
      }))

    setHeadings(headingData)
  }, [])

  useEffect(() => {
    // Update active heading based on scroll position
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0% -80% 0%',
        threshold: 0
      }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <aside className={cn("hidden xl:block", className)}>
      <div className="sticky top-20">
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-2 pb-4">
            <h4 className="font-medium text-sm mb-4">On this page</h4>
            <nav className="space-y-1">
              {headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => handleClick(heading.id)}
                  className={cn(
                    "block w-full text-left text-sm transition-colors hover:text-primary",
                    heading.level === 1 && "font-semibold",
                    heading.level === 2 && "pl-2",
                    heading.level === 3 && "pl-4",
                    heading.level === 4 && "pl-6",
                    activeId === heading.id
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {heading.text}
                </button>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}
