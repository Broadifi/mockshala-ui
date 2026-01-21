import React, { useState } from 'react'
import { DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, DropdownMenuItem, 
    DropdownMenuTrigger } from './ui/dropdown-menu'
import { Languages } from 'lucide-react'
import { Button } from './ui/button'

function LangSwitch() {
    const [isEnglish, setIsEnglish] = useState<boolean>(true)

  return (
    <div>
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className="font-medium  rounded-full p-0">
                <Languages className='h-10'/>        
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-2 z-50" align="end">
            <DropdownMenuGroup>
                
                <DropdownMenuItem  key="Eng" asChild>              
                    <span>English</span>
                </DropdownMenuItem>

                <DropdownMenuItem  key="Hind" asChild>              
                    <span>Hindi</span>
                </DropdownMenuItem>
                
            </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default LangSwitch