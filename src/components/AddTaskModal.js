import { Button, Dialog, Stack, TextField, Chip, Typography } from "@mui/material"
import ModalHeader from "./ModalHeader"
import { statusMap } from "../store"
import { useState } from "react"

export default function AddTaskModal({handleClose, selected, handleAddTaskTo, onSubmit, loading}) {

  const [taskText, setTaskText] = useState("")

  return (
    <>
      <Dialog open fullWidth maxWidth="xs" onClose={handleClose}>
        <Stack p={3} spacing={3}>
          <ModalHeader title='Add Task' onClose={handleClose}/>
          <TextField label="New task" onChange={(e) => setTaskText(e.target.value)} value={taskText}/>
          <Stack direction='row' spacing={1} alignItems="center">
            <Typography>Status: </Typography>
            {Object.keys(statusMap).map((key) => (
              <Chip 
                key={key}
                onClick={() => handleAddTaskTo(key)} 
                size="small" 
                variant={key === selected ? "filled" : "outlined"}
                label={statusMap[key]}
              />)
            )}
          </Stack>
          <Button disabled={loading}  onClick={() => onSubmit(taskText)}  variant="contained">Add Task</Button>
        </Stack>
      </Dialog>
    </>
  )
}
