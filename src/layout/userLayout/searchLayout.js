import { HeaderDesktop, HeaderMobile, MovieSearch, Footer } from "../../component";
import { Container, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";

function SearchLayout() {
    const isMobile = useMediaQuery('(max-width:1024px)');
    const { state } = useLocation()

    return (
        <Container maxWidth='xl'>
            <div style={{ marginTop: 80 }}>
                {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
            </div>
            <div style={{ marginBottom: 20}}>
                <MovieSearch initialData={state} />
            </div>
            <div style={{ marginTop: 10 }}>
                <Footer />
            </div>
        </Container>
    )
}

export default SearchLayout