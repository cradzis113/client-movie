import { useState, useEffect } from 'react';
import { Box, Paper, TextField, Select, MenuItem, Button, Checkbox, Alert, Fade, Typography, InputLabel, Grid, FormControl, Chip } from '@mui/material/';
import { categoryOptions, tagOptions } from '../../constant/constant';
import { useData } from '../../context/dataContext';
import FilterOutlinedIcon from '@mui/icons-material/FilterOutlined';
import AddCharacter from '../addCharacter/character';
import fetchData from '../../utils/fetchData';

function AddItem() {
    const [imageURL, setImageURL] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [responseData, setResponseData] = useState(null);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [movLink, setMovLink] = useState('');
    const [description, setDescription] = useState('');

    const [tags, setTags] = useState([]);
    const [dataMovie, setDataMovie] = useState([]);
    const [dataOfMovie, setDataOfMovie] = useState({});
    const [characterAvailble, setCharacterAvailble] = useState([])

    const [fade, setFade] = useState(false);
    const [clearData, setClearData] = useState(false)
    const [preventSubmit, setPreventSubmit] = useState(true)
    const { character, setResetData, setPreventAddCharacter } = useData();

    const handleFileChangem = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImageURL(imageURL);
            setImageFile(file);
        }
    };

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const handleIconClick = () => {
        document.getElementById('uploadInput').click();
    };

    const handleSubmit = async () => {
        setResetData(false)
        setClearData(false)
        setResponseData(false);
        setPreventSubmit(false)
        setPreventAddCharacter(true)

        if ((imageFile || imageURL) && ((category && category !== '') || (tags && tags.length > 0)) && videoFile && description && title) {
            const characterData = characterAvailble.map(char => ({ characterName: char.characterName, realName: char.realName, fileName: char.imageFile.name }));
            let formData = new FormData();

            if (characterData.length > 0) {
                character.forEach(element => {
                    formData.append('characterImage', element.imageFile);
                });
            }

            if (!movLink) {
                formData.append('image', imageFile);
                formData.append('category', category);
                formData.append('tags', tags);
                formData.append('video', videoFile);
                formData.append('description', description);
                formData.append('title', title);
                formData.append('movLink', movLink);
                formData.append('characterInfo', JSON.stringify(characterData));
            } else {
                formData.append('id', dataOfMovie._id)
                formData.append('video', videoFile)
                formData.append('characterInfo', JSON.stringify(characterData));
            }

            try {
                let data

                if (!movLink) {
                    data = await fetchData('post', 'admin', 'add-video', formData, true);
                } else {
                    data = await fetchData('post', 'admin', 'add-link-video', formData, true);
                }

                setResponseData(data);
                setFade(true);

                setTimeout(() => {
                    setClearData(true)
                    setResetData(true)
                    setPreventSubmit(true)
                    setPreventAddCharacter(false)
                }, 3000);
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    const handleClearTags = () => {
        setTags([]);
    };

    async function getData() {
        try {
            const data = await fetchData('get', 'user', 'getdata');
            setDataMovie(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function alert(alert) {
        switch (alert) {
            case 'Upload video thành công!':
                return <Alert severity="success">{responseData}</Alert>
            default:
                return <Alert severity="error">{responseData}</Alert>
        }
    }

    useEffect(() => {
        getData();
    }, [clearData]);

    useEffect(() => {
        if (character) {
            setCharacterAvailble(character)
        }
    }, [character])

    useEffect(() => {
        if (clearData) {
            setImageURL(null);
            setImageFile(null);
            setVideoFile(null);
            setResponseData(null);

            setTitle('');
            setCategory('');
            setMovLink('');
            setDescription('');

            setTags([]);
            setDataOfMovie({});
            setCharacterAvailble([]);

            setFade(false);
            setResponseData(false)
        }
    }, [clearData]);

    useEffect(() => {
        const dataFilter = dataMovie.find(item => item.title === movLink);
        setDataOfMovie(dataFilter);
    }, [movLink, dataMovie]);

    useEffect(() => {
        if (dataOfMovie?.category) {
            setCategory(dataOfMovie.category);
        }

        if (dataOfMovie?.description) {
            setDescription(dataOfMovie.description);
        }

        if (dataOfMovie?.title) {
            setTitle(dataOfMovie.title);
        }

        if (dataOfMovie?.title) {
            setTags(dataOfMovie.tags);
        }

        if (dataOfMovie?.imageInfo) {
            setImageURL(dataOfMovie.imageInfo.url)
        }

    }, [dataOfMovie]);

    return (
        <Box width={'100%'} borderRadius={2}>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} margin={'20px 20px'}>
                <Box mr={{ xs: 0, md: 3 }} mb={{ xs: 3, md: 0 }} width={{ xs: '100%', md: 300 }}>
                    <Paper elevation={10} sx={{ borderRadius: 2, opacity: !preventSubmit && 0.5 }}>
                        <Box sx={{ position: 'relative', borderRadius: 2, cursor: !preventSubmit ? 'auto' : 'pointer' }} width="100%" height={350}>
                            {imageURL && (
                                <img src={imageURL} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} onClick={handleIconClick} />
                            )}
                            <label htmlFor='uploadInput' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <FilterOutlinedIcon htmlColor='green' fontSize='large' />
                            </label>
                            <input
                                id='uploadInput'
                                type='file'
                                onChange={handleFileChangem}
                                accept="image/*"
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    opacity: 0,
                                    display: imageURL ? 'none' : 'block'
                                }}
                                disabled={!preventSubmit}
                            />
                        </Box>
                    </Paper>
                    <Typography variant='body1' mt={2} style={{ display: 'flex', justifyContent: 'center' }}>Upload image</Typography>
                </Box>
                <Box width={'100%'}>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    sx={{ mb: 2 }}
                                    variant='outlined'
                                    label='Title'
                                    size="small"
                                    fullWidth
                                    value={title}
                                    disabled={!!movLink}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Box>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6} md={6}>
                                            <FormControl fullWidth size='small'>
                                                <InputLabel>Chọn thể loại</InputLabel>
                                                <Select
                                                    label='Chọn thể loại'
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    variant="outlined"
                                                    size='small'
                                                    disabled={!!movLink}
                                                    MenuProps={{
                                                        PaperProps: {
                                                            style: {
                                                                maxHeight: 48 * 4.5 + 8, // Giới hạn chiều cao của danh sách
                                                                width: 250,
                                                            },
                                                        },

                                                    }}
                                                >
                                                    {categoryOptions.map((cat, index) => (
                                                        <MenuItem key={index} value={cat}>{cat}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <FormControl fullWidth size='small'>
                                                <InputLabel >Liên kết phim</InputLabel>
                                                <Select
                                                    label='Liên kết phim'
                                                    value={movLink}
                                                    onChange={(e) => setMovLink(e.target.value)}
                                                    variant="outlined"
                                                    size='small'
                                                    disabled={dataMovie.length === 0 && true}
                                                    MenuProps={{
                                                        PaperProps: {
                                                            style: {
                                                                maxHeight: 48 * 4.5 + 8, // Giới hạn chiều cao của danh sách
                                                                width: 250,
                                                            },
                                                        },

                                                    }}
                                                >
                                                    {dataMovie.map((item, index) => (
                                                        <MenuItem key={index} value={item.title}>{item.title}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    variant='outlined'
                                    label='Description'
                                    size="small"
                                    fullWidth
                                    multiline
                                    rows={3.4}
                                    disabled={!!movLink}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Grid container>
                                    <Grid item xs={12} md={12}>
                                        <Box display={'flex'}>
                                            <FormControl fullWidth>
                                                <InputLabel>Chọn tag</InputLabel>
                                                <Select
                                                    label='Chọn tag'
                                                    value={tags}
                                                    multiple
                                                    disabled={!!movLink}
                                                    onChange={(e) => setTags(e.target.value)}
                                                    variant="outlined"
                                                    size={tags.length > 0 ? 'small' : 'medium'}
                                                    renderValue={(selected) => (
                                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                            {selected.map((value) => (
                                                                <Chip key={value} label={value} style={{ margin: 2 }} />
                                                            ))}
                                                        </div>
                                                    )}
                                                    MenuProps={{
                                                        PaperProps: {
                                                            style: {
                                                                maxHeight: 48 * 3.5 + 14, // Giới hạn chiều cao của danh sách
                                                                width: 250,
                                                            },
                                                        },

                                                    }}
                                                >
                                                    {tagOptions.map((tagn, index) => (
                                                        <MenuItem key={index} value={tagn}>
                                                            <Checkbox checked={tags.indexOf(tagn) > -1} />
                                                            <Typography>{tagn}</Typography>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <Button variant="contained" color="secondary" onClick={handleClearTags} sx={{ ml: 2 }} disabled={tags.length === 0 || !preventSubmit}>Clear</Button>
                                            <Box ml={2}>
                                                <input
                                                    accept="video/*"
                                                    id="videoInput"
                                                    type="file"
                                                    onChange={handleVideoUpload}
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="videoInput">
                                                    <Button variant="contained" component="span" size="small" disabled={!preventSubmit} >
                                                        Upload video
                                                    </Button>
                                                </label>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Box mt={2} style={{ display: videoFile ? 'block' : 'none' }}>
                                        <TextField
                                            variant='outlined'
                                            label='Tên video'
                                            fullWidth
                                            size="small"
                                            value={videoFile ? videoFile.name : ''}
                                            disabled={!!videoFile}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    {responseData && (
                                        <Box mt={1}>
                                            <Fade in={fade} timeout={1000}>
                                                {alert(responseData)}
                                            </Fade>
                                        </Box>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={12} display={{ xs: 'none', md: 'block' }}>
                                    <Box mt={2}>
                                        <Button variant="outlined" color="primary" fullWidth onClick={handleSubmit} size="small" disabled={!((imageFile || imageURL) && category !== '' && tags.length > 0 && videoFile && description && title && preventSubmit)}>
                                            Submit
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <AddCharacter />
                            </Grid>
                            <Grid item xs={12} display={{ xs: 'block', md: 'none' }}>
                                <Button variant="outlined" color="primary" onClick={handleSubmit} fullWidth size="small" disabled={!((imageFile || imageURL) && category !== '' && tags.length > 0 && videoFile && description && title && preventSubmit)}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}

export default AddItem;
