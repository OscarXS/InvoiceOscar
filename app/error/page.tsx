import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Error = () => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
        <Card className='w-[380] px-5'>
            <CardHeader className='text-center'>
                <div className='mb-4 mx-auto flex size-20 items-center justify-center rounded-full bg-red-100'>
                    <AlertCircle className='size-12 text-red-500' />
                </div>
                <CardTitle className='text-2xl font-bold'>Something went wrong</CardTitle>
                <CardDescription>The verification link may have already been used or the time ran out</CardDescription>
            </CardHeader>
            <CardContent className=''>
                <div className="mt-4 rounded-md bg-yellow-50 border-yellow-300 p-4">
                    <div className='flex items-center gap-3'>
                        <AlertCircle className='size-5 text-yellow-500 self-start' />
                        <p className='text-sm font-medium text-yellow-700'>Click the link in the email once, Please log in again.</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Link href="/login" className={buttonVariants({
                    className: 'w-full',
                    variant: 'outline'
                })}>
                    <ArrowLeft className='size-4 mr-2' />Back to Log in
                </Link>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Error