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
  const { userStore, userStore: { user, isLoggedIn } } = useStore();

  function handleLogout() {
    userStore.logout();
  }

  return (
    <nav className="sticky top-0 z-50 -mt-24 border-b-2 shadow-md bg-background border-neutral-100 dark:border-neutral-950 text-neutral-800 dark:text-neutral-50">

      {/* Check userstore logged in method to determine if user is logged in */}
      {isLoggedIn
        ? <div className="container py-6 flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2 lg:gap-6 items-center">
            <NavLink to={"/"}>
              <h1 className="font-semibold text-base lg:text-xl xl:text-2xl">Record Rack</h1>
            </NavLink>
            <ModeToggle></ModeToggle>
          </div>

          <div className='hidden md:flex flex-row'>
            <NavLink to={`${user?.userName}/racklist`}>
              <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">your rack</p></Button>
            </NavLink>
            <NavLink to={"/search"}>
              <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">search</p></Button>
            </NavLink>
            <NavLink to={"/"}>
              <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">connect</p></Button>
            </NavLink>
            <NavLink to={"/about"}>
              <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">about</p></Button>
            </NavLink>
            <div className="ml-8">
              <NavLink to={`${user?.userName}/profile`}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </NavLink>
            </div>
            <Dialog>
              <DialogTrigger asChild className="cursor-pointer">
                <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">logout (temp)</p></Button>
              </DialogTrigger>
              <DialogContent className="max-w-[75vw] lg:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    <p className="mb-12">Are you sure you want to log out?</p>
                  </DialogTitle>
                  <DialogFooter>
                    <Button size="lg" onClick={handleLogout}><p className="text-sm lg:text-base xl:text-lg">Log Out</p></Button>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>

            </Dialog>
          </div>

          <div className="block md:hidden">
            <NavigationMenu className="relative -left-32">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="relative left-32"></NavigationMenuTrigger>
                  <NavigationMenuContent >
                    <ul className="grid gap-3 p-4 w-[170px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavLink to={`${user?.userName}/racklist`}>
                          <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">your rack</p></Button>
                        </NavLink>
                        <NavLink to={"/search"}>
                          <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">search</p></Button>
                        </NavLink>
                        <NavLink to={"/"}>
                          <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">connect</p></Button>
                        </NavLink>
                        <NavLink to={"/about"}>
                          <Button variant="ghost" size="lg"><p className="text-sm lg:text-base xl:text-lg">about</p></Button>
                        </NavLink>
                        <div className="ml-8 my-3">
                          <NavLink to={`${user?.userName}/profile`}>
                            <Avatar>
                              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </NavLink>
                        </div>
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
