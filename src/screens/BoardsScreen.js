import { Stack, Grid,  } from "@mui/material";
import TopBar from "../components/TopBar";
import CreateBoardModal from "../components/CreateBoardModal";
import { useEffect, useState } from "react";
import NoBoards from "../components/NoBoards";
import BoardCard from "../components/BoardCard";
import useApp from "../hooks/useApp";
import AppLoader from "../components/layout/AppLoader";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

export default function BoardsScreen() {
  const {fetchBoards} = useApp()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const {boards, areBoardsFetched} = useStore()
  const navigate = useNavigate();

  useEffect(() => {
    if (!areBoardsFetched) fetchBoards(setLoading)
    else setLoading(false)
  }, [])

  if (loading) return <AppLoader />

  return (
    <>
      <TopBar openModal={() => setShowModal(true)}/>
      {showModal && <CreateBoardModal closeModal={() => setShowModal(false)}/>}
      {boards.length === 0 ? <NoBoards /> : 
        <Stack my={5} mx={3}>
          <Grid container spacing={{sm: 4, xs: 2}}>
            {boards.map((brd, index) => (
              <BoardCard 
                key={index} 
                name={brd.name} 
                createdAt={brd.createdAt} 
                color={brd.color}
                onOpen={() => navigate(`/boards/${brd.id}`)}
              />
              ))
            }
          </Grid>
        </Stack>
      }
    </>
  )
}
