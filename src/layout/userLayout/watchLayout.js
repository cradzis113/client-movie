import { Evaluation, Footer, HeaderDesktop, SuggestMovie, HeaderMobile, Share, Tab, Video, MovieRatingsBroad } from "../../component";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import { useEffect, useState, useCallback } from "react";

function WatchLayout() {
    const isSmall = useMediaQuery('(max-width:1023px)');
    const isLarge = useMediaQuery('(min-width:1024px)');
    const isSmallRating = useMediaQuery('(min-width:350px) and (max-width:1023px)');

    const [data, setData] = useState([]);
    const [dataVideo, setDataVideo] = useState([]);

    const { id, slug } = useParams();

    const getData = useCallback(async () => {
        const data = await fetchData('post', 'user', 'movie', { title: id });
        setData(data);
    }, [id]);

    useEffect(() => {
        getData();
    }, [getData]);

    useEffect(() => {
        if (slug && id && data[0]?.videoInfo.childVideoInfo.length > 1) {
            setDataVideo(data[0].videoInfo.childVideoInfo)
        } else if (id && data[0]?.videoInfo.childVideoInfo.length === 1) {
            setDataVideo(data[0].videoInfo.childVideoInfo[0])
        }
    }, [id, slug, data])

    return (
        <Container maxWidth="xl">
            {isSmall ? <HeaderMobile /> : <HeaderDesktop />}
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '7', marginTop: 70 }}>
                    <Video data={dataVideo} name={data[0]?.videoInfo.name} _id={data[0]?._id}/>
                    <div style={{ marginTop: 20 }}>
                        <Tab data={data} />
                    </div>
                    <Evaluation data={data[0]} />
                    <div style={{ marginTop: 10 }}>
                        <Share />
                    </div>
                    {isSmallRating && (
                        <MovieRatingsBroad />
                    )}
                </div>
                {isLarge && (
                    <div style={{ flex: '3', marginLeft: 10, marginTop: 70 }}>
                        <MovieRatingsBroad />
                        <SuggestMovie />
                    </div>
                )}
            </div>
            <div style={{ marginTop: isSmall ? 5 : 10 }}>
                <Footer />
            </div>
        </Container>
    );
}

export default WatchLayout;
