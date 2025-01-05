import React, { Fragment, useEffect, useState } from 'react'
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAuthError, login } from '../../actions/userActions';
import { toast } from 'react-toastify';
import MetaData from '../../components/layouts/MetaData';

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { loading, error, isAuthenticated } = useSelector((state) => state.authState)
    const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [formError, setFormError] = useState({
        email: '',
        password: ''
    })

    const submitHandler = (e) => {
        e.preventDefault()

        setFormError({ email: '', password: '' })
        let isValid = true

        if (email.trim() === '') {
            setFormError(prev => ({ ...prev, email: 'Email is required' }))
            isValid = false
        }

        if (password.trim() === '') {
            setFormError(prev => ({ ...prev, password: 'Password is required' }))
            isValid = false
        }

        if (!isValid) return

        dispatch(login(email, password))
    }

    useEffect(() => {
        if (isAuthenticated) {
            toast('You are Logged In...', {
                type : 'success',
                position : 'bottom-center'
            })
            navigate(redirect)
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

    }, [error, navigate, isAuthenticated, dispatch, redirect])

    return (
        <Fragment>
            <MetaData title='Login' />
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-green-500 to-green-700">
                <div className="h-auto bg-white p-6 rounded-lg shadow-lg w-80">
                    <div className="text-center text-2xl font-extrabold text-green-600 mb-6">Login</div>
                    <form onSubmit={submitHandler}>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center p-3 gap-3 rounded-full bg-gray-100 shadow-sm hover:ring-2 hover:ring-green-500">
                                <span className="text-green-500 text-lg"><MdEmail /></span>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent outline-none border-none text-sm placeholder-gray-500"
                                />
                            </div>
                            {formError.email && <div className="text-xs text-red-500">{formError.email}</div>}

                            <div className="flex items-center p-3 gap-3 rounded-full bg-gray-100 shadow-sm hover:ring-2 hover:ring-green-500">
                                <span className="text-green-500 text-lg"><FaLock /></span>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent outline-none border-none text-sm placeholder-gray-500"
                                />
                            </div>
                            {formError.password && <div className="text-xs text-red-500">{formError.password}</div>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 text-white font-bold rounded-full bg-green-500 hover:bg-green-600 shadow-md transition-all duration-300"
                            >
                                SIGN IN
                            </button>
                        </div>
                    </form>

                    <div className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-green-500 font-bold hover:underline">
                            SIGN UP
                        </Link>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-4">
                        <Link to="/forgotpassword" className="hover:text-green-500 hover:underline">
                            Forgot Password?
                        </Link>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;