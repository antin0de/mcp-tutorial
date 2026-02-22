"use client"

import Link from "next/link"
import { Clock, BookOpen, CheckCircle2, Circle, Sparkles, ArrowRight, Zap } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { tutorialModules } from "@/lib/navigation"
import { useModuleProgress, useCompletedModules } from "@/stores/progressStore"
import { Footer } from "@/components/layout/Footer"

function DifficultyBadge({ difficulty }: { difficulty: "beginner" | "intermediate" | "advanced" }) {
  const variants = {
    beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50",
    intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50",
    advanced: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border border-rose-200 dark:border-rose-700/50",
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[difficulty]}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  )
}

function ModuleCard({ module, index }: { module: typeof tutorialModules[0], index: number }) {
  const { isCompleted, isCurrent } = useModuleProgress(module.id)

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover-lift ${
        isCurrent ? "ring-2 ring-primary/50 glow-sm" : ""
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Subtle gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {index + 1}
              </span>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">{module.title}</CardTitle>
            </div>
            <CardDescription className="leading-relaxed">{module.description}</CardDescription>
          </div>
          <div className="flex-shrink-0">
            {isCompleted ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            ) : isCurrent ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Zap className="h-5 w-5 text-primary animate-pulse-slow" />
              </div>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Circle className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span className="font-medium">{module.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            <span className="font-medium">{module.sections.length} sections</span>
          </div>
          <DifficultyBadge difficulty={module.difficulty} />
        </div>
      </CardContent>

      <CardFooter className="relative">
        <Link href={`/tutorials/${module.id}`} className="w-full">
          <Button
            className={`w-full group/btn transition-all duration-300 ${
              isCompleted
                ? "bg-muted/10 hover:bg-muted/20 text-foreground border"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
            }`}
            variant={isCompleted ? "outline" : "default"}
          >
            <span>
              {isCompleted ? "Review Module" : isCurrent ? "Continue Learning" : "Start Module"}
            </span>
            {!isCompleted && (
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function Home() {
  const completedModules = useCompletedModules()
  const progressPercentage = (completedModules.length / tutorialModules.length) * 100
  const hasStarted = completedModules.length > 0

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section - Enhanced with gradients and modern design */}
        <section className="relative overflow-hidden border-b">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--gradient-from),0.15),transparent)]" />
          </div>

          {/* Decorative elements */}
          <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 overflow-hidden opacity-20 dark:opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent animate-gradient" />
          </div>

          <div className="relative mx-auto flex min-h-[50vh] w-full max-w-7xl items-center justify-center px-4 py-24 md:py-32">
            <div className="w-full max-w-4xl text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">Free interactive tutorial</span>
              </div>

              {/* Heading with gradient text */}
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <span className="text-gradient">Master MCP</span>
                <br />
                <span className="text-foreground">Build Your Own AI Tools</span>
              </h1>

              {/* Description */}
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl lg:text-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                Learn to build MCP servers from scratch. From local development to cloud deployment.
              </p>

              {/* Progress section */}
              {hasStarted && (
                <div className="mx-auto max-w-md space-y-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <span className="text-muted-foreground">Your Progress</span>
                    <span className="font-semibold">
                      {completedModules.length} of {tutorialModules.length} modules
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={progressPercentage} className="h-3" />
                    <div
                      className="absolute inset-0 h-3 rounded-full bg-gradient-to-r from-primary to-primary/50 animate-pulse-slow"
                      style={{ width: `${progressPercentage}%`, clipPath: "inset(0 100% 0 0)" }}
                    />
                  </div>
                </div>
              )}

              {/* CTA Buttons for new users */}
              {!hasStarted && (
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <Link href="/tutorials/prerequisites">
                    <Button size="lg" className="group px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Modules Grid - Enhanced */}
        <section className="relative py-20 md:py-28">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

          <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6">
            <div className="mx-auto w-full max-w-6xl">
              {/* Section header */}
              <div className="mb-16 text-center space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-4 py-1.5 text-sm font-medium">
                  <BookOpen className="h-4 w-4" />
                  <span>Curriculum</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Tutorial Modules</h2>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  Follow our comprehensive, hands-on curriculum to master MCP development from first principles
                </p>
              </div>

              {/* Module cards grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tutorialModules.map((module, index) => (
                  <div key={module.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 75}ms` }}>
                    <ModuleCard module={module} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Continue Your Journey - Enhanced */}
        {hasStarted && (
          <section className="border-t bg-gradient-to-b from-muted/30 to-background py-16">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
              <div className="mx-auto w-full max-w-2xl text-center space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <Zap className="h-4 w-4" />
                  <span>In Progress</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Continue Your Journey</h2>
                <p className="text-muted-foreground">
                  Pick up where you left off and continue building your MCP skills
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
