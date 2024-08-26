import { Box, ButtonBase, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import fetchData from '../../utils/fetchData';
import InfoIcon from '@mui/icons-material/Info';
import 'react-lazy-load-image-component/src/effects/blur.css';
import getRandomElements from '../../utils/randomElement';

const MovieSearch = ({ initialData }) => {
    const [dataSuggest, setDataSuggest] = useState([])
    const navigate = useNavigate()

    function handleNavigate(data) {
        let regex = /\s/;
        const childVideoInfo = data.videoInfo.childVideoInfo
        const hanldeEpisodeSpacing = childVideoInfo[0].episode.replaceAll(' ', '-').toLowerCase()

        if (regex.test(data.title)) {
            const hanldeTitleSpacing = data.title.replaceAll(' ', '-').toLowerCase()

            if (childVideoInfo.length > 1) {
                return navigate(`/movie/${hanldeTitleSpacing}/${hanldeEpisodeSpacing}`)
            } else {
                return navigate(`/movie/${hanldeTitleSpacing}`)
            }
        } else {
            if (childVideoInfo.length > 1) {
                return navigate(`/movie/${data.title.toLowerCase()}/${hanldeEpisodeSpacing}`)
            } else {
                return navigate(`/movie/${data.title.toLowerCase()}`)
            }
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchData('get', 'user', 'getdata');
                const randomItem = getRandomElements(fetchedData, 6)
                setDataSuggest(randomItem);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData()
    }, [])

    return (
        <Box display="flex">
            <Paper elevation={2} sx={{ flex: 7, mr: 2, padding: 2 }}>
                <Typography variant="h5" gutterBottom fontFamily="cursive" textAlign="center">
                    Kết quả tìm kiếm:
                </Typography>
                {initialData.length > 0 ? (
                    <List>
                        {initialData.map((item, index) => (
                            <LazyLoad height={200} offset={100} threshold={0.95} key={index}>
                                <Box>
                                    <ListItem alignItems="center" >
                                        <ListItemAvatar sx={{ mr: 3 }}>
                                            <LazyLoadImage
                                                src={item.imageInfo.url}
                                                alt={String(index)}
                                                effect="blur"
                                                offset={100}
                                                style={{
                                                    width: 100, height: 100, cursor: 'pointer', borderRadius: '50%'
                                                }}
                                                onClick={() => handleNavigate(item)}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            components={ButtonBase}
                                            primary={
                                                <Typography variant="h6" fontFamily="cursive">
                                                    {item.title}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="subtitle2" fontFamily="cursive">
                                                    {item.description}
                                                </Typography>
                                            }
                                            sx={{ bgcolor: 'rgba(0, 0, 0, 0.011)', cursor: 'pointer' }}
                                            onClick={() => handleNavigate(item)}
                                        />
                                    </ListItem>
                                    {index < initialData.length - 1 && (
                                        <Divider
                                            variant="inset"
                                            component="li"
                                            sx={{
                                                marginLeft: 'calc(100px + 16px)',
                                                bgcolor: 'rgba(0, 0, 0, 0.12)', // Màu nền cho Divider
                                            }}
                                        />
                                    )}
                                </Box>
                            </LazyLoad>
                        ))}
                    </List>
                ) : (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 2,
                        marginTop: 2,
                    }}>
                        <InfoIcon sx={{ fontSize: 50, color: '#9e9e9e', mb: 1 }} />
                        <Typography variant="body1" fontFamily="cursive" textAlign="center">
                            Không có dữ liệu
                        </Typography>
                    </Box>
                )}
            </Paper>
            <Paper sx={{ flex: 3, padding: 2 }} elevation={2}>
                <Typography variant="h5" gutterBottom fontFamily="cursive" textAlign="center">
                    Phim đề xuất:
                </Typography>
                <List>
                    {dataSuggest.map((item, index) => (
                        <Box key={index}>
                            <ListItem alignItems="center">
                                <ListItemAvatar sx={{ mr: 3 }}>
                                    <LazyLoadImage
                                        src={item.imageInfo.url}
                                        alt={String(index)}
                                        effect="blur"
                                        offset={100}
                                        style={{
                                            width: 100, height: 100, cursor: 'pointer', borderRadius: '50%'
                                        }}
                                        onClick={() => handleNavigate(item)}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    components={ButtonBase}
                                    primary={
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                maxWidth: '200px',
                                                fontFamily: "cursive"
                                            }}>
                                            {item.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                maxWidth: '240px',
                                                fontFamily: "cursive"
                                            }}>
                                            {item.description}
                                        </Typography>
                                    }
                                    sx={{ bgcolor: 'rgba(0, 0, 0, 0.011)', cursor: 'pointer' }}
                                    onClick={() => handleNavigate(item)}
                                />
                            </ListItem>
                            {index < dataSuggest.length - 1 && (
                                <Divider
                                    variant="inset"
                                    component="li"
                                    sx={{
                                        marginLeft: 'calc(100px + 26px)',
                                        bgcolor: 'rgba(0, 0, 0, 0.12)',
                                    }}
                                />
                            )}
                        </Box>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default MovieSearch;
