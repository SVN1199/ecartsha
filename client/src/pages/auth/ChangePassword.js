import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, updatePassword } from '../../actions/userActions'
import { toast } from 'react-toastify'
import MetaData from '../../components/layouts/MetaData'

const ChangePassword = () => {

    const { isUpdated, error } = useSelector((state) => state.authState)

    const dispatch = useDispatch()

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [formError, setFormError] = useState({
        passwordError: '',
        newPasswordError: ''
    })

    const handleChangePasswordSubmit = (e) => {
        e.preventDefault()

        setFormError({ passwordError: '', newPasswordError: '' })

        let isValid = true
        if (password.trim() === '') {
            setFormError((prev) => ({ ...prev, passwordError: '* Old Password is required' }))
            isValid = false
        }
        if (newPassword.trim() === '') {
            setFormError((prev) => ({ ...prev, newPasswordError: '* New Password is required' }))
            isValid = false
        }

        if (!isValid) return

        dispatch(updatePassword(password, newPassword))
        setFormError({
            passwordError: '',
            newPasswordError: ''
        })
    }

    useEffect(() => {
        if (isUpdated) {
            toast('Password updated successfully', {
                type: 'success',
                position: 'bottom-center'
            })
            setNewPassword("");
            setPassword("")
            return;
        }
        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [isUpdated, error, dispatch])

    return (
        <Fragment>
            <MetaData title='Change Password' />
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-green-500 to-green-700">
                <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
                    <h2 className="text-green-700 text-center text-3xl font-extrabold mb-8">Change Password</h2>
                    <form onSubmit={handleChangePasswordSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="oldpassword"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="oldpassword"
                                name="oldpassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Old Password"
                                className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-400"
                            />
                            {formError.passwordError && (
                                <p className="text-sm text-red-600 mt-1">{formError.passwordError}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="newpassword"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newpassword"
                                name="newpassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter New Password"
                                className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-400"
                            />
                            {formError.newPasswordError && (
                                <p className="text-sm text-red-600 mt-1">{formError.newPasswordError}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>


    )
}

export default ChangePassword
