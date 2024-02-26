import { Stack, Typography, Grid, IconButton, Box } from "@mui/material";
import OpenIcon from '@mui/icons-material/Launch';
import { colors } from "../theme/theme";

export default function BoardCard({name, createdAt, color, onOpen}) {
  return (
    <Grid item xs={12} sm={3}>
      <Stack p={3} bgcolor="background.paper" borderLeft="5px solid" borderColor={colors[color]}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box width="50%">
            <Typography flexGrow={1} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" fontWeight={400} variant="h6">{name}</Typography>
          </Box>
          <IconButton onClick={onOpen}><OpenIcon /></IconButton>
        </Stack>
        <Typography variant="caption">Created {createdAt}</Typography>
      </Stack>
    </Grid>
  )
}
