/**
 * Name: mode-toggle.tsx
 * Written by: Shadcn/ui team
*/

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react";

export function ModeToggle() {
  const { setTheme } = useTheme()

  // Initialize local state for tracking theme
  const [currTheme, setCurrTheme] = useState("light");

  // Custom logic to track theme better 
  const handleButtonPressed = () => {
    // If the current theme at button press is light, set local state and theme state to dark
    if (currTheme === "light") {
      setTheme("dark")
      setCurrTheme("dark");
    }
    // If the current theme at button press is dark, set local state and theme state to light
    else if (currTheme === "dark") {
      setTheme("light")
      setCurrTheme("light");
    }
}

  return (
    <Button variant="ghost" size="sm" className="z-50" onClick={(() => handleButtonPressed())}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all duration-500 dark:rotate-90 dark:scale-100" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:rotate-90 dark:scale-0" />
    </Button>
  )
}
