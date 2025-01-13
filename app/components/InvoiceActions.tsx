"use client"

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CheckCircle, Clock, DownloadCloud, Mail, MoreHorizontal, Pencil, Trash, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

interface iAppProps {
    id: string,
    status: string
}

const InvoiceActions = ({ id, status }: iAppProps) => {
    const handleSendReminder = () => {
        toast.promise(
            fetch(`/api/email/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }
            }), {
                loading: 'Sending reminder email...',
                success: 'Reminder email sent successfully',
                error: 'Failed to send reminder email'
            })
    }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size='icon' variant='secondary'>
                <MoreHorizontal className='size-4' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
            <DropdownMenuItem asChild>
                <Link href={`/dashboard/invoices/${id}`}>
                    <Pencil className='size-4 mr-2' />Edit Invoice
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href={`/api/invoice/${id}`} target='_blank'>
                    <DownloadCloud className='size-4 mr-2' />Download Invoice
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSendReminder}>
                <Mail className='size-4 mr-2' />Send Reminder
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href={`/dashboard/invoices/${id}/delete`}>
                    <Trash className='size-4 mr-2' />Delete Invoice
                </Link>
            </DropdownMenuItem>
            {status !== "PAID" ? (
            <DropdownMenuItem asChild>
                <Link href={`/dashboard/invoices/${id}/paid`}>
                    <CheckCircle className='size-4 mr-2' />Mark as Paid
                </Link>
            </DropdownMenuItem>
            ) : (
                ''
            )}
            {status !== "CANCELLED" ? (
                <DropdownMenuItem asChild>
                <Link href={`/dashboard/invoices/${id}/cancelled`}>
                    <X className='size-4 mr-2' />Cancel
                </Link>
            </DropdownMenuItem>
            ) : (
                ''
            )}
            {status !== "OVERDUE" ? (
            <DropdownMenuItem asChild>
                <Link href={`/dashboard/invoices/${id}/overdue`}>
                    <Clock className='size-4 mr-2' />Overdue
                </Link>
            </DropdownMenuItem>
            ) : (
                ''
            )}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default InvoiceActions