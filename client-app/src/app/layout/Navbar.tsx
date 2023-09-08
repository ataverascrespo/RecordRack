import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/mode-toggle'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 -mt-24 border-b-2 bg-background border-neutral-100 dark:border-neutral-900">
      <div className="container py-6 flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 md:gap-6 items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Record Rack</h1>
          <ModeToggle></ModeToggle>
        </div>
        <div className='hidden md:block'>
          <Button variant="ghost" size="lg"><p className="text-lg">home</p></Button>
          <Button variant="ghost" size="lg"><p className="text-lg">your rack</p></Button>
          <Button variant="ghost" size="lg"><p className="text-lg">faq</p></Button>
        </div>

        <div className="block md:hidden">
            <NavigationMenu className="relative -left-32">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="relative left-32"></NavigationMenuTrigger>
                  <NavigationMenuContent >
                    <ul className="grid gap-3 p-4 w-[170px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                      <Button variant="ghost" size="lg"><p className="text-base">home</p></Button>
                      <Button variant="ghost" size="lg"><p className="text-base">your rack</p></Button>
                      <Button variant="ghost" size="lg"><p className="text-base">faq</p></Button>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
        </div>
      </div>
    </nav>
  )
}
