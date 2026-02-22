"use client"

import Link from "next/link"
import { Clock, BookOpen, ChevronRight, CheckCircle2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getNextSection, type TutorialModule } from "@/lib/navigation"
import { useProgressStore } from "@/stores/progressStore"
import { useEffect, useState } from "react"

interface TutorialModuleClientProps {
  module: TutorialModule
}

export function TutorialModuleClient({ module }: TutorialModuleClientProps) {
  const chapters = useProgressStore((state) => state.chapters)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Avoid hydration mismatch
  }

  const completedSections = module.sections.filter(
    (section) => chapters[`${module.id}/${section.slug}`]?.completed
  ).length

  const progress = (completedSections / module.sections.length) * 100
  const nextSection = getNextSection(module.id, module.sections[0].id)

  const difficultyColors = {
    beginner: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    intermediate: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    advanced: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Module {module.order}</span>
          <span>•</span>
          <span className="capitalize">{module.difficulty}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{module.estimatedTime}</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">{module.title}</h1>

        <p className="text-lg text-muted-foreground">{module.description}</p>

        <div className="flex items-center gap-4">
          <Badge className={difficultyColors[module.difficulty]} variant="outline">
            {module.difficulty}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>
              {completedSections} of {module.sections.length} sections completed
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Start/Continue Button */}
      {nextSection && (
        <div className="flex justify-start">
          <Link href={`/tutorials/${nextSection.module.id}/${nextSection.section.slug}`}>
            <Button size="lg" className="gap-2">
              {completedSections > 0 ? "Continue Learning" : "Start Module"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}

      {/* Sections */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Sections</h2>
        <div className="grid gap-4">
          {module.sections.map((section, index) => {
            const sectionId = `${module.id}/${section.slug}`
            const isCompleted = chapters[sectionId]?.completed
            const isNextSection = !isCompleted && (
              index === 0 || chapters[`${module.id}/${module.sections[index - 1].slug}`]?.completed
            )

            return (
              <Card
                key={section.id}
                className={`transition-all hover:shadow-md ${
                  isNextSection ? "border-primary" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Link
                            href={`/tutorials/${module.id}/${section.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {section.order}. {section.title}
                          </Link>
                          {isNextSection && (
                            <Badge variant="default" className="text-xs">
                              Up Next
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {section.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Link href={`/tutorials/${module.id}/${section.slug}`}>
                      <Button variant="ghost" size="sm">
                        {isCompleted ? "Review" : "Start"}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
