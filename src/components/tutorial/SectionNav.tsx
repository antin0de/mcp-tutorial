import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SectionNavProps {
  previous?: {
    title: string
    href: string
  }
  next?: {
    title: string
    href: string
  }
  className?: string
}

export function SectionNav({ previous, next, className }: SectionNavProps) {
  if (!previous && !next) {
    return null
  }

  return (
    <div
      className={cn(
        "flex justify-between items-center gap-4 mt-12 pt-8 border-t",
        className
      )}
    >
      <div className="flex-1">
        {previous && (
          <Link href={previous.href} className="group block">
            <Button variant="ghost" className="pl-0">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Previous</p>
                <p className="font-medium group-hover:text-primary">
                  {previous.title}
                </p>
              </div>
            </Button>
          </Link>
        )}
      </div>

      <div className="flex-1 text-right">
        {next && (
          <Link href={next.href} className="group block">
            <Button variant="ghost" className="pr-0 ml-auto">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Next</p>
                <p className="font-medium group-hover:text-primary">
                  {next.title}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
