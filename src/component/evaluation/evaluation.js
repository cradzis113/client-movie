import { Card, CardContent, Typography, Box, Rating, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import fetchData from '../../utils/fetchData';
import truncateText from '../../utils/truncateText';
import calculateAverageScore from '../../utils/calculatorScore';

const SquareChip = ({ label }) => {
    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#b490ca',
                color: '#fff',
                borderRadius: '4px',
                padding: '4px 8px',
                marginRight: '8px',
                marginBottom: '8px',
                fontWeight: 'bold',
            }}
        >
            {label}
        </Box>
    );
};

const Evaluation = ({ data }) => {
    const [userRating, setUserRating] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    async function handleRating(event, newValue) {
        try {
            if (!localStorage.getItem(data._id)) {
                setUserRating(newValue);

                const newValueString = JSON.stringify({ score: newValue });
                localStorage.setItem(data._id, newValueString);

                await fetchData('post', 'user', 'rating', { id: data._id, score: newValue });
            }
        } catch (error) {
            console.error('Error in handleRating:', error);
        }
    }

    useEffect(() => {
        if (data) {
            const itemData = JSON.parse(localStorage.getItem(data._id));
            if (itemData) {
                setUserRating(itemData.score)
            }
        }
    }, [data])

    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'transparent' }}>
            <CardContent sx={{ padding: '16px 20px' }}>
                <Typography variant="h5" fontFamily={'-moz-initial'} >
                    {truncateText(data?.title, windowWidth)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    Release Date: {data?.createdAt}
                </Typography>
                <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, mt: 2 }}>
                    <Typography variant="body2" sx={{ marginRight: 1 }}>Tag:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {data?.tags.map((tag, index) => (
                            <div key={index}>
                                <SquareChip label={tag} />
                                {index !== data?.tags.length - 1 && <Divider orientation="vertical" sx={{ marginX: 1 }} />}
                            </div>
                        ))}
                    </Box>
                </Box>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Box
                        sx={{
                            display: 'inline-block',
                            backgroundColor: '#4facfe',
                            color: '#fff',
                            borderRadius: '4px',
                            padding: '8px 12px',
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            lineHeight: '1',
                            marginBottom: '8px'
                        }}
                    >
                        {calculateAverageScore(data?.score, data?.totalRating)}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ marginRight: 1 }}>
                            Your rating:
                        </Typography>
                        <Rating
                            name="userRating"
                            value={userRating}
                            precision={0.5}
                            readOnly={!!userRating}
                            onChange={handleRating}
                            sx={{ color: '#72afd3' }}
                        />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Total: {data?.totalRating} ratings
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default Evaluation;
