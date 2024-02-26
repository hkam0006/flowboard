import { Grid, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import BoardTab from './BoardTab'
import AddTaskModal from './AddTaskModal'
import { useState, useEffect } from 'react'
import useApp from '../hooks/useApp'
import useStore, { statusMap } from '../store'
import {DragDropContext} from 'react-beautiful-dnd'
import AppLoader from './layout/AppLoader'
import ShiftTaskModal from './ShiftTaskModal'

export default function BoardsInterface({data, boardId, updateLastUpdated}) {
  const [tabs, setTabs] = useState(structuredClone(data))
  const [addTaskTo, setAddTaskTo] = useState('');
  const [loading, setLoading] = useState(false)
  const {updateBoardData} = useApp()
  const {setToaster} = useStore()

  const [isXs, setIsXs] = useState(useMediaQuery((theme) => theme.breakpoints.only('xs')))


  async function handleUpdateBoardData(dClone, toasterObj){

    setLoading(true)
    await updateBoardData(boardId, dClone)
    if (toasterObj){
      const {msg, severity} = toasterObj
      setToaster(msg, severity)
    }
    setTabs(dClone)
    updateLastUpdated()
  }

  async function handleAddTask(text){
    if(!text.trim()){
      setToaster("Task text cannot be empty", "error")
      return
    }

    const dClone = structuredClone(tabs)
    dClone[addTaskTo].unshift({
      id: crypto.randomUUID(),
      text: text
    })

    try {
      await handleUpdateBoardData(dClone, {msg: "Task added!"})
      setAddTaskTo('')
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleRemoveTask(tabName, taskId){
    setLoading(true)
    const dClone = structuredClone(tabs)
    const taskIndex = dClone[tabName].find((t) => t.id === taskId)
    dClone[tabName].splice(taskIndex, 1)

    try{
      await handleUpdateBoardData(dClone, {msg: "Task removed"})
    } catch(err){
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

   async function handleDnD({destination, source}){
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index){
      return
    }

    // make deep copy
    const dClone = structuredClone(tabs)
    
    // remove from source
    const sourceTab = dClone[source.droppableId]
    const sourceIndex = source.index
    const [task] = sourceTab.splice(sourceIndex, 1)
    
    // add to destination
    const destinationTab = dClone[destination.droppableId]
    const destinationIndex = destination.index
    destinationTab.splice(destinationIndex, 0, task)

    try{
      await handleUpdateBoardData(dClone)
    } catch(err){
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const [shiftTask, setShiftTask] = useState(null)

  async function handleShiftTask(taskInfo, newStatus){
    const {task, oldStatus} = taskInfo
    if (taskInfo.oldStatus === newStatus) return
    const dClone = structuredClone(tabs)
    var taskIndex = dClone[oldStatus].find((t) => t.id === task.id)
    const [shiftTask] = dClone[oldStatus].splice(taskIndex, 1)
    dClone[newStatus].unshift(shiftTask)
    try {
      await handleUpdateBoardData(dClone)
      setShiftTask(null)
    } catch(err){
      console.log(err)
    } finally {
      setLoading(false)
    }
  }


  if (loading) return <AppLoader />

  return <>
    {!!addTaskTo && (
      <AddTaskModal 
        handleClose={() => setAddTaskTo('')} 
        selected={addTaskTo}
        handleAddTaskTo={setAddTaskTo}
        onSubmit={handleAddTask}
        loading={loading}
      />)
    }
    {isXs && !!shiftTask && (
      <ShiftTaskModal 
        onClose={() => setShiftTask(null)} 
        taskInfo={shiftTask}
        onSubmit={handleShiftTask}
      />
    )}
    <DragDropContext onDragEnd={handleDnD}>
      <Grid container spacing={2} p={2}>
        {Object.keys(statusMap).map((status) => (
          <BoardTab 
            key={status} 
            status={status}
            title={statusMap[status]} 
            color={status.color}
            tasks={tabs[status]}
            handleOpen={() => setAddTaskTo(status)}
            handleRemoveTask={handleRemoveTask}
            handleShiftTask={setShiftTask}
          />))
        }
      </Grid>
    </DragDropContext>
  </>
}
