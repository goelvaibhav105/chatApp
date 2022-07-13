import React from 'react'
import styled from 'styled-components'
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const handleSubmit = (event) =>{
     event.preventDefault();
     alert("form")
  }

  const handleChange = (event) =>{
   
 }

  return (
    <>
    <FormContainer>
      <form onSubmit={(event)=>{handleSubmit(event)}}>
         <div className="brand">
          <img src="" alt="" />
          <h1>Chat App </h1>
         </div>
         <input 
          type="text" 
          placeholder='Username'
          name="username"
          onChange={(e) =>{handleChange(e)}}
         />
          <input 
          type="email" 
          placeholder='Email'
          name="email"
          onChange={(e) =>{handleChange(e)}}
         />
          <input 
          type="password" 
          placeholder='Password'
          name="password"
          onChange={(e) =>{handleChange(e)}}
         />
          <input 
          type="password" 
          placeholder='Confirm Password'
          name="confirmPassword"
          onChange={(e) =>{handleChange(e)}}
         />
      </form>
      <button type='submit'>Create User</button>
         <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
    </FormContainer>
    </>
  )
}

const FormContainer = styled.div``

export default Register