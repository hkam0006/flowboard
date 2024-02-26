import React, { useEffect } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme/theme'
import AuthScreen from './screens/AuthScreen'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import useStore from './store'
import AppLoader from './components/layout/AppLoader'
import PublicOnlyRoute from './components/utils/PublicOnlyRoute'
import BoardsScreen from './screens/BoardsScreen'
import PrivateOnlyRoute from './components/utils/PrivateOnlyRoute'
import SnackbarManager from './components/layout/SnackbarManager'
import BoardScreen from './screens/BoardScreen'


export default function App() {
  const {setLoginState, loader} = useStore()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoginState(!!user)
    });

    // handle unmount
    return () => unsub();
  }, []);

  if (loader) return <AppLoader />

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarManager />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicOnlyRoute Component={AuthScreen} />}/>
          <Route path='/boards' element={<PrivateOnlyRoute Component={BoardsScreen}/>}/>
          <Route path='/boards/:boardId' element={<PrivateOnlyRoute Component={BoardScreen}/>}/>
          <Route path='*' element={<Navigate to="/" replace/>}/>
        </Routes>
      </BrowserRouter>

    </ThemeProvider>
  )
}
