import SearchPage from "@/features/search/SearchPage";
import Navbar from "./Navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { observer } from "mobx-react-lite"

"use client"
 
function App() {  
  
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="App">
        <Navbar></Navbar>
        <SearchPage></SearchPage>
      </div>
    </ThemeProvider>
  )
}

// Wrap app component in observer
export default observer(App);
