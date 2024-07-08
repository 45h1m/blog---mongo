import { MoveUpRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col pt-20 items-center justify-center'>
        <Image width={300} height={250} src="/building.gif" alt="webpage-is-building-animation" className='w-full max-w-md rounded-lg'/>
        <h5 className='text-xl font-bold pt-5'>still building this page 😉</h5>
        <a href="/blog" className="flex w-fit items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-400 rounded-sm text-white font-semibold mt-2">
                    View Blogs{" "}
                    <span className="pt-1">
                        <MoveUpRight size={18} />
                    </span>
                </a>
    </div>
  )
}

export default page