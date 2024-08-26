import { Footer, ContentWithGrid, ContentWithRS, HeaderDesktop, HeaderMobile } from "../../component";
import Container from '@mui/material/Container';
import useMediaQuery from "@mui/material/useMediaQuery";
import fetchData from "../../utils/fetchData";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

function GridLayout() {
    const [data, setData] = useState([]);
    const location = useLocation();
    const [category, setCategory] = useState(null);
    const [dataFilter, setDataFilter] = useState([]);

    const convertPathToCategory = useCallback((pathname) => {
        switch (pathname) {
            case '/phim-bo':
                setCategory('Phim Bộ');
                break;
            case '/phim-le':
                setCategory('Phim Lẻ');
                break;
            case '/phim-rap':
                setCategory('Phim Rạp');
                break;
            default:
                setCategory(null);
                break;
        }
    }, []);

    const getData = useCallback(async () => {
        try {
            const data = await fetchData('get', 'user', 'getdata');
            setData(data);
            convertPathToCategory(location.pathname);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [location.pathname, convertPathToCategory]);

    useEffect(() => {
        getData();
    }, [getData]);

    useEffect(() => {
        const filter = data.filter(item => item.category === category);
        setDataFilter(filter);
    }, [data, category]);

    const isMobile = useMediaQuery('(max-width:1024px)');

    return (
        <Container maxWidth='xl'>
            {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
            <div style={{ marginTop: 80 }}>
                <ContentWithRS />
            </div>
            <div style={{ marginTop: 40 }}>
                <ContentWithGrid category={category} data={dataFilter} />
            </div>
            <div style={{ marginTop: 10 }}>
                <Footer />
            </div>
        </Container>
    );
}

export default GridLayout;
