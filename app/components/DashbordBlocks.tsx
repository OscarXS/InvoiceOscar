import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, ScrollText } from "lucide-react";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";

async function getData(userId: string) {
    const [data, openInvoices, paidInvoices] = await Promise.all([
        prisma.invoice.findMany({
            where: {
                userId: userId,
            },
            select: {
                total: true
            }
        }),
        prisma.invoice.findMany({
            where: {
                userId: userId,
                status: "PENDING"
            },
            select: {
                id: true
            }
        }),
        prisma.invoice.findMany({
            where: {
                userId: userId,
                status: "PAID"
            },
            select: {
                id: true
            }
        })
    ]);

    return {
        data,
        openInvoices,
        paidInvoices
    }
}

export async function DashbordBlocks() {
    const session = await requireUser();
    const {data, openInvoices, paidInvoices} = await getData(session.user?.id as string);


    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            <Card>
                <CardHeader className="flex items-center justify-between flex-row space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium tracking-normal">Total Revenue</CardTitle>
                    <DollarSign className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">
                        {formatCurrency({
                            amount: data.reduce((acc, invoice) => acc + invoice.total, 0 ),
                            currency: "ZAR",
                        })}
                    </h2>
                    <p className="text-xs text-muted-foreground">Based on total volume</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex items-center justify-between flex-row space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium tracking-normal">Invoices Issued</CardTitle>
                    <ScrollText className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">
                        +{data.length}
                    </h2>
                    <p className="text-xs text-muted-foreground">Total Invoices Issued</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex items-center justify-between flex-row space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium tracking-normal">Paid Invoices</CardTitle>
                    <CreditCard className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">
                        +{paidInvoices.length}
                    </h2>
                    <p className="text-xs text-muted-foreground">Total Invoices Paid</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex items-center justify-between flex-row space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium tracking-normal">Pending Invoices</CardTitle>
                    <Activity className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">
                        +{openInvoices.length}
                    </h2>
                    <p className="text-xs text-muted-foreground">Total invoices pending payment</p>
                </CardContent>
            </Card>
        </div>
    )
}