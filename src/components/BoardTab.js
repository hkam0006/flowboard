import { Grid, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import AddIcon from '@mui/icons-material/AddCircle'
import Task from './Task'
import StrictModeDroppable from './utils/StrictModeDroppable'
import theme from '../theme/theme'

export default function BoardTab({title, handleOpen, tasks, handleRemoveTask, status, handleShiftTask}) {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only('xs'))
  return (
      <Grid item xs={12} sm={4}>
        <Stack bgcolor="#000" >
          <Stack p={2} direction="row" alignItems='center' justifyContent="space-between">
            <Typography variant='h6'>{title}</Typography>
            <IconButton onClick={handleOpen}><AddIcon /></IconButton>
          </Stack>
          <StrictModeDroppable droppableId={status}>
            {(provided) => (<Stack {...provided.droppableProps} ref={provided.innerRef} mt={!!tasks ? 0 : 2} spacing={2} padding={2}>
              {tasks.map((task, index) => (
                <Task 
                  index={index} 
                  key={task.id} 
                  id={task.id} 
                  text={task.text} 
                  removeTask={() => handleRemoveTask(status, task.id)}
                  shiftTask={isXs ? () => handleShiftTask({task, oldStatus: status}) : null}
                  isSmallScreen={isXs}
                />
              ))}
              {provided.placeholder}
            </Stack>)}
          </StrictModeDroppable>
        </Stack>
      </Grid>
    
  )
}
