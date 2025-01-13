'use client'

import { cn } from '@/lib/utils'
import { GitGraph, HomeIcon, MailIcon, PenIcon, Pyramid, ScrollText } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
// import { signOut } from '../utils/auth'

const dashboardlinks = [
    {
        id: 0,
        name: 'Dashboard',
        href: '/dashboard',
        icon: HomeIcon
    },
    {
        id: 1,
        name: 'Invoices',
        href: '/dashboard/invoices',
        icon: ScrollText
    },
    {
        id: 2,
        name: 'Clients',
        href: '/dashboard/mailbox',
        icon: Pyramid
    },
    {
        id: 3,
        name: 'Mailbox',
        href: '/dashboard/mailbox',
        icon: MailIcon
    },
    {
        id: 4,
        name: 'Tasks',
        href: '/dashboard/tasks',
        icon: PenIcon
    },
    {
        id: 5,
        name: 'Website Analytics',
        href: '/dashboard/analytics',
        icon: GitGraph
    },
]

const DashboardLinks = () => {
    const pathname = usePathname()
  return (
    <>
    {
        dashboardlinks.map((link) => (
            <Link href={link.href} className={cn(
                pathname ===  link.href 
                ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground hover:text-foreground',
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary' 
            )} key={link.id}>
                <link.icon className='size-4' />
                {link.name}
            </Link>
        ))
    }
    </>
  )
}

export default DashboardLinks