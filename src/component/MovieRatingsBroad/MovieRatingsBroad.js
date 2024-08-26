import { Card, CardContent, CardMedia, Typography, Divider, Chip, Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import fetchData from '../../utils/fetchData';
import truncateText from '../../utils/truncateText';
import calculateAverageScore from '../../utils/calculatorScore';

const MovieRatingsBroad = () => {
    
    const [data, setData] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobileM = useMediaQuery('(min-width:350px) and (max-width:379px)');

    const getData = async () => {
        try {
            const fetchedData = await fetchData('get', 'user', 'getdata');
            const sortedData = fetchedData.sort((a, b) => b.score - a.score);
            const topScores = sortedData.slice(0, 4);
            setData(topScores);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <Chip label="Top phim" sx={{ backgroundColor: '#fcb69f', color: 'black', mx: '10px', fontSize: '1rem', padding: '4px 8px' }} />
                <Divider sx={{ flexGrow: 1 }} />
            </Box>
            {data.map((item, index) => (
                <Card key={index} style={{ display: 'flex', marginBottom: 10, cursor: 'pointer', position: 'relative' }}>
                    <CardMedia
                        style={{ width: isMobileM ? 100 : 120, height: isMobileM ? 100 : 120, objectFit: 'cover' }}
                        image={item.imageInfo.url}
                        title={item.title}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
                        <CardContent sx={{ position: 'relative', }}>
                            <Typography
                                variant="body1"
                                gutterBottom
                               fontFamily={'cursive'}
                            >
                                {truncateText(item.title, windowWidth)}
                            </Typography>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid #fcb69f',
                                    borderRadius: 2,
                                    padding: '4px 8px',
                                    mr: 2,
                                    backgroundColor: '#fff4e6',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <StarIcon sx={{ color: '#ff9800', mr: 0.5, fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ color: '#333' }}>{calculateAverageScore(item.score, item.totalRating)}</Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary">{item.createdAt}</Typography>
                            </div>
                        </CardContent>
                    </div>
                    <Box sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: '#fcb69f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                        border: '2px solid white',
                    }}>
                        <Typography variant="caption" sx={{ color: 'white', lineHeight: 1 }}>{index + 1}</Typography>
                    </Box>
                </Card>
            ))}
        </div>
    );
}

export default MovieRatingsBroad;
