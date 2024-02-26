import { Dialog, Stack, Typography, Chip, Button } from '@mui/material'
import { statusMap } from '../store'
import ModalHeader from './ModalHeader'
import { useState } from 'react'

export default function ShiftTaskModal({taskInfo, onClose, onSubmit}) {
  const [newStatus, setNewStatus] = useState(taskInfo.oldStatus)

  return (
    <Dialog open fullWidth maxWidth='xs' onClose={onClose}>
      <Stack p={3} spacing={3}>
          <ModalHeader title='Shift Task' onClose={onClose}/>
          <Typography variant='h6'>Task name: {taskInfo.task.text}</Typography>
          <Stack direction='row' spacing={1} alignItems="center">
            <Typography>Status: </Typography>
            {Object.keys(statusMap).map((key) => (
              <Chip 
                key={key}
                onClick={() => setNewStatus(key)} 
                size="small" 
                variant={key === newStatus ? "filled" : "outlined"}
                label={statusMap[key]}
              />)
            )}
          </Stack>
          <Button onClick={() => onSubmit(taskInfo, newStatus)} variant="contained">Shift Task</Button>
        </Stack>
    </Dialog>
        
  )
}
