import { Stack, Typography, Button } from '@mui/material'
import BackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

export default function NoBoardScreen() {
  const navigate = useNavigate()
  return (
    <Stack alignItems="center" mt={10} textAlign="center">
      <Typography variant='h5'>Seems like your board is not ready</Typography>
      <Typography variant='h6'>
        Sometimes it may take few seconds for your board to be ready.
        <br/>
        Please try again in few seconds.
      </Typography>
      <Button sx={{mt: 3}} variant="contained" startIcon={<BackIcon/>} onClick={() => navigate("/boards")}>
        Go back
      </Button>
    </Stack>
  )
}
