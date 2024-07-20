import React, { useState } from 'react'
import Auth from '../Components/Auth.component'
import '../Styles/Auth.css'
import { useNavigate } from 'react-router-dom';
import { loginCredentials } from '../Service/Service';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveAuthToken } from '../Features/authSlice';

const Login = () => {

    const navigate = useNavigate();
    const initialInputState = {};
    const dispatch = useDispatch();

    loginCredentials.forEach((currElem) => {
        initialInputState[currElem.label.toLocaleLowerCase()] = ""
    })

    const [inputs, setInputs] = useState(initialInputState);
    const [errorMsg, setErrorMsg] = useState(null)
    const handleInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const handleNavigate = () => {
        navigate('/register')
    }

    const handleSubmit = async (e) => {
        try {
            
            const {data, status} = await axios.post('http://localhost:5000/api/v1/auth/loginUser', inputs, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            if(status === 200) {
                alert('Login Successfull')
                dispatch(saveAuthToken(data.userToken))
                console.log(data);
                navigate('/')
            } 

        } catch (error) {
            setErrorMsg(error.response.data.message)
            console.log('Error from login page catch : ', error);
        }
    }

    return (
        <section id='login'>
            <Auth
                title='Login'
                h3="Welcome back to ECOMMERCE"
                p="The next gen business marketplace"
                button="Login"
                footer1="Don’t have an Account?  "
                footer2="SIGN UP"
                navigate={handleNavigate}
                handleInputs={handleInputs}
                inputs={inputs}
                handleSubmit={handleSubmit}
                credentials={loginCredentials}
                error={errorMsg}
            />
        </section>
    )
}

export default Login
