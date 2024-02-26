import { Stack, Typography, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import { Draggable } from "react-beautiful-dnd"

export default function Task({id, text, removeTask, index, shiftTask, isSmallScreen}) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => <Stack borderRadius="10px" bgcolor="#333333" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} direction='row' spacing={1} alignItems='center' justifyContent="space-between" p={2}>
        <Typography>{text}</Typography>
        <Stack direction='row' spacing={1}>
          {isSmallScreen && <IconButton onClick={shiftTask}><MultipleStopIcon /></IconButton>}
          <IconButton onClick={removeTask}><DeleteIcon /></IconButton>
        </Stack>
      </Stack>}
    </Draggable>
  )
}
