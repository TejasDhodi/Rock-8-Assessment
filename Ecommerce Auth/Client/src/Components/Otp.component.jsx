import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Otp = ({ email, receivedOtp, inputs }) => {

  const navigate = useNavigate();
  const otpLength = 8;

  const [otpValues, setOtpValues] = useState(Array(otpLength).fill(''));
  const inputRefs = useRef([]);

  const handleInputs = (index, e) => {
    const { value } = e.target;

    if (value.length === 1 && /^[0-9]$/.test(value)) {

      const newOtpValues = [...otpValues];
      newOtpValues[index] = value.substring(value.length - 1);
      setOtpValues(newOtpValues);

      if (index < otpLength - 1) {
        inputRefs.current[index + 1].focus();
      }

    } else if (value.length === 0) {

      const newOtpValues = [...otpValues];
      newOtpValues[index] = '';

      setOtpValues(newOtpValues);
    }
  };

  const handleKeyDown = (index, e) => {

    if (e.key === 'Backspace') {
      e.preventDefault();

      if (otpValues[index] === '') {

        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }

      } else {

        const newOtpValues = [...otpValues];
        newOtpValues[index] = '';

        setOtpValues(newOtpValues);

      }
    } else if (e.key === 'ArrowLeft' && index > 0) {

      inputRefs.current[index - 1].focus();

    } else if (e.key === 'ArrowRight' && index < otpLength - 1) {

      inputRefs.current[index + 1].focus();

    }
  };

  const handleClick = (index) => {

    inputRefs.current[index].focus();
    inputRefs.current[index].setSelectionRange(1, 1);

  };

  const handleKeyPress = (e) => {

    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }

  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const joinedOtp = Number(otpValues.join(''));
      console.log(joinedOtp);

      const { status, data } = await axios.post(`${import.meta.env.VITE_CONNECTION_URL}/api/v1/auth/registerUser`, {
        email: inputs.email,
        name: inputs.name,
        password: inputs.password,
        otp: Number(joinedOtp)
      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      })

      if (status === 201) {
        alert(data.message)
        navigate('/login')
      }



    } catch (error) {
      console.log('Error from otp component catch : ', error);
      alert(error.response.data.message)
    }
  }

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <div className='otpContainer authContainer'>

      <div className="otpHeader">
        <h2>Verify Your Email</h2>
        <p>Enter the 8 digit code you have received on</p>
        <p>{email}</p>
      </div>

      <div className="inputContainer">
        <div className="otpText">
          <p>Code</p>
        </div>
        <div className="otpInputs">
          {
            otpValues.map((currElem, index) => (
              <input
                type="text"
                key={index}
                maxLength={1}
                value={currElem}
                ref={(input) => (inputRefs.current[index] = input)}
                onChange={(e) => handleInputs(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onKeyPress={handleKeyPress}
              />
            ))
          }
        </div>
      </div>

      <div className="authControl">
        <button onClick={handleSubmit}>Verify</button>
      </div>
    </div>
  );
};

export default Otp;
