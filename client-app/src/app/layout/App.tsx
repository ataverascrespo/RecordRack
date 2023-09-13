import { useStore } from "../stores/store";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider"
import { observer } from "mobx-react-lite"
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import { Progress } from "@/components/ui/progress";

"use client"
 
function App() {  
  
  const { commonStore, userStore } = useStore();
  useEffect(() => {
    if (commonStore.token) {
      console.log(commonStore.token)
      userStore.refresh()
        .finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <Progress></Progress>

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="App">
        <Navbar></Navbar>
          <Outlet />
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

// Wrap app component in observer
export default observer(App);
