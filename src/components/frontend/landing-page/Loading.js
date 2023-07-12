import React from 'react'
import { PageLoader } from '../../shared/PageLoader/PageLoader'

export const Loading = () => {
  return (
    <div className='w-full h-[700px] bg-white flex justify-center items-center flex-col gap-4'>
        <p className='text-4xl font-bold text-[#0088FF]'>iBusiness</p>
        <p className='text-sm font-semibold text-[#0088FF]'>Stay ahead.</p>
        <PageLoader />
    </div>
  )
}
