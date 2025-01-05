import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, forgotPassword } from '../../actions/userActions'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import MetaData from '../../components/layouts/MetaData'


const ForgotPassword = () => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const { error, message } = useSelector(state => state.authState);

    const handleSubmit = (e) => {
        e.preventDefault()

        setEmailError('')

        let isValid = true
        if (email.trim() === '') {
            setEmailError('* Email is required')
            isValid = false
        }

        if (!isValid) return

        const formData = new FormData()
        formData.append('email', email)
        dispatch(forgotPassword(formData))

        setEmailError('')
        setEmail('')
    }

    useEffect(() => {
        if (message) {
            toast(message, {
                position: 'bottom-center',
                type: 'success'
            })
            setEmail('')
            return
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [message, error, dispatch])

    return (
        <Fragment>
            <MetaData title='Forgot Password' />
            <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-green-300 via-green-500 to-green-700">
                <div className="w-full max-w-md bg-white shadow-2xl rounded-lg p-6">
                    <div className="text-center text-2xl font-extrabold text-gray-800 mb-4">
                        Forgot Password
                    </div>
                    <p className="text-center text-gray-600 text-sm mb-6">
                        Enter your email address, and we’ll send you a link to reset your password.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                                {emailError && (
                                    <div className="text-xs text-red-500 mt-1">{emailError}</div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 rounded-md text-white font-bold bg-green-500 hover:bg-green-600 transition-all duration-300"
                        >
                            Submit
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-600 mt-4">
                        Remember your password?{" "}
                        <Link
                            to='/login'
                            className="text-primary font-semibold hover:underline"
                        >
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}


export default ForgotPassword