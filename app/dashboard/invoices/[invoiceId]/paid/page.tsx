import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import PaidGif from "@/public/paid-gif.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MarkasPaidAction } from "@/app/actions";
import { redirect } from "next/navigation";
import prisma from "@/app/utils/db";
import SubmitButton from "@/app/components/SubmitButton";
import { requireUser } from "@/app/utils/hooks";
import { toast } from "sonner";

async function Auhorize(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId
        }
    });

    if(!data) {
        return redirect('/dashboard/invoices')
    }
}

type Params = Promise<{ invoiceId: string }>

export default async function MarkasPaid({ params }: { params: Params }) {
    const session = await requireUser();
    const { invoiceId } = await params;
    await Auhorize(invoiceId, session.user?.id as string)
    return (
        <div className="flex flex-1 items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Mark as Paid?</CardTitle>
                    <CardDescription>Are you sure you want to mark this invoice as Paid?</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image 
                        src={PaidGif}
                        alt=""
                        className="rounded-lg"
                        unoptimized
                    />
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Link href='/dashboard/invoices' className={buttonVariants({variant: 'secondary'})}>Cancel</Link>
                    <form action={async () => {
                        "use server"
                        await MarkasPaidAction(invoiceId);
                    }}>
                        <SubmitButton text="Confirm" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}