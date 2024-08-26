import { Footer, ContentWithRIDS, ContentWithRS, HeaderDesktop, HeaderMobile } from "../../component";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from "react";
import Container from '@mui/material/Container';
import useMediaQuery from "@mui/material/useMediaQuery";
import fetchData from "../../utils/fetchData";

function MainLayout() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const isMobile = useMediaQuery('(max-width:1024px)');

    async function getData() {
        try {
            const data = await fetchData('get', 'user', 'getdata');
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    const categorizedMovies = useMemo(() => {
        return data.reduce((acc, movie) => {
            if (!acc[movie.category]) {
                acc[movie.category] = [];
            }
            acc[movie.category].push(movie);
            return acc;
        }, {});
    }, [data]);
    
    useEffect(() => {
        getData();
    }, []);
    
    return (
        <Container maxWidth='xl'>
            {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
            <div style={{ marginTop: 80 }}>
                <ContentWithRS slickData={data}/>
            </div>
            <div style={{ marginTop: 20 }}>
                {Object.entries(categorizedMovies).map(([category, movies]) => {
                    let formattedCategory = category.toLowerCase();

                    if (formattedCategory === 'phim bộ') {
                        formattedCategory = 'phim-bo';
                    } else if (formattedCategory === 'phim rạp') {
                        formattedCategory = 'phim-rap';
                    } else if (formattedCategory === 'phim lẻ') {
                        formattedCategory = 'phim-le';
                    }

                    return (
                        <ContentWithRIDS
                            key={category}
                            category={category}
                            data={movies}
                            onClickCategory={() => navigate(`/${formattedCategory}`)}
                        />
                    );
                })}
            </div>
            <div style={{ marginTop: 10 }}>
                <Footer />
            </div>
        </Container>
    );
}

export default MainLayout;
