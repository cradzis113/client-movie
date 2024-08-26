import React from 'react';
import { IconButton, Typography, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import ShareIcon from '@mui/icons-material/Share';

const ShareComponent = ({ shareCount }) => {
    const handleShare = () => {
        // Xử lý chức năng chia sẻ
        alert('Chức năng chia sẻ đã được kích hoạt!');
    };

    const handleFacebookShare = () => {
        // Xử lý chức năng chia sẻ Facebook
        alert('Chia sẻ qua Facebook đã được kích hoạt!');
    };

    const handleTwitterShare = () => {
        // Xử lý chức năng chia sẻ Twitter
        alert('Chia sẻ qua Twitter đã được kích hoạt!');
    };

    const handleTelegramShare = () => {
        // Xử lý chức năng chia sẻ Telegram
        alert('Chia sẻ qua Telegram đã được kích hoạt!');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" style={{ color: 'black', marginRight: '8px' }}>
                Chia sẻ ({100})
            </Typography>
            <div style={{ position: 'relative', top: 0, color: 'black' }}>
                <Divider orientation="vertical" flexItem sx={{ height: 20, backgroundColor: 'black', ml: 0.5 }} />
            </div>
            <IconButton onClick={handleFacebookShare} style={{ margin: '0 4px', color: '#3b5998' }}>
                <FacebookIcon />
            </IconButton>
            <IconButton onClick={handleTwitterShare} style={{ margin: '0 4px', color: '#1DA1F2' }}>
                <TwitterIcon />
            </IconButton>
            <IconButton onClick={handleTelegramShare} style={{ margin: '0 4px', color: '#0088cc' }}>
                <TelegramIcon />
            </IconButton>
            {/* Nút chia sẻ tùy chọn */}
            <IconButton aria-label="chia sẻ tùy chọn" onClick={handleShare}>
                <ShareIcon />
            </IconButton>
        </div>
    );
};

export default ShareComponent;
