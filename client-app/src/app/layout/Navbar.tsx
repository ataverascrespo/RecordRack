/**
 * Name: Navbar.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the application navbar for mobile and desktops.
*/

import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/mode-toggle'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { NavLink } from "react-router-dom"
import { useStore } from "../stores/store"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { BellIcon, LayoutGrid, Music, UserCircle, Info } from "lucide-react"

// Define component icons
export const Icons = {
    rack: LayoutGrid,
    searchMusic: Music,
    searchUsers: UserCircle,
    about: Info,
    notifications: BellIcon,
};


function Navbar() {
  // Initialize user store with user object and loggedIn method
  const { userStore } = useStore();
  const { user, isLoggedIn } = userStore;
  
  // This state variable allows the app to close the mobile navigation menu on rendering a new page
  // This is a fix that goes down to the RadixUI level (which the components used in this app are built on)
  const [value, setValue] = useState("");

  return (
    <nav className="sticky top-0 z-50 -mt-24 border-b-2 shadow-md bg-background border-neutral-100 dark:border-neutral-950 text-neutral-800 dark:text-neutral-50">

      {/* Check userstore logged in method to determine if user is logged in */}
      {isLoggedIn
        ? 
        <div className="header container py-6 flex flex-col items-center gap-6 md:flex-row">
          <div className=" w-full flex flex-row gap-2 justify-center items-center md:justify-start">
            <NavLink to={"/"}>
              <h1 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">Record Rack</h1>
            </NavLink>

            {/* Dark mode btn */}
            <ModeToggle/>
          </div>

          {/* Menu for signed in user */}
          <div className="w-full flex flex-row justify-between md:justify-end">
            {/* Rack btn */}
            <NavLink to={`${user?.userName}`}>
                <Button variant="ghost" size="sm" className="flex flex-col w-12 justify-center md:w-24 md:h-16">
                    <Icons.rack className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem] " />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">rack</p>
                </Button>
            </NavLink>

            {/* Search music btn */}
            <NavLink to={'search/music'}>
                <Button variant="ghost" size="sm" className="flex flex-col w-12 justify-center md:w-24 md:h-16" >
                    <Icons.searchMusic className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem]" />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">music</p>
                </Button>
            </NavLink>

            {/* Search users btn */}
            <NavLink to={'search/users'}>
                <Button variant="ghost" size="sm" className="flex flex-col w-14 justify-center items-center md:w-24 md:h-16" >
                    <Icons.searchUsers className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem]" />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">connect</p>
                </Button>
            </NavLink>

            {/* About btn */}
            <NavLink to={"/about"}>
                <Button variant="ghost" size="sm" className="flex flex-col w-12 justify-center md:w-24 md:h-16" >
                    <Icons.about className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem]" />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">about</p>
                </Button>
            </NavLink>

           
            {/* Notifications btn */}
            <NavLink to={`${user?.userName}/notifications`}>
                <Button variant="ghost" size="sm" className="flex flex-col w-16 justify-center md:w-32 md:h-16" >
                    <Icons.notifications className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem]" />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">notifications</p>
                </Button>
            </NavLink>

          </div>
        </div>

        /*
          WHEN USER IS NOT SIGNED IN
        */
        : 
        <div className="container py-6 flex flex-row items-center justify-between">
          {/* Mobile menu for not signed in user*/}
          <div className="block md:hidden">
            <NavigationMenu className="relative -left-32" value={value} onValueChange={setValue}>
              <NavigationMenuList>
                <NavigationMenuItem >
                  <NavigationMenuTrigger className="relative left-32"></NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[170px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavLink to={"/about"}>
                          <Button variant="ghost" size="lg" onClick={() => setValue("")}>
                            <p className="text-sm lg:text-base xl:text-lg">about</p>
                          </Button>
                        </NavLink>
                        <NavLink to={"accounts/login"}>
                          <Button variant="ghost" size="lg" onClick={() => setValue("")} >
                            <p className="text-sm lg:text-base xl:text-lg">log in</p>
                          </Button>
                        </NavLink>
                        <NavLink to={"accounts/register"}>
                          <Button variant="ghost" size="lg" onClick={() => setValue("")}>
                            <p className="text-sm lg:text-base xl:text-lg">register</p>
                          </Button>
                        </NavLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      }
    </nav>
  )
}

// Wrap component in observer to respond to MobX changes
export default observer(Navbar)
