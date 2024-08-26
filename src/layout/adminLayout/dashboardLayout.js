import React from 'react';
import { Grid } from "@mui/material";
import EvaluationBoard from "../../component/dashboard/evaluationBoard";
import MonthlyStatus from '../../component/dashboard/monthlyStatus';
import VideoChart from '../../component/dashboard/rechart';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';

const annualRatingData = {
  2023: [
    { month: 'Jan', rating: 30 },
    { month: 'Feb', rating: 25 },
  ],
  2024: [
    { month: 'Jan', rating: 30 },
    { month: 'Feb', rating: 25 },
    { month: 'Mar', rating: 40 },
    { month: 'Apr', rating: 45 },
    { month: 'May', rating: 35 },
    { month: 'Jun', rating: 42 },
  ]
};
const annualViewData = {
  2023: [
    { month: 'Jan', view: 30 },
    { month: 'Feb', view: 25 },
    { month: 'Mar', view: 40 },
  ],
 
};

function Dashboard() {
  return (
    <div style={{ width: '100%', padding: 15 }}>
      <MonthlyStatus />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <EvaluationBoard />
        </Grid>
        <Grid item xs={12} md={6}>
          <EvaluationBoard />
        </Grid>
        <Grid item xs={12} md={6}>
          <VideoChart data={annualViewData} categoryData={'view'} icon={<ViewInArOutlinedIcon fontSize='small' />} />
        </Grid>
        <Grid item xs={12} md={6}>
          <VideoChart data={annualRatingData} categoryData={'rating'} icon={<ReviewsOutlinedIcon fontSize='small' />} />
        </Grid>
      </Grid>
    </div>
  ); 
}

export default Dashboard;
