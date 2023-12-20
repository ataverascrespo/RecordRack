/**
 * Name: mode-toggle.tsx
 * Written by: Shadcn/ui team
*/

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Button variant="ghost" className="z-50">
          <Sun onClick={(() => setTheme("dark"))} className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-100 dark:-rotate-90 dark:scale-0" />
          <Moon onClick={(() => setTheme("light"))} className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
