import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, resetPassword } from '../../actions/userActions'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import MetaData from '../../components/layouts/MetaData'

const ResetPassword = () => {

    const { token } = useParams()

    const { isAuthenticated, error } = useSelector((state) => state.authState)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [formError, setFormError] = useState({
        passwordError: '',
        confirmPasswordError: ''
    })

    const handleResetPasswordSubmit = (e) => {
        e.preventDefault()

        setFormError({ passwordError: '', confirmPasswordError: '' })

        let isValid = true
        if (password.trim() === '') {
            setFormError((prev) => ({ ...prev, passwordError: '* Password is required' }))
            isValid = false
        }
        if (confirmPassword.trim() === '') {
            setFormError((prev) => ({ ...prev, confirmPasswordError: '* Confirm Password is required' }))
            isValid = false
        }

        if (!isValid) return

        console.log(token)

        let formData = new FormData()
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)
        dispatch(resetPassword(password, confirmPassword, token))
        setPassword('')
        setConfirmPassword('')
        setFormError({
            passwordError: '',
            confirmPasswordError: ''
        })
    }

    useEffect(() => {

        if (isAuthenticated) {
            toast('Password reset successfully', {
                type: 'success',
                position: 'bottom-center',
            })
            navigate('/')
            return
        }

        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [error, dispatch, isAuthenticated, navigate])

    return (
        <Fragment>
            <MetaData title='Reset Password' />
            <div className='h-screen w-full flex flex-row items-center justify-center'>
                <div className='h-auto w-2/6 bg-primary flex flex-col gap-2 p-3 rounded'>
                    <div className='text-white font-bold text-center'>Reset Password</div>
                    <form onSubmit={handleResetPasswordSubmit} className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <label
                                htmlFor="password"
                                className='font-bold text-white'
                            >Password</label>
                            <input
                                type="password"
                                id='password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter Password'
                                className='p-2 rounded-sm outline-none border-none focus:ring-2 focus:ring-blue-800'
                            />
                            {formError.passwordError && <div className='text-xs mx-3 py-0.5 flex items-center text-red-100'>{formError.passwordError}</div>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label
                                htmlFor="confirmPassword"
                                className='font-bold text-white'
                            >Confirm Password</label>
                            <input
                                type="password"
                                id='confirmPassword'
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Enter Confirm Password'
                                className='p-2 rounded-sm outline-none border-none focus:ring-2 focus:ring-blue-800'
                            />
                            {formError.confirmPasswordError && <div className='text-xs mx-3 py-0.5 flex items-center text-red-100'>{formError.confirmPasswordError}</div>}
                        </div>
                        <button className='rounded w-full p-1 my-2 font-bold text-sm uppercase bg-white text-black'>Submit</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ResetPassword