import {AppBar, Toolbar, Button, Stack, useMediaQuery, IconButton} from '@mui/material'
import LogoutIcon from '@mui/icons-material/ExitToApp'
import ImgElement from './utils/ImgElement'
import ImgLogo from '../assets/ImgLogo.svg'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import useStore from '../store'
import AddBoardIcon from '@mui/icons-material/AddCircle'

export default function TopBar({openModal}) {

  const isXs = useMediaQuery((theme) => theme.breakpoints.only('xs'))

  const {setToaster} = useStore()

  function handleSignOut(){
    signOut(auth);
    setToaster("User logged out", "success")
  }

  return (
    <AppBar position='static'>
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <ImgElement sx={{height: '25px'}} src={ImgLogo} alt='Flowboard'/>
        <Stack direction='row' spacing={2}>
          {isXs ? <>
            <IconButton onClick={openModal} color='primary'><AddBoardIcon /></IconButton>
            <IconButton onClick={() => handleSignOut()}><LogoutIcon/></IconButton>
          </> : <>
            <Button onClick={openModal} variant='contained'>Create Board</Button>
            <Button onClick={() => handleSignOut()}  endIcon={<LogoutIcon />}>Log Out</Button>
          </>}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
