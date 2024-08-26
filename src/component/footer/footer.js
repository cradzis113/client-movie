import React from 'react';
import { Box, Typography,IconButton, Grid } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#a8edea',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item>
          <IconButton color="inherit">
            <Facebook sx={{ color: '#3b5998' }} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="inherit">
            <Twitter sx={{ color: '#1da1f2' }} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="inherit">
            <LinkedIn sx={{ color: '#0077b5' }} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="inherit">
            <Instagram sx={{ color: '#c32aa3' }} />
          </IconButton>
        </Grid>
      </Grid>
      {/* <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item>
          <Link href="#" color="inherit">
            Home
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" color="inherit">
            About
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" color="inherit">
            Services
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" color="inherit">
            Team
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" color="inherit">
            Contact
          </Link>
        </Grid>
      </Grid> */}
      <Typography variant="body2" color="inherit" sx={{ textAlign: 'center' }}>
        &copy;2024 Bpxx
      </Typography>
    </Box>
  );
};

export default Footer;
