import React from 'react'
import { Button } from "@/components/ui/button"


export default function Navbar() {
    return (
    <nav className="shadow-sm">    
        <div className="container py-6 flex flex-row items-center justify-between">
            <div>
              <h1 className="font-semibold text-2xl">Record Rack</h1>
          </div>
          <div>
            <Button variant="ghost" size="lg"><p className="text-lg">Home</p></Button>
            <Button variant="ghost" size="lg"><p className="text-lg">Your Rack</p></Button>
            <Button variant="ghost" size="lg"><p className="text-lg">About</p></Button>
          </div>
        </div>
    </nav>
  )
}
