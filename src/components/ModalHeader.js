import {Stack, Typography, IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function ModalHeader({title, onClose}) {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Typography variant='h5'>{title}</Typography>
      <IconButton onClick={onClose} size='small' ><CloseIcon /></IconButton>
    </Stack>
  )
}
