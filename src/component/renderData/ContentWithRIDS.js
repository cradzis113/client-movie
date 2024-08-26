import { Box, Typography, useMediaQuery, Button } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ScrollContainer from 'react-indiana-drag-scroll';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ContentWithResponsiveImageDisplay = ({ data, category, onClickCategory }) => {
    const navigate = useNavigate();
    const isMobileSmall = useMediaQuery('(max-width:320px)');
    const isTablet = useMediaQuery('(min-width:426px) and (max-width:768px)');
    const isLaptop = useMediaQuery('(min-width:769px) and (max-width:1024px)');
    const isMobileMedium = useMediaQuery('(min-width:321px) and (max-width:375px)');
    const isMobileLarge = useMediaQuery('(min-width:376px) and (max-width:425px)');

    const calculateHeight = useMemo(() => {
        if (isMobileSmall) return 120;
        if (isMobileMedium) return 147;
        if (isMobileLarge) return 169;
        if (isTablet) return 226;
        if (isLaptop) return 147;
        return 225;
    }, [isMobileSmall, isMobileMedium, isMobileLarge, isTablet, isLaptop]);

    const calculateWidth = useMemo(() => {
        if (isMobileSmall) return 86;
        if (isMobileMedium) return 105;
        if (isMobileLarge) return 121;
        if (isTablet) return 162;
        if (isLaptop) return 105;
        return 150;
    }, [isMobileSmall, isMobileMedium, isMobileLarge, isTablet, isLaptop]);

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

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#b490ca', marginRight: '8px' }}>|</Typography>
                <Typography variant="h5" sx={{ color: '#330867', mb: 0.25 }}>{category}</Typography>
                <Box sx={{ marginLeft: 'auto', marginRight: '16px' }}>
                    {data.length > 8 && <Button variant="contained" color="secondary" size="small" onClick={onClickCategory}>Xem thêm</Button>}
                </Box>
            </Box>
            <ScrollContainer
                hideScrollbars='false'
                horizontal={true}
                vertical={false}
                className="scroll-container"
                style={{
                    scrollbarWidth: 'thin',
                    WebkitOverflowScrolling: 'touch',
                    marginBottom: '16px',
                }}
            >
                <Box sx={{ display: 'flex', }}>
                    {data.map((item, index) => (
                        <Box
                            key={index}
                            sx={{ position: 'relative', marginRight: 2, marginBottom: 2, cursor: 'pointer' }}
                        >
                            <LazyLoadImage
                                src={item.imageInfo.url}
                                alt={item.title}
                                effect="blur"
                                style={{
                                    width: calculateWidth,
                                    height: calculateHeight,
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                    border: '2px solid #ddd',
                                }}
                                onClick={() => handleNavigate(item)}
                            />
                            <Box
                                sx={{
                                    color: 'black',
                                    padding: '4px',
                                    textAlign: 'center',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: calculateWidth,
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    sx={{ color: 'inherit', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                    onClick={() => handleNavigate(item)}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ color: 'inherit', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                >
                                    {item.createdAt}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </ScrollContainer>
        </div>
    );
};

export default ContentWithResponsiveImageDisplay;
