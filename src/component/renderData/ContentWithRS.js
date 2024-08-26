import { Typography, Divider, Box, useMediaQuery, Chip } from "@mui/material";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import getRandomElements from "../../utils/randomElement";
import fetchData from "../../utils/fetchData";
import Slider from "react-slick";

export default function ContentWithResponsiveSlider({ slickData }) {
  const isExtraSmall = useMediaQuery('(max-width: 330px)');
  const isExtraSmallLandscape = useMediaQuery('(max-width: 317px)');

  const isTablet = useMediaQuery('(min-width: 601px) and (max-width: 768px)');
  const isMobileSmall = useMediaQuery('(min-width: 331px) and (max-width: 400px)');

  const isMobileLarge = useMediaQuery('(min-width: 501px) and (max-width: 600px)');

  const isMobileMedium = useMediaQuery('(min-width: 401px) and (max-width: 500px)');
  const isMediumDesktop = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const slick = useRef(null);
  const navigate = useNavigate();

  const [moviesData, setMoviesData] = useState([]);
  const [clickDisabled, setClickDisabled] = useState(false);
  const [visibleItemsMain, setVisibleItemsMain] = useState(3);

  const sliderSettings = useMemo(() => ({
    dots: true,
    speed: 500,
    arrows: false,
    infinite: false,
    autoplay: true,
    lazyLoad: true,
    slidesToShow: visibleItemsMain,
    slidesToScroll: visibleItemsMain,
    beforeChange: () => setClickDisabled(true),
    afterChange: () => setClickDisabled(false),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: moviesData.length === 1 ? 1 : 2,
          slidesToScroll: moviesData.length === 1 ? 1 : 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }), [visibleItemsMain, moviesData.length]);

  const calculateMaxWidth = useMemo(() => {
    if (isTablet) return 140;
    if (isMobileLarge) return 200;
    if (isMobileMedium) return 160;
    if (isMobileSmall) return 130;
    if (isExtraSmall) return 100;
    if (isMediumDesktop) return 160;
    return 160;
  }, [isTablet, isMobileLarge, isMobileMedium, isMobileSmall, isExtraSmall, isMediumDesktop]);

  const calculateMaxHeight = useMemo(() => {
    if (isTablet) return 350;
    if (isMobileLarge) return 300;
    if (isMobileMedium) return 230;
    if (isMobileSmall) return 180;
    if (isExtraSmall) return 150;
    if (isMediumDesktop) return 380;
    return 450;
  }, [isTablet, isMobileLarge, isMobileMedium, isMobileSmall, isExtraSmall, isMediumDesktop]);

  function handleNavigate(data) {
    if (clickDisabled) return;

    let regex = /\s/;
    const childVideoInfo = data.videoInfo.childVideoInfo;
    const handleEpisodeSpacing = childVideoInfo[0].episode.replaceAll(' ', '-').toLowerCase();

    if (regex.test(data.title)) {
      const handleTitleSpacing = data.title.replaceAll(' ', '-').toLowerCase();

      if (childVideoInfo.length > 1) {
        return navigate(`/movie/${handleTitleSpacing}/${handleEpisodeSpacing}`);
      } else {
        return navigate(`/movie/${handleTitleSpacing}`);
      }
    } else {
      if (childVideoInfo.length > 1) {
        return navigate(`/movie/${data.title.toLowerCase()}/${handleEpisodeSpacing}`);
      } else {
        return navigate(`/movie/${data.title.toLowerCase()}`);
      }
    }
  }

  useEffect(() => {
    async function fetchMoviesData() {
      const data = await fetchData('get', 'user', 'getdata');
      const randomItem = getRandomElements(data, 9)
      setMoviesData(randomItem);
    }

    if (!slickData) {
      fetchMoviesData();
    }
  }, [slickData]);

  useEffect(() => {
    const calculateVisibleItems = () => {
      if (moviesData.length === 1) {
        setVisibleItemsMain(1);
      } else if (moviesData.length === 2) {
        setVisibleItemsMain(2);
      } else {
        setVisibleItemsMain(3);
      }
    };

    calculateVisibleItems();
  }, [moviesData]);

  return (
    <>
      <style>
        {` 
        .slick-list {
          margin: 0 -3.5px;
        }

        .slick-slide>div {
          padding: 0 3.5px;
        }
        
        .slick-slide div {
          outline: none;
        }
        `}
      </style>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Chip label="Đề xuất" sx={{ backgroundColor: '#a9a6ab', color: 'black', mx: '20px', fontSize: '1.2rem', padding: '8px 16px' }} />
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Slider
        ref={slick}
        {...sliderSettings}
        style={{ marginBottom: 30, paddingBottom: isExtraSmallLandscape ? 30 : 10 }}
      >

        {slickData ? (
          slickData.map((movie, index) => (
            <div key={index} style={{ position: "relative", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }} onClick={() => handleNavigate(movie)}>
              <img
                style={{
                  width: '100%',
                  height: moviesData.length === 1 ? 'auto' : '300px',
                  objectFit: "cover",
                  maxHeight: calculateMaxHeight,
                  borderRadius: 10,
                  boxShadow: "3px 2px 4px rgba(0, 0, 0, 0.5)",
                  cursor: 'pointer'
                }}
                src={movie.imageInfo.url}
                alt={`movie-${index}`}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  color: "white",
                  marginLeft: 30,
                  maxWidth: calculateMaxWidth,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography variant="body1" noWrap>{movie.title}</Typography>
                <Typography variant="subtitle2" noWrap>{movie.createdAt}</Typography>
              </div>
            </div>
          ))
        ) : (
          moviesData.map((movie, index) => (
            <div key={index} style={{ position: "relative", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }} onClick={() => handleNavigate(movie)}>
              <img
                style={{
                  width: '100%',
                  height: moviesData.length === 1 ? 'auto' : '300px',
                  objectFit: "cover",
                  maxHeight: calculateMaxHeight,
                  borderRadius: 10,
                  boxShadow: "3px 2px 4px rgba(0, 0, 0, 0.5)",
                  cursor: 'pointer'
                }}
                src={movie.imageInfo.url}
                alt={`movie-${index}`}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  color: "white",
                  marginLeft: 30,
                  maxWidth: calculateMaxWidth,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography variant="body1" noWrap>{movie.title}</Typography>
                <Typography variant="subtitle2" noWrap>{movie.createdAt}</Typography>
              </div>
            </div>
          ))
        )}
      </Slider >
    </>
  );
}
