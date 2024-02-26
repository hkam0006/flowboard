import {create} from 'zustand'

export const statusMap = {
  todo: "To Do",
  doing: "In Progress",
  done: "Completed"
}

const store = (set) => ({
  loader: true,
  isLogin: false,
  boards: [], 
  toasterMsg: "",
  toasterSeverity: "",
  setToaster: (toasterMsg, severity) => set({
    toasterMsg: toasterMsg, 
    severity: severity
  }),
  areBoardsFetched: false,
  addBoard: (board) => set(old => ({boards: [board, ...old.boards]})), 
  setBoards: (boards) => set({
    boards: boards,
    areBoardsFetched: true
  }),
  setLoginState: (status) => set({
    isLogin: status,
    loader: false,
    boards: [],
    areBoardsFetched: false
  }, false, "setLoginStatus")
})

const useStore = create(store);

export default useStore;