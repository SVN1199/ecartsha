import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, register, verifyEmail } from '../../actions/userActions';
import { toast } from 'react-toastify';
import MetaData from '../../components/layouts/MetaData';

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, isAuthenticated } = useSelector((state) => state.authState)

    const [viewOtpInput, setViewOTPInput] = useState(false)

    const [otpTime, setOtpTime] = useState(0)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [emailOTP, setEmailOTP] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState('')

    const [formError, setFormError] = useState({
        name: '',
        email: '',
        emailOTP: '',
        password: '',
        confirmPassword: ''
    })

    const onchange = (e) => {
        if (e.target.name === 'avatar') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setAvatarPreview(reader.result);
                        setAvatar(file);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                console.error("No file selected or invalid file type.");
            }
        } else {
            const { name, value } = e.target;
            if (name === "name") setName(value);
            if (name === "email") setEmail(value);
            if (name === "emailOTP") setEmailOTP(value);
            if (name === "password") setPassword(value);
            if (name === "confirmPassword") setConfirmPassword(value);
        }
    };


    const submitHandler = (e) => {
        e.preventDefault()

        setFormError({ name: '', email: '', emailOTP: '', password: '', confirmPassword: '' })

        let isValid = true;

        if (name.trim() === '') {
            setFormError(prev => ({ ...prev, name: '*Name is required' }))
            isValid = false
        }

        if (email.trim() === '') {
            setFormError(prev => ({ ...prev, email: '*Email is required' }))
            isValid = false
        }

        if (emailOTP.trim() === '') {
            setViewOTPInput(true)
            setFormError(prev => ({ ...prev, emailOTP: '*OTP is required' }))
            isValid = false
        }

        if (password.trim() === '') {
            setFormError(prev => ({ ...prev, password: '*Password is required' }))
            isValid = false
        }

        if (confirmPassword.trim() === '') {
            setFormError(prev => ({ ...prev, confirmPassword: '*Confirm Password is required' }))
            isValid = false
        }

        if (password !== confirmPassword) {
            toast('Password does not match', {
                position: 'bottom-center',
                type: 'error',
            })
            return
        }

        if (!isValid) return

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('emailOTP', emailOTP)
        formData.append('password', password)
        formData.append('avatar', avatar)
        dispatch(register(formData))
    }


    useEffect(() => {
        if (isAuthenticated) {
            toast('You are Logged In...', {
                type: 'success',
                position: 'bottom-center'
            })
            navigate('/')
            return
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            setViewOTPInput(false)
            return
        }

    }, [dispatch, navigate, error, isAuthenticated])


    const handleViewOtpInput = (e) => {
        e.preventDefault()

        if (email.trim() === '') {
            setFormError(prev => ({ ...prev, email: '*Email is required' }))
            return
        }
        setFormError('')
        const formData = new FormData()
        formData.append('email', email)
        dispatch(verifyEmail(formData))
        setViewOTPInput(true)
        setOtpTime(600);

        const timer = setInterval(() => {
            setOtpTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    return (
        <>
            <MetaData title='Register' />
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-green-500 to-green-700 px-3">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 sm:mt-10 mb-4">
                    <h2 className="text-center text-3xl font-bold text-green-600 mb-6">Register</h2>
                    <form onSubmit={submitHandler}>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center p-3 gap-3 rounded-full bg-gray-100 shadow-sm hover:ring-2 hover:ring-green-500">
                                <FaUser className="text-green-500" />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full outline-none border-none bg-transparent text-sm placeholder:text-gray-500"
                                />
                            </div>
                            {formError.name && (
                                <span className="text-xs text-red-500">{formError.name}</span>
                            )}

                            <div className="flex items-center p-3 gap-3 rounded-full bg-gray-100 shadow-sm hover:ring-2 hover:ring-green-500">
                                <MdEmail className="text-green-500" />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full outline-none border-none bg-transparent text-sm placeholder:text-gray-500"
                                />
                                <button
                                    onClick={handleViewOtpInput}
                                    className="py-1 px-4 bg-green-500 text-white rounded-full text-xs hover:bg-green-600"
                                >
                                    Verify
                                </button>
                            </div>
                            {formError.email && (
                                <span className="text-xs text-red-500">{formError.email}</span>
                            )}

                            {viewOtpInput && (
                                <div className="flex items-center p-3 gap-3 rounded-full bg-gray-100 shadow-sm hover:ring-2 hover:ring-green-500">
                                    <input
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        name="emailOTP"
                                        value={emailOTP}
                                        onChange={(e) => setEmailOTP(e.target.value)}
                                        className="w-full outline-none border-none bg-transparent text-sm placeholder:text-gray-500"
                                    />
                                    <span className="text-gray-500 text-xs">
                                        {otpTime && `${otpTime}s`}
                                    </span>
                                </div>
                            )}
                            {formError.emailOTP && (
                                <span className="text-xs text-red-500">{formError.emailOTP}</span>
                            )}


                            <div className="flex items-center p-3 gap-3 rounded-full bg-gray-100 shadow-sm hover:ring-2 hover:ring-green-500">
                                <FaLock className="text-green-500" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full outline-none border-none bg-transparent text-sm placeholder:text-gray-500"
                                />
                            </div>
                            {formError.password && (
                                <span className="text-xs text-red-500">{formError.password}</span>
                            )}

                            <div className="flex items-center p-3 gap-3 rounded-full bg-gray-100 shadow-sm hover:ring-2 hover:ring-green-500">
                                <FaLock className="text-green-500" />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full outline-none border-none bg-transparent text-sm placeholder:text-gray-500"
                                />
                            </div>
                            {formError.confirmPassword && (
                                <span className="text-xs text-red-500">{formError.confirmPassword}</span>
                            )}

                            <div className="flex items-center gap-4">
                                <img
                                    src={avatarPreview || "./images/userpng.png"}
                                    alt="Avatar"
                                    className="w-14 h-14 rounded-full bg-gray-100 object-cover shadow-md"
                                />
                                <input
                                    type="file"
                                    name="avatar"
                                    onChange={onchange}
                                    className="text-sm text-gray-500"
                                />
                            </div>
                        </div>

                        <button disabled={loading} className="w-full py-2 mt-6 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition">
                            SIGN UP
                        </button>
                    </form>

                    <p className="text-gray-500 text-center mt-6 text-sm">
                        Already have an account?
                        <Link to="/login" className="text-green-500 font-bold ml-1">
                            SIGN IN
                        </Link>
                    </p>
                </div>
            </div>
        </>


    )
}

export default Register;