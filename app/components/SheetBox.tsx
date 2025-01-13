// 'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import DashboardLinks from './DashboardLinks'

const SheetBox = () => {
  return (
    <>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='outline' size='icon' className='md:hidden'>
                    <Menu className='size-5' />
                </Button>
            </SheetTrigger>
            <SheetContent side='left'>
              <nav className='grid gap-2 mt-10'>
                <DashboardLinks />
              </nav>
            </SheetContent>
        </Sheet>
    </>
  )
}

export default SheetBox