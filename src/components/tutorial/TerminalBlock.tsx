import { cn } from "@/lib/utils"

interface TerminalBlockProps {
  children: string
  className?: string
}

export function TerminalBlock({ children, className }: TerminalBlockProps) {
  return (
    <div
      className={cn(
        "my-4 rounded-lg bg-gray-950 dark:bg-gray-900 p-4 font-mono text-sm",
        "border border-gray-800",
        "overflow-x-auto",
        className
      )}
    >
      <pre className="text-gray-100 whitespace-pre-wrap">{children}</pre>
    </div>
  )
}
