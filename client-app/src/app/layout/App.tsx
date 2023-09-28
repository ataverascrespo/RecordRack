import { useStore } from "../stores/store";
import { useEffect, useRef } from "react";
import { ThemeProvider } from "@/components/theme-provider"
import { observer } from "mobx-react-lite"
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Loading from "./Loading";

"use client"

function App() {  
  //useRef hook to persist value between renders
  const isMounted = useRef(false);
  const { commonStore, userStore } = useStore();
  
  useEffect(() => {
    /*
    - Use the useRef hook to create an object with a mutable .current prop
    - Checking if the prop is 'mounted' prevents useEffect from running the code on the first render 
    */
    if (!isMounted.current) {
      if (commonStore.token) {
        //Get the current user to persist the login
        userStore.getUser()
          .finally(() => commonStore.setAppLoaded());
      } else {
        commonStore.setAppLoaded();
      }
    }
    //Set this to true after the initial render
    isMounted.current = true;
  }, [commonStore, userStore]);

  //If the app is loading, display loading component
  if (!commonStore.appLoaded) return <Loading text={"App loading..."} height={"h-screen"}></Loading>

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

