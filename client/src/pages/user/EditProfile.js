import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearAuthError, updateUserProfile } from '../../actions/userActions'
import { useNavigate, useParams } from 'react-router-dom'
import { clearProfileUpdate } from '../../slices/authSlice'
import MetaData from '../../components/layouts/MetaData'

const EditProfile = () => {

  const { userId } = useParams()
  const dispatch = useDispatch()
  const { user, isUpdated, error } = useSelector((state) => state.authState)

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('./images/userpng.png')

  const onChangeAvatar = (e) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0])
      }
    }

    reader.readAsDataURL(e.target.files[0])
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name)
    formData.append('address', address)
    formData.append('avatar', avatar);
    dispatch(updateUserProfile(formData, userId))
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setAddress(user.address)
      if (user.avatar) {
        setAvatarPreview(user.avatar)
      }
    }


    if (isUpdated) {
      toast('Profile updated successfully', {
        position: 'bottom-center',
        type: 'success',
        onOpen: () => dispatch(clearProfileUpdate())
      })
      navigate('/myprofile')
      return
    }

    if (error) {
      toast(error, {
        position: 'bottom-center',
        type: 'error',
        onOpen: () => dispatch(clearAuthError)
      })
      return
    }

  }, [user, error, dispatch, isUpdated, navigate])

  return (
    <Fragment>
    <MetaData title='EditProfile'/>
      <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl p-6 rounded-xl flex flex-col gap-2">
        <div className="text-3xl font-bold text-center text-gray-800">Edit Profile</div>
        <div className="h-1 bg-gradient-to-r from-green-500 to-green-500 rounded-full mb-6"></div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="font-medium text-gray-700">
              Address
            </label>
            <textarea
              placeholder="Enter your address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-3 h-28 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400 resize-none"
            ></textarea>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="h-16 w-16 rounded-full object-cover bg-gray-100 border-2 border-gray-300"
            />
            <input
              type="file"
              name="avatar"
              onChange={onChangeAvatar}
              className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </Fragment>
  )
}

export default EditProfile