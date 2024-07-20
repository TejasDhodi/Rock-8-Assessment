import React, { useState } from 'react'
import Auth from '../Components/Auth.component'
import Otp from '../Components/Otp.component'

import '../Styles/Auth.css'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { registerCredentials, isValidEmail, isValidPassword } from '../Service/Service'

const Register = () => {

    const navigate = useNavigate();

    const initialInputState = {};

    registerCredentials.forEach((currElem, index) => {
        initialInputState[currElem.label.toLocaleLowerCase()] = ""
    })

    const [inputs, setInputs] = useState(initialInputState);
    const [showOtp, setShowOtp] = useState(false);
    const [receivedOtp, setReceivedOtp] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputs = (e) => {

        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const handleNavigate = () => {
        navigate('/login')
    }

    const handleSendOtp = async (e) => {
        try {
            setLoading(true)

            if (!inputs.name && !inputs.email && !inputs.password) {
                setErrorMsg('All Fields are mandatory')
            } else if (!isValidEmail(inputs.email)) {
                setErrorMsg('Invalid Email Format')
            } else if (!isValidPassword(inputs.password)) {
                setErrorMsg('Password must contain atleast 8 character and one special character')
            } else {
                const { status, data } = await axios.post('http://localhost:5000/api/v1/auth/registerUser/sendOtp', { email: inputs.email }, {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                })
                if (status === 200) {
                    setLoading(false)
                    alert('Otp sent successfully')
                    setShowOtp(true)
                    setReceivedOtp(data.otp)
                    console.log('Mail Data : ', data);
                }
            }

        } catch (error) {
            setLoading(false)
            setErrorMsg(error.response.data.message)
            alert(error.response.data.message)
            console.log('Error from Register Handler catch : ', error.response.data.message);
        }
    }

    return (
        <section id='register'>
            {
                showOtp ? <Otp
                    email={inputs.email}
                    receivedOtp={receivedOtp}
                    inputs={inputs}
                />
                    : <Auth
                        title='Create Your Account'
                        button="Create Account"
                        footer1="Have an Account? "
                        footer2="Login"
                        navigate={handleNavigate}
                        handleInputs={handleInputs}
                        inputs={inputs}
                        handleSubmit={handleSendOtp}
                        credentials={registerCredentials}
                        error={errorMsg}
                        loading={loading}
                    />
            }



        </section>
    )
}

export default Register
