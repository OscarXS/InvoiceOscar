import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
        email: "hello@demomailtrap.com",  
        name: "Oscar Sebeloane",  
    }; 


    emailClient.send({
        from: sender,
        // to: [{email: submission.value.clientEmail}], // IF EMAIL VARIFIED;
        to: [{email: 'xosebeloane@gmail.com'}],
        template_uuid: "34452b58-9001-42d0-896a-48b9dad000c5",
        template_variables: {
          "first_name": invoiceData.clientName,
          "company_info_name": "Devsox Labs",
          "company_info_address": "Montrose Avenue",
          "company_info_city": "Johannesburg",
          "company_info_zip_code": "2162",
          "company_info_country": "South Africa"
        }
      });

    return NextResponse.json({ success: true });
} catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to send email reminded.' }, { status: 500 })
}
}