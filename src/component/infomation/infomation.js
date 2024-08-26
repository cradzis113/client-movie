import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating } from '@mui/material';

const SquareChip = ({ label }) => {
    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#b490ca', // Màu nền của chip
                color: '#fff', // Màu chữ của chip
                borderRadius: '4px', // Độ cong của góc (có thể điều chỉnh)
                padding: '4px 8px', // Kích thước nội dung bên trong
                marginRight: '8px', // Khoảng cách với các chip khác (có thể điều chỉnh)
                marginBottom: '8px', // Khoảng cách với các dòng khác (có thể điều chỉnh)
                fontWeight: 'bold', // Độ đậm của chữ
            }}
        >
            {label}
        </Box>
    );
};

const Infomation = ({ score, tags, totalRatings }) => {

    const [userRating, setUserRating] = useState(0);
    const title = "Inception";
    const date = "2010";
    const imageUrl = "https://via.placeholder.com/300x150"; 

    return (
            <Card sx={{ display: 'flex', overflowX: 'auto' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 200, height: 'auto' }}
                    image={imageUrl}
                    alt={title}
                />
                <CardContent sx={{ flex: 1, padding: '16px 20px' }}>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                        Release Date: {date}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                        <Typography variant="body2" sx={{ marginRight: 1 }}>Tag:</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {tags.map((tag, index) => (
                                <SquareChip key={index} label={tag} />
                            ))}
                        </Box>
                    </Box>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
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
                                marginRight: '8px' 
                            }}
                        >
                            {score}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ marginRight: 1 }}>
                                Rating:
                            </Typography>
                            <Rating
                                name="userRating"
                                value={userRating}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setUserRating(newValue);
                                }}
                                sx={{ color: '#72afd3' }} // Thay đổi màu của rating
                            />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            ({totalRatings} ratings)
                        </Typography>
                    </div>
                </CardContent>
            </Card>
    );
};

export default Infomation;
