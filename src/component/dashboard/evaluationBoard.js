import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import FilterTiltShiftOutlinedIcon from '@mui/icons-material/FilterTiltShiftOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const data = [
    { id: 1, title: "Item 1", category: "Category A", rating: 4.5 },
    { id: 2, title: "Item 2", category: "Category B", rating: 3.8 },
    { id: 3, title: "Item 3", category: "Category A", rating: 4.0 },
    { id: 4, title: "Item 4", category: "Category C", rating: 5.0 },
];

function EvaluationBoard() {
    return (
        <Box width='100%'>
            <Paper sx={{ width: '100%', py: 1 }} elevation={2}>
                <Box display={'flex'} justifyContent={'space-between'} sx={{ px: 2, py: 0.5 }}>
                    <Box display={'flex'} alignItems={"center"} >
                        <FilterTiltShiftOutlinedIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">Top items</Typography>
                    </Box>
                    <Box display={'flex'} alignItems={"center"} >
                        <CachedOutlinedIcon sx={{ mr: 1 }} />
                        <Typography variant="body1">View all</Typography>
                    </Box>
                </Box>
            </Paper>
            <Paper sx={{ width: '100%', mt: 2 }} elevation={2}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell >
                                        <AutoAwesomeIcon style={{ verticalAlign: 'middle', marginRight: 5 }} htmlColor='#f6d365' />
                                        <span style={{  marginTop: 1.5 }}>{item.rating}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default EvaluationBoard;
