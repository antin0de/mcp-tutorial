import { notFound } from "next/navigation"
import { readFile } from "fs/promises"
import { join } from "path"
import { getModule, getSection, tutorialModules } from "@/lib/navigation"
import { compileMDXWithConfig } from "@/lib/mdx/config"
import { SectionPageClient } from "@/components/tutorial/SectionPageClient"
import { Callout } from "@/components/tutorial/Callout"
import { CodeBlock } from "@/components/tutorial/CodeBlock"
import { Collapsible } from "@/components/tutorial/Collapsible"
import { TerminalBlock } from "@/components/tutorial/TerminalBlock"

interface SectionPageProps {
  params: Promise<{
    module: string
    section: string
  }>
}

const mdxComponents = {
  Callout,
  CodeBlock,
  Collapsible,
  TerminalBlock,
}

// Generate static params for static export
export function generateStaticParams() {
  const params: Array<{ module: string; section: string }> = []

  for (const tutorialModule of tutorialModules) {
    for (const section of tutorialModule.sections) {
      params.push({
        module: tutorialModule.id,
        section: section.slug,
      })
    }
  }

  return params
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { module: moduleId, section: sectionId } = await params
  const tutorialModule = getModule(moduleId)
  const tutorialSection = getSection(moduleId, sectionId)

  if (!tutorialModule || !tutorialSection) {
    notFound()
  }

  // Read and compile MDX content on the server
  let content: React.ReactNode = null
  try {
    const filePath = join(
      process.cwd(),
      "src",
      "content",
      "tutorials",
      tutorialModule.id,
      `${tutorialSection.slug}.mdx`
    )
    const mdxSource = await readFile(filePath, "utf-8")
    const { content: MDXContent } = await compileMDXWithConfig(
      mdxSource,
      mdxComponents
    )
    content = MDXContent
  } catch (error) {
    console.error("Failed to read or compile MDX file:", error)
    // Content stays null, client will show placeholder
  }

  return (
    <SectionPageClient
      module={tutorialModule}
      section={tutorialSection}
      content={content}
    />
  )
}
