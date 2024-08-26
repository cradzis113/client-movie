import { Box, Paper, Typography } from "@mui/material";
import picture from "../../picture";

function WaitingHall() {
    // Lấy thời gian hiện tại
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // Xác định thời gian trong ngày
    let timeOfDay;
    if (currentHour >= 5 && currentHour < 12) {
        timeOfDay = "sáng";
    } else if (currentHour >= 12 && currentHour < 18) {
        timeOfDay = "chiều";
    } else {
        timeOfDay = "tối";
    }

    return (
        <Box margin={'0 auto'} sx={{ userSelect: 'none', position: 'relative' }}>
            <Paper elevation={2} style={{ padding: '20px', maxWidth: '600px', position: 'relative', top: '100%', transform: 'translateY(-26.5%)' }}>
                <Typography variant="h6" gutterBottom textAlign="center">
                    Chào mừng đến với dashboard
                </Typography>
                <Typography variant="body1" textAlign="center" mt={2}>
                    {`Buổi ${timeOfDay} vui vẻ nha Khánh!`}
                </Typography>
                <Box display="flex" justifyContent="center" marginTop={2}>
                    <img src={picture.pic2} width={400} alt="Hình ảnh minh họa" />
                </Box>
            </Paper>
        </Box>
    );
}

export default WaitingHall;
