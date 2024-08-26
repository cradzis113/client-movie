import { Card, CardHeader, CardContent, CardActions, useMediaQuery, Avatar, Typography, CardMedia, Box, Divider, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import calculateAverageScore from '../../utils/calculatorScore';
import StarIcon from '@mui/icons-material/Star';
import HdOutlinedIcon from '@mui/icons-material/HdOutlined';

const MovieCard = ({ item, alt }) => {
    const is0 = useMediaQuery('(min-width:0px) and (max-width:379px)');
    const is540 = useMediaQuery('(min-width:540px) and (max-width:599px)');

    const is800 = useMediaQuery('(min-width:800px) and (max-width:899px)');
    const is1040 = useMediaQuery('(min-width:1040px) and (max-width:1109px)');

    const navigate = useNavigate()
    const is1280 = useMediaQuery('(min-width:1280px)');

    return (
        <Card sx={{ maxWidth: 345, margin: 'auto', marginTop: 2, position: 'relative' }}>
            <CardMedia
                component="img"
                height="200px"
                alt={alt}
                image={item.imageInfo.url}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/movie/${item.title}`)}
            />
            <Box sx={{ position: 'absolute', top: 182, left: 16, cursor: 'pointer' }}>
                <Avatar
                    aria-label="profile"
                    sx={{ bgcolor: 'gray', width: 35, height: 35 }}
                    src={item.imageInfo.url}
                    onClick={() => navigate(`/movie/${item.title}`)}
                />
            </Box>
            <CardHeader
                sx={{ paddingTop: 3, cursor: 'pointer' }}
                title={item.title}
                subheader={item.category}
                titleTypographyProps={{ variant: 'h6', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '300px', whiteSpace: 'nowrap' }}
                subheaderTypographyProps={{ variant: 'body2', sx: { marginTop: 1 } }}
                onClick={() => navigate(`/movie/${item.title}`)}
            />
            <CardContent sx={{ paddingTop: 0, cursor: 'pointer' }} onClick={() => navigate(`/movie/${item.title}`)}>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ fontWeight: 500, textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '300px', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}
                >
                    {item.description}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: 1 }}>
                {(is540 || is800 || is1040 || is1280 || is0) ? (
                    <Rating
                        value={calculateAverageScore(item.score, item.totalRating)}
                        readOnly
                        precision={0.1}
                        sx={{ color: '#72afd3' }}
                    />
                ) : (
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
                        <Typography variant="body2" sx={{ color: '#333' }}>
                            {calculateAverageScore(item.score, item.totalRating)}
                        </Typography>
                    </Box>
                )}
                <HdOutlinedIcon />
            </CardActions>
        </Card>
    );
};

export default MovieCard;
