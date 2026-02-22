import { notFound } from "next/navigation"
import { getModule, tutorialModules } from "@/lib/navigation"
import { TutorialModuleClient } from "@/components/tutorial/TutorialModuleClient"

interface ModulePageProps {
  params: Promise<{
    module: string
  }>
}

// Generate static params for static export
export function generateStaticParams() {
  return tutorialModules.map((module) => ({
    module: module.id,
  }))
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module: moduleId } = await params
  const tutorialModule = getModule(moduleId)

  if (!tutorialModule) {
    notFound()
  }

  return <TutorialModuleClient module={tutorialModule} />
}
