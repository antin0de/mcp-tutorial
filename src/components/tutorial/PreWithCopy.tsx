"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode
  "data-language"?: string
  "data-theme"?: string
  "data-line-numbers"?: string
}

/**
 * Pre wrapper component that adds copy functionality to code blocks
 * Works with rehype-pretty-code to provide syntax highlighted code
 *
 * rehype-pretty-code adds:
 * - data-language attribute with the language name
 * - data-theme attribute (optional)
 * - Inline styles on code elements for syntax highlighting
 * - data-rehype-pretty-code-title div for filename (if specified)
 */
export function PreWithCopy({ children, className, ...props }: PreProps) {
  const [copied, setCopied] = useState(false)

  // Get language from data attribute
  const language = props["data-language"]

  const copyToClipboard = async () => {
    // Extract plain text from the code element
    // We need to get the text content without HTML tags
    const codeElement =
      (children as React.ReactElement)?.type === "code"
        ? children
        : Array.isArray(children)
        ? children.find(
            (child) =>
              typeof child === "object" &&
              child !== null &&
              "type" in child &&
              child.type === "code"
          )
        : null

    if (codeElement && typeof codeElement === "object" && "props" in codeElement) {
      // Get text content from code element props
      const text = extractTextContent(codeElement.props.children)
      await navigator.clipboard.writeText(text)
    } else {
      // Fallback: try to get text from DOM
      const preElement = document.querySelector(`[data-language="${language}"] code`)
      const text = preElement?.textContent || ""
      await navigator.clipboard.writeText(text)
    }

    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Recursively extract text content from React children
  function extractTextContent(
    node: React.ReactNode
  ): string {
    if (typeof node === "string") {
      return node
    }
    if (typeof node === "number") {
      return String(node)
    }
    if (Array.isArray(node)) {
      return node.map(extractTextContent).join("")
    }
    if (node && typeof node === "object" && "props" in node) {
      const props = (node as { props: unknown }).props as Record<string, unknown>
      if ("children" in props) {
        return extractTextContent(props.children as React.ReactNode)
      }
    }
    return ""
  }

  return (
    <div className="group relative my-6">
      {/* Copy button - positioned absolutely in top-right */}
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm rounded-md"
          onClick={copyToClipboard}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className={className} {...props}>
        {children}
      </pre>
    </div>
  )
}
