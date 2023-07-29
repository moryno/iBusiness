import React from 'react'

export const RightBarFooter = () => {
  return (
    <>
        <hr></hr>
        <ul className='flex flex-col gap-4'>
            <li className='flex flex-col gap-3'>
                <p className='text-xs text-col'> Created user: </p>
                <p className='text-sm'> James Karanja </p>
            </li>
            <li className='flex flex-col gap-3'>
                <p className='text-xs text-col'> Created date: </p>
                <p className='text-sm'> 25/07/2024 at 08.15am </p>
            </li>
            <li className='flex flex-col gap-3'>
                <p className='text-xs text-col'> Updated user: </p>
                <p className='text-sm'> Maurice Nganga </p>
            </li>
            <li className='flex flex-col gap-3'>
                <p className='text-xs text-col'> Updated date: </p>
                <p className='text-sm'> 03/03/2024 at 09.35am </p>
            </li>
        </ul>
    </>
  )
}
