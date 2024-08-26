import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Divider, Grid, Avatar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function CustomTabs(props) {
    const { value, onChange, labels } = props;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {labels.map((label, index) => (
                <Button
                    key={index}
                    variant="contained"
                    onClick={() => onChange(index)}
                    style={{
                        backgroundColor: value === index ? '#434343' : 'transparent',
                        color: value === index ? '#fff' : '#000',
                        padding: '10px',
                        borderRadius: '4px',
                        marginRight: '10px',
                        marginBottom: '10px',
                    }}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
}

function EpisodeList({ episode, name }) {
    const navigate = useNavigate()
    const location = useLocation()

    function handleEpisodeNavigate(item) {
        const episodeOfNewName = item.episode.replaceAll(' ', '-').toLowerCase()

        if (location.pathname.split('/')[3] === episodeOfNewName) {
            return
        }

        if (name.includes(' ')) {
            const rename = name.replaceAll(' ', '-').toLowerCase()
            return navigate(`/movie/${rename}/${episodeOfNewName}`)
        }

        return navigate(`/movie/${name.toLowerCase()}/${episodeOfNewName}`)
    }

    return (
        <div>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Danh sách các tập phim</Typography>
            {episode?.length === 1 ? (
                <Typography variant="body1">Không có tập phim</Typography>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '15px' }}>
                    {episode?.map((item, index) => (
                        <Button
                            key={index}
                            variant="contained"
                            style={{
                                backgroundColor: '#8fd3f4',
                                color: 'white',
                                margin: '0px 10px 10px 0',
                                borderRadius: '4px',
                                transition: 'background-color 0.4s',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#fcb69f';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#8fd3f4';
                            }}
                            onClick={() => handleEpisodeNavigate(item)}
                        >
                            Tập {index + 1}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}

function MovieSummary({ info, views }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, paddingRight: '20px' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Tóm tắt</Typography>
                <Typography variant="body1">{info}</Typography>
            </div>
            <Typography 
                variant="body2" 
                sx={{ 
                    fontWeight: 'bold', 
                    color: '#555', 
                    padding: '5px 10px', 
                    backgroundColor: '#f0f0f0', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px' 
                }}
            >
                Lượt xem: {views}
            </Typography>
        </div>
    );
}


function ActorTab({ character }) {
    return (
        <div>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Diễn viên</Typography>
            {character === null ? (
                <Typography variant="body1">Không có thông tin về diễn viên</Typography>
            ) : (
                <Grid container spacing={2}>
                    {character.map((actor, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Box display="flex" alignItems="center" flexWrap="nowrap">
                                <Avatar src={actor.url} sx={{ marginRight: '10px', width: '100px', height: '100px', flexShrink: 0 }} />
                                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 700,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {actor.characterName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {actor.realName}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
}

export default function Tab({ data }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (index) => {
        setValue(index);
    };

    return (
        <div>
            <CustomTabs
                value={value}
                onChange={handleChange}
                labels={["Xem phim", "Thông tin", "Diễn viên"]}
            />
            <Divider sx={{ mt: 2 }} />
            <TabPanel value={value} index={0}>
                <EpisodeList episode={data[0]?.videoInfo.childVideoInfo} name={data[0]?.title} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MovieSummary info={data[0]?.description} views={data[0]?.view} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ActorTab character={data[0]?.character} />
            </TabPanel>
        </div>
    );
}
