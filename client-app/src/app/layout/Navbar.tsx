/**
 * Name: Navbar.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the application navbar for mobile and desktops.
*/

import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/mode-toggle'
import { NavLink } from "react-router-dom"
import { useStore } from "../stores/store"
import { observer } from "mobx-react-lite"
import { BellIcon, LayoutGrid, Music, UserCircle, Info, LogIn, UserPlus } from "lucide-react"
import RackNavLink from "./RackNavLink"

// Define component icons
export const Icons = {
    rack: LayoutGrid,
    searchMusic: Music,
    searchUsers: UserCircle,
    about: Info,
    notifications: BellIcon,
    login: LogIn,
    register: UserPlus
};

function Navbar() {
  // Initialize user store with user object and loggedIn method
  const { userStore } = useStore();
  const { user, isLoggedIn } = userStore;

  return (
    <nav className="sticky top-0 z-50 -mt-24 border-b-2 shadow-md bg-background border-neutral-100 dark:border-neutral-950 text-neutral-800 dark:text-neutral-50">

      {/* Check userstore logged in method to determine if user is logged in */}
      {isLoggedIn
        ? 
         /*
          WHEN USER IS  SIGNED IN
        */
        <div className="header container py-4 flex flex-col items-center gap-2 md:flex-row">
          <div className=" w-full flex flex-row gap-2 justify-center items-center md:justify-start">
            <NavLink to={"/"}>
              <h1 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">Record Rack</h1>
            </NavLink>

            {/* Dark mode btn */}
            <ModeToggle/>
          </div>

          <div className="w-full flex flex-row justify-between md:justify-end">

            {/* Rack btn using custom rack nav link component */}
            <RackNavLink to={`${user?.userName}`}>
              {({ isActive }) => (
                <Button variant="ghost" size="sm" className={
                  `${isActive ? "text-neutral-950 border-neutral-950 dark:text-neutral-500 dark:border-neutral-500 font-extrabold rounded-b-none border-b-2" : ""} 
                    flex flex-col w-12 justify-center md:w-24 md:h-16 hover:bg-transparent md:hover:bg-accent transition-all duration-75`
                }>
                    <Icons.rack className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem] " />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">rack</p>
                </Button>
              )}
            </RackNavLink>

            {/* Search music btn */}
            <NavLink to={'search/music'}>
              {({ isActive }) => (
                <Button variant="ghost" size="sm" className={
                  `${isActive ? "text-neutral-950 border-neutral-950 dark:text-neutral-500 dark:border-neutral-500 font-extrabold rounded-b-none border-b-2" : ""} 
                    flex flex-col w-12 justify-center md:w-24 md:h-16 hover:bg-transparent md:hover:bg-accent transition-all duration-75`
                }>
                    <Icons.searchMusic className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem]" />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">search</p>
                </Button>
              )}
            </NavLink>

            {/* Search users btn */}
            <NavLink to={'search/users'}>
              {({ isActive }) => (
                <Button variant="ghost" size="sm" className={
                  `${isActive ? "text-neutral-950 border-neutral-950 dark:text-neutral-500 dark:border-neutral-500 font-extrabold rounded-b-none border-b-2" : ""} 
                    flex flex-col w-14 justify-center md:w-24 md:h-16 hover:bg-transparent md:hover:bg-accent transition-all duration-75`
                }>                    
                    <Icons.searchUsers className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem]" />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">connect</p>
                </Button>
              )}
            </NavLink>

            {/* Notifications btn */}
            <NavLink to={`${user?.userName}/notifications`}>
              {({ isActive }) => (
                <Button variant="ghost" size="sm" className={
                  `${isActive ? "text-neutral-950 border-neutral-950 dark:text-neutral-500 dark:border-neutral-500 font-extrabold rounded-b-none border-b-2" : ""} 
                    flex flex-col w-16 justify-center md:w-32 md:h-16 hover:bg-transparent md:hover:bg-accent transition-all duration-75`
                }>
                    <Icons.notifications className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem]" />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">notifications</p>
                </Button>
              )}
            </NavLink>

            {/* About btn */}
            <NavLink to={"/about"}>
              {({ isActive }) => (
                <Button variant="ghost" size="sm" className={
                  `${isActive ? "text-neutral-950 border-neutral-950 dark:text-neutral-500 dark:border-neutral-500 font-extrabold rounded-b-none border-b-2" : ""} 
                    flex flex-col w-12 justify-center md:w-24 md:h-16 hover:bg-transparent md:hover:bg-accent transition-all duration-75`
                }>
                    <Icons.about className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem]" />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">about</p>
                </Button>
              )}
            </NavLink>

          </div>
        </div>

        /*
          WHEN USER IS NOT SIGNED IN
        */
        : 
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

            {/* Login btn */}
            <NavLink to={"accounts/login"}>
              {({ isActive }) => (
                <Button variant="ghost" size="sm" className={
                  `${isActive ? "text-neutral-950 border-neutral-950 dark:text-neutral-500 dark:border-neutral-500 font-extrabold rounded-b-none border-b-2" : ""} 
                    flex flex-col w-12 justify-center md:w-24 md:h-16 hover:bg-transparent md:hover:bg-accent`
                }>
                    <Icons.login className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem]" />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">login</p>
                </Button>
              )}
            </NavLink>
            
            {/* Register btn */}
            <NavLink to={"accounts/register"}>
              {({ isActive }) => (
                <Button variant="ghost" size="sm" className={
                  `${isActive ? "text-neutral-950 border-neutral-950 dark:text-neutral-500 dark:border-neutral-500 font-extrabold rounded-b-none border-b-2" : ""} 
                    flex flex-col w-12 justify-center md:w-24 md:h-16 hover:bg-transparent md:hover:bg-accent`
                }>
                    <Icons.register className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem] " />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">register</p>
                </Button>
              )}
            </NavLink>

             {/*About btn */}
             <NavLink to={"/about"}>
              {({ isActive }) => (
                <Button variant="ghost" size="sm" className={
                  `${isActive ? "text-neutral-950 border-neutral-950 dark:text-neutral-500 dark:border-neutral-500 font-extrabold rounded-b-none border-b-2" : ""} 
                    flex flex-col w-14 justify-center md:w-24 md:h-16 hover:bg-transparent md:hover:bg-accent`
                }>
                    <Icons.about className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem]" />
                    <p className="text-[10px] xxxs:text-[11.5px] sm:text-sm lg:text-base">about</p>
                </Button>
              )}
            </NavLink>

          </div>
        </div>
      }
    </nav>
  )
}

// Wrap component in observer to respond to MobX changes
export default observer(Navbar)
