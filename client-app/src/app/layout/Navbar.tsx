import React from 'react'
import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/mode-toggle'


export default function Navbar() {
    return (
    <nav className="border-b-2 border-neutral-100 dark:border-neutral-900">    
        <div className="container py-6 flex flex-row items-center justify-between">
            <div className="flex flex-row gap-6 items-center">
                    <h1 className="font-semibold text-2xl">Record Rack</h1>
                    <ModeToggle></ModeToggle>

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
