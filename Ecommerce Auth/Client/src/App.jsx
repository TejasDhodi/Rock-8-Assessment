import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register.page'
import Login from './Pages/Login.page'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { saveUserProfileDetails } from './Features/authSlice'
import Home from './Pages/Home.page'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import Carousel from './Components/Carousel.component'

const App = () => {

  const dispatch = useDispatch();

  const userToken = useSelector(state => state.authentication.authToken)
  console.log(userToken);

  const handleUserProfile = async () => {
    try {
      const { status, data } = await axios.get(`https://rock-8-assessment.onrender.com/api/v1/auth/userProfile`, {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      })

      if (status === 200) {
        dispatch(saveUserProfileDetails(data.verifiedUser))
        console.log(data);
      }
    } catch (error) {
      console.log('error from userProfile catch', error);
    }
  }

  useEffect(() => {
    userToken && handleUserProfile();
  }, [userToken])

  return (
    <>
      <header>
        <Navbar />
        <Carousel />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<ProtectedRoute Component={Home}/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <ToastContainer />
      </main>
    </>
  )
}

export default App
