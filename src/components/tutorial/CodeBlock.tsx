"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  /** Lines to highlight (reserved for future use) */
  highlightLines?: number[]
  /** Show line numbers (reserved for future use) */
  showLineNumbers?: boolean
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  // These options are reserved for future implementation
  // highlightLines = [],
  // showLineNumbers = true,
}: CodeBlockProps) {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [html, setHtml] = useState("")
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const loadShiki = async () => {
      const { codeToHtml } = await import("shiki")
      const currentTheme = theme === "system" ? systemTheme : theme

      const output = await codeToHtml(code, {
        lang: language,
        theme: currentTheme === "dark" ? "dark-plus" : "light-plus",
      })

      setHtml(output)
    }

    loadShiki()
  }, [code, language, theme, systemTheme, mounted])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!mounted) {
    return (
      <div className="relative group">
        <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
          <code className="text-sm">{code}</code>
        </pre>
      </div>
    )
  }

  return (
    <div className="relative group my-4">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b rounded-t-lg">
          <span className="text-sm font-mono text-muted-foreground">
            {filename}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      )}
      <div
        className={cn(
          "rounded-lg bg-muted/50 overflow-x-auto",
          !filename && "relative"
        )}
      >
        {!filename && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        )}
        {html ? (
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className="p-4 [&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0"
          />
        ) : (
          <pre className="p-4">
            <code className="text-sm font-mono">{code}</code>
          </pre>
        )}
      </div>
      {language && (
        <div className="text-xs text-muted-foreground mt-1 ml-1">
          {language}
        </div>
      )}
    </div>
  )
}
