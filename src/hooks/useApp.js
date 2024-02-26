import { 
  collection, 
  addDoc, 
  getDocs, 
  serverTimestamp, 
  orderBy, 
  query, 
  doc, 
  getDoc ,
  updateDoc,
  deleteDoc,
  setDoc
} from "firebase/firestore"
import { db } from "../firebase"
import { getAuth } from "firebase/auth"
import useStore from "../store"
import { useNavigate } from "react-router-dom"

export default function useApp(){
  const {currentUser: {uid}} = getAuth()
  const boardsColRef = collection(db, `users/${uid}/boards`)
  const boardsDataColRef = collection(db, `users/${uid}/boardsData/`)
  const {boards, setBoards, addBoard, setToaster} = useStore()
  const navigate = useNavigate()

  async function updateBoardData(boardId, tabs){
    const docRef = doc(db, `/users/${uid}/boardsData/${boardId}`)
    
    try {
      await updateDoc(docRef, {tabs, lastUpdated: serverTimestamp()});
    } catch (err){
      setToaster("Error updating board data!", "error")
      console.log(err)
    }
  }

  async function fetchBoardData(boardId){
    const docRef = doc(db, `/users/${uid}/boardsData/${boardId}`)

    try {
      const doc = await getDoc(docRef);
      if (doc.exists){
        return doc.data()
      }
    } catch (err){
      setToaster("Error fetching board data!", "error")
    }
  }

  async function createBoard({name, color}){
    try {
      const doc = await addDoc(boardsColRef, {
        name: name,
        color: color,
        createdAt: serverTimestamp()
      })
      addBoard({
        name: name, 
        color: color, 
        createdAt: new Date().toLocaleString('en-UK'),
        id: doc.id
      })
    } catch(err) {
      setToaster("Error creating board!", "error")
      throw err
    }
  }

  async function deleteBoard(boardId){
    const docRef = doc(db, `/users/${uid}/boards/${boardId}`)
    try {
      await deleteDoc(docRef)
      const tBoards = boards.filter((b) => b.id !== boardId)
      setBoards(tBoards)
      setToaster("Board deleted")
      navigate("/boards")
    } catch (err){
      setToaster("Error deleting the board", "error")
      throw err
    }
  }


  async function fetchBoards(setLoading){
    try {
      const q = query(boardsColRef, orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map(doc => (
        { ...doc.data(), 
          id: doc.id, 
          createdAt: doc.data().createdAt.toDate().toLocaleString('en-UK')
        }
      ))
      setBoards(boards)
    } catch(err) {
      setToaster("Error fetching user's boards data!", "error")
    } finally {
      if (setLoading) setLoading(false)
    }
  }

  return {
    createBoard,
    fetchBoards,
    fetchBoardData,
    updateBoardData,
    deleteBoard
  }
}