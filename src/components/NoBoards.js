import { Stack, Typography } from "@mui/material";

export default function NoBoards() {
  return (
    <Stack textAlign='center' mt={15}>
      <Typography variant="h5">
        No Boards created
      </Typography>
      <Typography variant="h6">
        Create your first board today.
      </Typography>
    </Stack>
  )
}
