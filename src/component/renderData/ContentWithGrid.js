import { Grid, Divider, Box, Chip, Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import MovieCard from '../movieCard/movieCard';

const itemsPerPage = 18;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 380,
      md: 600,
      lg: 900,
      xl: 1110,
    },
  },
});

const ContentWithGrid = ({ category, data }) => {
  const [page, setPage] = useState(1);
  const isXL = useMediaQuery('(min-width:1440px)');

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '20px' }}>
        <Chip label={category} sx={{ backgroundColor: '#a9a6ab', color: 'black', marginLeft: '10px', fontSize: '1.2rem', padding: '8px 16px', mr: 2 }} />
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Grid container spacing={1}>
        <ThemeProvider theme={theme}>
          {paginatedData.map((item, index) => (
            <Grid
              key={index}
              item
              xl={!isXL ? 2.4 : 2}
              lg={3}
              md={4}
              sm={6}
              xs={12}
            >
              <MovieCard item={item} alt={String(index)} />
            </Grid>
          ))}
        </ThemeProvider>
      </Grid>
      {data.length > 18 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination count={Math.ceil(data.length / itemsPerPage)} page={page} onChange={handleChange} />
        </Box>
      )}
    </>
  );
}

export default ContentWithGrid;
