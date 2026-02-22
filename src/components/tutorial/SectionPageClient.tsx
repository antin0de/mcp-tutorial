"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"
import { getNextSection, getPrevSection, type TutorialModule, type TutorialSection } from "@/lib/navigation"
import { useProgressStore } from "@/stores/progressStore"
import { SectionNav } from "./SectionNav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface SectionPageClientProps {
  module: TutorialModule
  section: TutorialSection
  content: React.ReactNode
}

export function SectionPageClient({ module, section, content }: SectionPageClientProps) {
  const [mounted, setMounted] = useState(false)

  const chapters = useProgressStore((state) => state.chapters)
  const markChapterComplete = useProgressStore((state) => state.markChapterComplete)
  const setCurrentChapter = useProgressStore((state) => state.setCurrentChapter)

  const sectionId = `${module.id}/${section.slug}`
  const isCompleted = chapters[sectionId]?.completed
  const nextSection = getNextSection(module.id, section.id)
  const prevSection = getPrevSection(module.id, section.id)

  useEffect(() => {
    setMounted(true)
    setCurrentChapter(sectionId)
  }, [sectionId, setCurrentChapter])

  if (!mounted) {
    return null
  }

  const handleMarkComplete = () => {
    markChapterComplete(sectionId)
  }

  // Show placeholder if content is null (file not found or error)
  const displayContent = content || (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Coming Soon</h2>
      <p className="text-muted-foreground">
        This section is coming soon. We&apos;re working hard to create comprehensive content for this topic.
      </p>
      <div className="space-y-2">
        <h3 className="font-semibold">What You&apos;ll Learn</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Key concepts and fundamentals</li>
          <li>Practical examples and demonstrations</li>
          <li>Best practices and common pitfalls</li>
          <li>Hands-on exercises</li>
        </ul>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Module {module.order}</span>
          <span>•</span>
          <span>Section {section.order}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>10 min read</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">{section.title}</h1>

        <p className="text-lg text-muted-foreground">{section.description}</p>

        <div className="flex items-center gap-4">
          {isCompleted && (
            <Badge variant="default" className="bg-green-600">
              Completed
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <article className="prose">
        {displayContent}
      </article>

      {/* Mark Complete CTA */}
      {!isCompleted && content && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="font-semibold">Mark this section as complete</h3>
              <p className="text-sm text-muted-foreground">
                Track your progress by marking this section as complete when you&apos&apos;re ready.
              </p>
              <Button onClick={handleMarkComplete} size="lg">
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <SectionNav
        previous={
          prevSection
            ? {
                title: prevSection.section.title,
                href: `/tutorials/${prevSection.module.id}/${prevSection.section.slug}`,
              }
            : undefined
        }
        next={
          nextSection
            ? {
                title: nextSection.section.title,
                href: `/tutorials/${nextSection.module.id}/${nextSection.section.slug}`,
              }
            : undefined
        }
      />
    </div>
  )
}
