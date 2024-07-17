import React from 'react'

const Auth = ({ title, h3, p, button, footer1, footer2, navigate, inputs, handleInputs, handleSubmit, credentials, error }) => {
  
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
            const { label, placeholder } = currElem
            return (
              <div className="inputs">
                <label htmlFor={label}>{label}</label>
                <input type="text" name={label.toLocaleLowerCase()} value={inputs[label.toLocaleLowerCase()]} onChange={handleInputs} placeholder={placeholder ? placeholder: 'Enter'} required />
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
