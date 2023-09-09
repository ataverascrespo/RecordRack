import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/mode-toggle'

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 -mt-24 border-b-2 shadow-md bg-background border-neutral-100 dark:border-neutral-950 text-neutral-800 dark:text-neutral-50">
      <div className="container py-6 flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 md:gap-6 items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Record Rack</h1>
          <ModeToggle></ModeToggle>
        </div>
        <div className='hidden md:block'>
          <NavLink to={"/"}>
            <Button variant="ghost" size="lg"><p className="text-lg">home</p></Button>
          </NavLink>
          <NavLink to={"/racklist"}>
            <Button variant="ghost" size="lg"><p className="text-lg">your rack</p></Button>
          </NavLink>
          <NavLink to={"/search"}>
            <Button variant="ghost" size="lg"><p className="text-lg">search</p></Button>
          </NavLink>
          <NavLink to={"/about"}>
            <Button variant="ghost" size="lg"><p className="text-lg">about</p></Button>
          </NavLink>
        </div>

        <div className="block md:hidden">
          <NavigationMenu className="relative -left-32">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="relative left-32"></NavigationMenuTrigger>
                <NavigationMenuContent >
                  <ul className="grid gap-3 p-4 w-[170px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavLink to={"/"}>
                        <Button variant="ghost" size="lg"><p className="text-base">home</p></Button>
                      </NavLink>
                      <NavLink to={"/racklist"}>
                        <Button variant="ghost" size="lg"><p className="text-base">your rack</p></Button>
                      </NavLink>
                      <NavLink to={"/search"}>
                        <Button variant="ghost" size="lg"><p className="text-base">search</p></Button>
                      </NavLink>
                      <NavLink to={"/about"}>
                        <Button variant="ghost" size="lg"><p className="text-base">about</p></Button>
                      </NavLink>
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
