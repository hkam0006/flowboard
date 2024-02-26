import React from 'react'
import {Container, Stack, TextField, Button, Typography} from '@mui/material'
import ImgLogo from '../assets/ImgLogo.svg'
import ImgElement from '../components/utils/ImgElement'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../firebase'
import useStore from '../store'

const defaultForm = {
  email: '',
  password: ''
}

export default function AuthScreen() {
  const {setToaster} = useStore()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(defaultForm);

  function handleChange(e){
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }))
  }

  async function handleAuth(e){
    try {
      setIsLoading(true)
      if (isLogin){
        await signInWithEmailAndPassword(auth, form.email, form.password)
        setToaster("Log in successful", "success")
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password)
      } 
    } catch (err){
      var errMsg = err.code.split("auth/")[1].split("-").join(" ")
      setToaster(errMsg, "error")
      setIsLoading(false)
    }
  }

  return (
    <Container sx={{mt: 10}} maxWidth='xs'>
      <Stack mb={6} spacing={4} alignItems='center' textAlign='center'>
        <ImgElement src={ImgLogo} alt='FlowBoard'/>
        <Typography color='rgba(255,255,255, 0.6)'>
          Visualise your workflow for increased productivity.
          <br />
          Access your tasks anytime anywhere
        </Typography>
        <Button />
      </Stack>
      <Stack spacing={2}>
        <TextField type='email' value={form.email} name='email' onChange={handleChange} label='Email'/>
        <TextField type='password' value={form.password} name='password' onChange={handleChange} label='Password'/>
        <Button disabled={isLoading || !form.email.trim() || !form.password.trim()} onClick={handleAuth} size='large' variant='contained'>
          {isLogin ? "Login" : "Sign Up"}
        </Button>
        <Typography onClick={() => setIsLogin(prevState => !prevState)} sx={{cursor: 'pointer'}} textAlign='center' mt={3}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Typography>
      </Stack>
    </Container>
  )
}
