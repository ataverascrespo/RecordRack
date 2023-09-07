import SearchPage from "@/features/search/SearchPage";
import Navbar from "./Navbar";
import { ThemeProvider } from "@/components/theme-provider"

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

export default App;
