import { useNavigate, useParams } from 'react-router-dom'
import AddTaskModal from '../components/AddTaskModal'
import BoardTopBar from '../components/BoardTopBar'
import BoardsInterface from '../components/BoardsInterface'
import useStore from '../store'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useApp from '../hooks/useApp'
import AppLoader from '../components/layout/AppLoader'
import NoBoardScreen from './NoBoardScreen'

export default function BoardScreen() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const navigate = useNavigate()
  const {boardId} = useParams()
  const {boards, areBoardsFetched} = useStore()
  const board = useMemo(() => boards.find(b => b.id === boardId), [])
  const boardData = useMemo(() => data, [data])
  const {fetchBoardData, deleteBoard} = useApp()

  const handleUpdateLastUpdated = useCallback(() => {
    setLastUpdated(new Date().toLocaleString('en-UK'))
  }, [])

  async function handleDelete(){
    if(!window.confirm("Are you sure you want to delete this board?")) return
    try {
      setLoading(true)
      await deleteBoard(boardId)
    } catch(err){
      console.log(err)
      setLoading(false)
    }
  }


  async function handleFetchBoardData(){
    try {
      const boardData = await fetchBoardData(boardId)
      if (boardData) {
          const {tabs, lastUpdated} = boardData
          setData(tabs)
          setLastUpdated(lastUpdated.toDate().toLocaleString('en-UK'))
        }
      setLoading(false)
    } catch (err){
      console.log(err)
    }
  }

  useEffect(() => {
    if(!areBoardsFetched || !boards) navigate("/boards")
    else handleFetchBoardData()
  }, [])

  if (!board) return null
  if (loading) return <AppLoader />
  if (!data) return <NoBoardScreen />

  return <>
    <BoardTopBar title={board.name} color={board.color} lastUpdated={lastUpdated} onDelete={() => handleDelete()}/>
    <BoardsInterface data={boardData} boardId={boardId} updateLastUpdated={handleUpdateLastUpdated}/>
  </>
}
