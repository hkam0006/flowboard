import {Stack, Dialog, Box, Typography, Button, TextField} from '@mui/material'
import ModalHeader from './ModalHeader'
import { colors } from '../theme/theme'
import { useState } from 'react'
import useApp from '../hooks/useApp'
import useStore from '../store'

export default function CreateBoardModal({closeModal}) {
  const {createBoard} = useApp()

  const [boardName, setBoardName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const {setToaster} = useStore()

  async function handleCreate(){
    const tName = boardName.trim()
    if (!tName) {
      setToaster('Board name field cannot be empty!', "error")
      return
    }
    try {
      setLoading(true)
      await createBoard({name: tName, color: selectedIndex})
      setToaster("Board created!", "success")
      closeModal()
    } catch(err){
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <Dialog onClose={closeModal} open fullWidth maxWidth='xs'>
      <Stack p={2}>
        <ModalHeader title={"Create Board"} onClose={closeModal}/>
        <Stack my={2} spacing={3}>
          <TextField label='Board name' value={boardName} onChange={(e) => setBoardName(e.target.value)}/>
          <Stack direction='row' spacing={1.5}>
            <Typography>Color: </Typography>
            {colors.map((color, index) => (
              <Box 
                sx={{
                  cursor: "pointer", 
                  border: selectedIndex === index ? "3px solid #383838" : "none",
                  outline: `2px solid ${color}`
                }} 
                key={color} 
                height={25} 
                width={25} 
                backgroundColor={color} 
                borderRadius="50%" 
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </Stack>
          <Button disabled={loading} size='large' variant='contained' onClick={handleCreate}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}
