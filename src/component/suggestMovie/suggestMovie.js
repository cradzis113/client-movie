import { Divider, Box, Chip, useMediaQuery } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import fetchData from '../../utils/fetchData';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import getRandomElements from '../../utils/randomElement';

const SuggestMovie = () => {
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 900px)');
    const isDesktop = useMediaQuery('(min-width:1024px)');
    const hideDot = useMediaQuery('(max-width:1104px)');

    const [dataSuggest, setDataSuggest] = useState([])

    const settings = {
        dots: hideDot ? false : true,
        infinite: false,
        arrows: false,
        speed: 500,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        // responsive: [
        //     {
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 3,
        //             slidesToScroll: 3,
        //         },
        //     },
        // ],
    };

    const fetchMoviesData = useCallback(async () => {
        const data = await fetchData('get', 'user', 'getdata');
        const randomItem = getRandomElements(data, 6);
        setDataSuggest(randomItem);
    }, []);
    

    useEffect(() => {
        fetchMoviesData();
    }, [fetchMoviesData]);

    return (
        <>
            <style>
                {` 
          .slick-list {
            margin: 0 -5px;
          }
        
          .slick-slide>div {
            padding: 0 5px;
          }
          
          .slick-slide div {
            outline: none;
          }
          `}
            </style>
            <div style={{ width: isTablet ? 250 : isDesktop ? 440 : 340, cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Divider sx={{ flexGrow: 1 }} />
                    <Chip label="Đề xuất" sx={{ backgroundColor: '#c2e59c', color: 'black', mx: '20px', fontSize: '1rem', padding: '4px 8px' }} />
                    <Divider sx={{ flexGrow: 1 }} />
                </Box>
                <Slider {...settings}>
                    {dataSuggest.map((item, index) => (
                        <div key={index}>
                            <img src={item.imageInfo.url} alt={index}
                                style={{
                                    width: '100%',
                                    height: 200,
                                    objectFit: 'cover',
                                    borderRadius: 10,
                                    boxShadow: '2px 1px 2px 0px rgba(0,0,0,0.75)'
                                }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default SuggestMovie;
