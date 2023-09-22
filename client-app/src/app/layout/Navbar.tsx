import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/mode-toggle'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { NavLink } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { useStore } from "../stores/store"
import { observer } from "mobx-react-lite"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"


function Navbar() {
  //Initialize user store with user object and loggedIn method
  const { userStore, profileStore } = useStore();
  const { user, isLoggedIn } = userStore;
  const { viewedUser } = profileStore;

  function handleLogout() {
    userStore.logout();
  }

  return (
    <nav className="sticky top-0 z-50 -mt-24 border-b-2 shadow-md bg-background border-neutral-100 dark:border-neutral-950 text-neutral-800 dark:text-neutral-50">

      {/* Check userstore logged in method to determine if user is logged in */}
      {isLoggedIn
        ? <div className="header container py-6 flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2 lg:gap-6 items-center">
            <NavLink to={"/"}>
              <h1 className="font-semibold text-base lg:text-xl xl:text-2xl">Record Rack</h1>
            </NavLink>
            <ModeToggle></ModeToggle>
          </div>

          <div className='hidden md:flex flex-row items-center'>
            
            <NavLink to={"/search"}>
              <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">search</p></Button>
            </NavLink>
            <NavLink to={"/"}>
              <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">connect</p></Button>
            </NavLink>
            <div>
              <NavLink to={`${user?.userName}/profile`}>
                <Button variant="ghost" size="lg">
                  <div className="flex flex-row gap-4 items-center">
                  <p className="text-sm lg:text-base xl:text-lg">your rack</p>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={profileStore.getProfilePhoto()} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  </div>
                </Button>
              </NavLink>
            </div>
            <NavLink to={"/about"}>
              <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">about</p></Button>
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
                        <NavLink to={"/search"}>
                          <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">search</p></Button>
                        </NavLink>
                        <NavLink to={"/"}>
                          <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">connect</p></Button>
                        </NavLink>
                        <div className="ml-8 my-3">
                          <NavLink to={`${user?.userName}/profile`}>
                            <Avatar>
                              <AvatarImage src={profileStore.getProfilePhoto()} alt="@shadcn" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </NavLink>
                        </div>
                        <NavLink to={"/about"}>
                          <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">about</p></Button>
                        </NavLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        /*
          WHEN USER IS NOT SIGNED IN
        */
        : <div className="container py-6 flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2 lg:gap-6 items-center">
            <NavLink to={"/"}>
              <h1 className="font-semibold text-base lg:text-xl xl:text-2xl">Record Rack</h1>
            </NavLink>
            <ModeToggle></ModeToggle>
          </div>

          <div className='hidden md:flex flex-row'>
            <NavLink to={"/about"}>
              <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">about</p></Button>
            </NavLink>
            <NavLink to={"/login"}>
              <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">log in</p></Button>
            </NavLink>
            <NavLink to={"/register"}>
              <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">register</p></Button>
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
                        <NavLink to={"/about"}>
                          <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">about</p></Button>
                        </NavLink>
                        <NavLink to={"/login"}>
                          <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">log in</p></Button>
                        </NavLink>
                        <NavLink to={"/register"}>
                          <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">register</p></Button>
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

export default observer(Navbar)
