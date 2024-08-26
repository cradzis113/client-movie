import { Box, Container, FormControl, Grid, TextField, Chip, Typography, Paper, Select, InputLabel, MenuItem, Button, Snackbar, Alert } from "@mui/material";
import { TransferList } from "../../component";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoryOptions, tagOptions } from "../../constant/constant";
import { useData } from "../../context/dataContext";
import AddCharacter from "../../component/addCharacter/character";
import fetchData from "../../utils/fetchData";

function EditLayout() {
    const [data, setData] = useState({});
    const [tag, setTag] = useState([]);
    const [characterAvailble, setCharacterAvailble] = useState([])

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

    const { id } = useParams();
    const { episode, character, setResetData, setPreventAddCharacter } = useData();
    const navigate = useNavigate();

    const handleChangeTitle = (e) => setTitle(e.target.value);
    const handleChangeDescription = (e) => setDescription(e.target.value);
    const handleChangeCategory = (e) => setCategory(e.target.value);

    const handleDeleteTag = (tagToDelete) => {
        setTag(tag.filter((tag) => tag !== tagToDelete));
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleChangeTag = (e) => {
        if (!tag.includes(e.target.value)) {
            setTag([...tag, e.target.value]);
        }
    };

    const handleSubmit = async () => {
        try {
            setResetData(false);
            setPreventAddCharacter(true);
            let formData = new FormData();

            const characterData = characterAvailble.map(char => {
                if (char.hasOwnProperty('_id')) {
                    return { id: char._id, fileName: char.fileName };
                } else {
                    return { characterName: char.characterName, realName: char.realName, fileName: char.imageFile.name };
                }
            });

            if (title && description && category && tag.length > 0) {
                if (characterData.some(item => !item.hasOwnProperty('id'))) {
                    characterAvailble.forEach(element => {
                        formData.append('characterImage', element.imageFile);
                    });
                }

                formData.append('id', id);
                formData.append('title', title);
                formData.append('description', description);
                formData.append('category', category);
                formData.append('tags', tag);
                formData.append('episode', episode);
                formData.append('childVideoInfo', JSON.stringify(data.videoInfo.childVideoInfo));
                formData.append('characterInfo', JSON.stringify(characterData));

                const result = await fetchData('post', 'admin', 'edit-video', formData, true);
                if (result) {
                    setSnackbar({ open: true, message: result.message, severity: 'success' });
                } else {
                    setSnackbar({ open: true, message: 'Update failed', severity: 'error' });
                }

                setResetData(true);
                setPreventAddCharacter(false);
            } else {
                setSnackbar({ open: true, message: 'Missing required fields', severity: 'warning' });
            }
        } catch (error) {
            console.error("Error during handleSubmit:", error);
            setSnackbar({ open: true, message: 'An error occurred. Please try again.', severity: 'error' });
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const data = await fetchData('get', 'user', 'getdata');
                const dataFilter = data.find(item => item._id === id);
                setData(dataFilter);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [id]);

    useEffect(() => {
        if (!loading) {
            const exists = data._id === id;
            if (!exists) {
                navigate('/err');
            }
        }
    }, [id, data, loading, navigate]);

    useEffect(() => {
        if (data.title) {
            setTitle(data.title);
        }

        if (data.description) {
            setDescription(data.description);
        }

        if (data.category) {
            setCategory(data.category);
        }

        if (data.tags) {
            setTag(data.tags);
        }
    }, [data]);

    useEffect(() => {
        if (character) {
            setCharacterAvailble(character)
        }
    }, [character])

    return (
        <Container maxWidth='lg'>
            <Box sx={{ mt: 3, mb: 2 }}>
                <Typography textAlign={'center'} mb={2.5} variant="h5">Edit item</Typography>
                <TextField fullWidth label='id' variant="outlined" value={id} disabled />
            </Box>
            <Box sx={{ display: { md: 'flex' } }}>
                {data?.videoInfo?.childVideoInfo.length > 2 && (
                    <Box mr={3}>
                        <TransferList data={data.videoInfo.childVideoInfo} />
                    </Box>
                )}
                <Box flex={1} mt={2}>
                    <FormControl fullWidth sx={{ mb: 2 }} >
                        <TextField
                            variant="outlined"
                            label={'title'}
                            value={title}
                            onChange={handleChangeTitle}
                            InputLabelProps={{
                                shrink: !!title
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            variant='outlined'
                            label='Description'
                            size="small"
                            fullWidth
                            multiline
                            rows={3.4}
                            value={description}
                            onChange={handleChangeDescription}
                            InputLabelProps={{
                                shrink: !!description
                            }}
                        />
                    </FormControl>
                    <div style={{ marginTop: 10 }}>
                        <Typography gutterBottom textAlign={'left'}>Tags:</Typography>
                        <Paper elevation={2} style={{ padding: '1rem', marginTop: 8 }}>
                            <Grid container spacing={1} alignItems="center">
                                {tag.map((tag, tagIndex) => (
                                    <Grid item key={tagIndex}>
                                        <Chip
                                            label={tag}
                                            onDelete={() => handleDeleteTag(tag)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </div>
                </Box>
            </Box>
            <Box my={3}>
                <AddCharacter defineComponent={EditLayout.name} id={id} />
            </Box>
            <Box mt={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="category-select">Category</InputLabel>
                            <Select
                                labelId="category-select"
                                label='Category'
                                value={category}
                                onChange={handleChangeCategory}
                            >
                                {categoryOptions.map((item, index) => (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="tag-select">Tag</InputLabel>
                            <Select
                                labelId="tag-select"
                                label='Tag'
                                value={''}
                                onChange={(e) => handleChangeTag(e)}
                            >
                                {tagOptions.map((item, index) => (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handleSubmit} disabled={tag.length === 0}>Submit</Button>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default EditLayout;
