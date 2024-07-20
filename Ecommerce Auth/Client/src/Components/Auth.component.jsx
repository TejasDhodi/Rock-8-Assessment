import React, { useState } from 'react'

const Auth = ({ title, h3, p, button, footer1, footer2, navigate, inputs, handleInputs, handleSubmit, credentials, error }) => {

  const [inputType, setInputType] = useState(true);

  const toggleShowPassword = () => {
    setInputType(!inputType)
  }

  return (

    <div className="authContainer">
      <div className="authHead">
        <h2>{title}</h2>
        {h3 && <h3>{h3}</h3>}
        {p && <p>{p}</p>}
        {error}
      </div>

      <div className="inputContainer">
        {
          credentials.map((currElem, index) => {
            const { label, placeholder, type } = currElem
            return (
              <div className="inputs" key={index}>
                <label htmlFor={label}>{label}</label>
                {
                  (type === 'password' && placeholder) ?
                    <div className="showPassword">
                      <input type={inputType ? 'password' : 'text'} name={label.toLocaleLowerCase()} value={inputs[label.toLocaleLowerCase()]} onChange={handleInputs} placeholder={placeholder ? placeholder : 'Enter'} required />
                      <input type="button" value="Show" onClick={toggleShowPassword} />
                    </div> :
                    <input type={type ? 'password' : 'text'} name={label.toLocaleLowerCase()} value={inputs[label.toLocaleLowerCase()]} onChange={handleInputs} placeholder={placeholder ? placeholder : 'Enter'} required />
                }
              </div>
            )
          })
        }
      </div>

      <div className="authControl">
        <button type='button' onClick={handleSubmit}>{button}</button>
      </div>
      <div className="authFooter"><p>{footer1} <span onClick={navigate}>{footer2}</span></p></div>
    </div>


  )
}

export default Auth
