import { CircularProgress, Stack } from "@mui/material"

export default function AppLoader() {
  return (
    <Stack mt={10} alignItems="center">
      <CircularProgress />
    </Stack>
  )
}
