import { AppBar, Icon, IconButton, Toolbar, Typography, Stack } from '@mui/material'
import BackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import {useNavigate, useParams } from 'react-router-dom'
import { colors } from '../theme/theme'
import useApp from '../hooks/useApp'

export default function BoardTopBar({title, color, lastUpdated, onDelete}) {
  const navigate = useNavigate();

  return (
    <AppBar sx={{borderBottom: "5px solid", borderColor: colors[color]}} position='static'>
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton onClick={() => navigate("/boards")}><BackIcon /></IconButton>
          <Typography variant='h6'>{title}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography display={{xs: "none", sm: "block"}} variant='body2'>Last updated: {lastUpdated}</Typography>
          <IconButton onClick={onDelete}><DeleteIcon /></IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
