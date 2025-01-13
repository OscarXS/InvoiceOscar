import { buttonVariants } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

interface IAppProps {
    title: string,
    description: string,
    buttonText: string,
    href: string
}

export function EmptyState({ title, description, buttonText, href }: IAppProps) {
    return (
       <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
                <Ban className="size-10 text-primary" />
            </div>
            <h2 className="mt-6 font-semibold text-xl">{title}</h2>
            <p className="mb-8 mt-2 text-sm text-muted-foreground max-w-sm mx-auto text-center">{description}</p>
            <Link href={href} className={buttonVariants()}><PlusCircle className="siz-4 mr-2" />{buttonText}</Link>
       </div>
    )
}