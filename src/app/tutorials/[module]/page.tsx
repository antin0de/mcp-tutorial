import { notFound } from "next/navigation"
import { getModule } from "@/lib/navigation"
import { TutorialModuleClient } from "@/components/tutorial/TutorialModuleClient"

interface ModulePageProps {
  params: Promise<{
    module: string
  }>
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module: moduleId } = await params
  const tutorialModule = getModule(moduleId)

  if (!tutorialModule) {
    notFound()
  }

  return <TutorialModuleClient module={tutorialModule} />
}
