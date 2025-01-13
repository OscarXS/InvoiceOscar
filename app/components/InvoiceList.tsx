import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import InvoiceActions from './InvoiceActions'
import prisma from '../utils/db'
import { requireUser } from '../utils/hooks'
import { formatCurrency } from '../utils/formatCurrency'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from './EmptyState'

const getData = async (userId: string) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            clientName: true,
            total: true,
            createdAt: true,
            status: true,
            invoiceNumber: true,
            currency: true,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    return data
}

const InvoiceList = async () => {
    const session = await requireUser()
    const data = await getData(session.user?.id as string)

  return (
    <>
        {data.length === 0 ? (
            <EmptyState
                title='No invoices found!'
                description='Create an invoice to get started'
                buttonText='Create invoice'
                href='/dashboard/invoices/create'
            />
        ) : (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>#{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.clientName}</TableCell>
                        <TableCell>{formatCurrency({
                            amount: invoice.total,
                            currency: invoice.currency as any
                            })}</TableCell>
                            <TableCell>
                                { invoice.status =="PENDING" && <Badge variant='pending'>{invoice.status}</Badge> }
                                { invoice.status =="PAID" && <Badge variant='success'>{invoice.status}</Badge> }
                                { invoice.status =="OVERDUE" && <Badge variant='destructive'>{invoice.status}</Badge> }
                                { invoice.status =="CANCELLED" && <Badge>{invoice.status}</Badge> }
                                </TableCell>
                            <TableCell>{new Intl.DateTimeFormat('en-ZA', {
                                dateStyle: 'medium'
                            }).format(invoice.createdAt)}
                        </TableCell>
                        <TableCell className='text-right'>
                            <InvoiceActions status={invoice.status} id={invoice.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        )}
    </>
  )
}

export default InvoiceList