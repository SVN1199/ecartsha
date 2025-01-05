import React, { Fragment } from 'react'
import MetaData from '../../components/layouts/MetaData'

const VerifyEmail = () => {
  return (
   <Fragment>
   <MetaData title='Verify Email'/>
     <div className='h-screen w-full flex flex-row items-center justify-center'>
        <div className='h-auto w-2/6 bg-primary flex flex-col gap-3 p-3 rounded'>
            <div className='text-white font-bold text-center'>Verify Email</div>
            <form action="" className='flex flex-col gap-3'>
            <div className='flex flex-col gap-2'>
                <label 
                    htmlFor="verifyemail"
                    className='font-bold text-white'
                >Enter OTP</label>
                <input 
                    type="number" 
                    id='verifyemail'
                    placeholder='Enter the 6 digits OTP'
                    className='p-2 rounded-sm outline-none border-none focus:ring-2 focus:ring-blue-800'
                />
            </div>
            <button className='rounded w-full p-1 font-bold text-sm uppercase bg-white text-black'>Submit</button>
            </form>
        </div>
    </div>
   </Fragment>
  )
}

export default VerifyEmail