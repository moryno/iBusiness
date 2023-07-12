import React from 'react'
import { FcCheckmark } from 'react-icons/fc'
import { ImCross } from 'react-icons/im'


export const ConfirmationOutput = ({handleModalReset, handleDashboard, state}) => {
  return (
    <>
      <div className='flex justify-center'>{state === 0 ? <FcCheckmark fontSize={50} /> : <ImCross fontSize={50} /> }</div>
      <p className='flex justify-center font-semibold text-lg'>{ state === 0 ? "Invite sent successfully" : "Invitation failed" }</p>
      <p className='flex justify-center text-sm'>
        { state === 0 ? "You will receive a notification once the user confirms the invitation."
                      : "There was a problem submitting the request."
        }
      </p>
      <div className='flex gap-4 justify-center'>
          <button className='p-2 rounded box-border text-xs bg-bg text-white hover:bg-blueLight'
           onClick={() => {{state ===0 ? handleModalReset() : handleDashboard()}}}
          >
            { state === 0 ? "Go to dashboard"
                          : "Try again"
            }  
          </button>
          <button className='p-2 rounded box-border text-xs bg-bg text-white hover:bg-blueLight' 
            onClick={() => {{state ===0 ? handleDashboard() : handleModalReset()}}}
          >
            { state === 0 ? "Send another invite"
                          : "Report problem"
            }  
          </button>
      </div>
    </>
  )
}
