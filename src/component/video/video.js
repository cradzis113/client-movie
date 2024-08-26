import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Hls from 'hls.js';
import Artplayer from 'artplayer';
import fetchData from '../../utils/fetchData';

function playM3u8(video, url, art) {
    if (Hls.isSupported()) {
        if (art.hls) art.hls.destroy();
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        art.hls = hls;
        art.on('destroy', () => hls.destroy());
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
    } else {
        art.notice.show = 'Unsupported playback format: m3u8';
    }
}

function Video({ data, name, _id }) {
    const { id, slug } = useParams();
    const [url, setUrl] = useState('');
    const request = useRef(false);
    const playerRef = useRef(null);

    async function updateView(_id) {
        try {
            await fetchData('post', 'user', 'view', { id: _id });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (data.length > 1 && name) {
            const findEpisode = data.find(item => item.episode.toLowerCase() === slug.replaceAll('-', ' '));
            setUrl(String(findEpisode.url));
        } else if (typeof data === 'object') {
            setUrl(String(data.url));
        }
    }, [data, id, slug, name]);


    useEffect(() => {
        let art = null;
        const playerRefCurrent = playerRef.current;

        if (playerRefCurrent) {
            art = new Artplayer({
                container: playerRefCurrent,
                url: url,
                playbackRate: true,
                setting: true,
                hotkey: true,
                fullscreen: true,
                customType: {
                    m3u8: playM3u8,
                },
            });

            art.on('video:timeupdate', async () => {
                const currentTime = Math.floor(art.currentTime);
                const duration = Math.floor(art.duration);

                if (!request.current && duration < 11) {
                    if (currentTime >= duration) {
                        request.current = true;
                        await updateView(_id)
                    }
                }

                if (!request.current && currentTime > 10) {
                    request.current = true;
                    await updateView(_id)
                }
            });

            art.on('video:ended', () => {
                request.current = false;
            });

            const handleTouchMove = (event) => {
                const offsetX = event.touches[0].pageX - playerRefCurrent.getBoundingClientRect().left;
                const percentage = offsetX / playerRefCurrent.offsetWidth;
                const progressPlayed = playerRefCurrent.querySelector('.art-progress-played');
                progressPlayed.style.width = `${percentage * 100}%`;

                const duration = art.duration;
                const newTime = duration * percentage;
                art.currentTime = newTime;
                art.controls.show = true;
            };

            playerRefCurrent.addEventListener('touchmove', handleTouchMove);

            return () => {
                if (art) {
                    art.destroy();
                    playerRefCurrent.removeEventListener('touchmove', handleTouchMove);
                }
            };
        }
    }, [url, _id]);

    return <div ref={playerRef} className="artplayer-app" style={{ aspectRatio: 16 / 9 }} />;
}

export default Video;
