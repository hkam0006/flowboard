import { Snackbar, Alert } from "@mui/material"
import useStore from "../../store"

export default function SnackbarManager() {
  const {setToaster, toasterMsg, severity} = useStore()

  if (!toasterMsg) return

  return (
    <Snackbar 
      message={toasterMsg}
      open={!!toasterMsg} 
      autoHideDuration={5000} 
      onClose={() => setToaster("", "")} 
    >
      {!!severity ? <Alert  onClose={() => setToaster("", "")} severity={severity} sx={{ width: '100%', textTransform: "capitalize" }} >
        {toasterMsg}
      </Alert> : null}
    </Snackbar>
  )
}
