import { Grid, Paper, Typography, Box } from "@mui/material";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';

function MonthlyStatus() {
  const paperData = [
    { title: "View hàng tháng", views: "5762", icon: <RemoveRedEyeOutlinedIcon /> },
    { title: "Rating hàng tháng", views: "5762", icon: <AutoAwesomeOutlinedIcon /> },
    { title: "Video upload hàng tháng", views: "5762", icon: <DriveFileMoveOutlinedIcon /> }
  ];

  return (
    <Box mb={3} width={'100%'}>
      <Grid container spacing={2}>
        {paperData.map((paper, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Paper elevation={2} sx={{ padding: '1rem', background: '#f0f0f0', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h6" sx={{ color: '#333', marginBottom: '1rem' }}>
                {paper.title} 
              </Typography>
              <Box display={'flex'} justifyContent={"space-between"} alignItems="center" marginTop={1}>
                <Typography>{paper.views}</Typography>
                {paper.icon}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MonthlyStatus;
