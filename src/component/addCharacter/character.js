import { useEffect, useRef, useState } from 'react';
import { Box, Paper, TextField, Button, Typography, useMediaQuery, Divider, Avatar, IconButton, Switch, FormControlLabel } from '@mui/material/';
import { useData } from '../../context/dataContext';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AvatarGroup from '@mui/material/AvatarGroup';
import fetchData from '../../utils/fetchData';

function AddCharacter({ defineComponent, id }) {
    const [characterName, setCharacterName] = useState('');
    const [realName, setRealName] = useState('');

    const [characterImage, setCharacterImage] = useState(null);
    const [characterImageFile, setCharacterImageFile] = useState(null);

    const [data, setData] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [uploadedImageNames, setUploadedImageNames] = useState([]);

    const prevDataRef = useRef([]);
    const prevCharacterRef = useRef([]);

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const maxColumns = isSmallScreen ? 2 : 5;
    const [switchDelete, setSwitchDelete] = useState(false);

    let { character, setCharacter, resetData, preventAddCharacter } = useData();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (uploadedImageNames.includes(file.name) && file !== characterImageFile) {
                alert('Image with the same name already exists');
                return;
            }
            const imageURL = URL.createObjectURL(file);
            setCharacterImageFile(file);
            setCharacterImage(imageURL);
            setUploadedImageNames([...uploadedImageNames, file.name]);
        }
    };

    const handleSubmit = () => {
        if (!characterName || !realName || !characterImage) {
            alert('Please fill in all fields');
            return;
        }
    
        const isCharacterExists = characters.some(character => character.characterName === characterName || character.realName === realName);
    
        if (isCharacterExists) {
            alert('Character name or real name already exists');
            return;
        }
    
        const newCharacterLocal = { characterName, realName, url: characterImage };
        const newCharacter = { characterName, realName, imageFile: characterImageFile };
    
        setCharacters([...characters, newCharacterLocal]);
        setCharacter([...character, newCharacter]);
        setCharacterName('');
        setRealName('');
        setCharacterImage(null);
        setCharacterImageFile(null);
    };
    

    const handleDeleteCharacter = (index) => {
        const updatedCharacters = [...characters];
        updatedCharacters.splice(index, 1);
        setCharacters(updatedCharacters);

        const updatedCharacter = [...character];
        updatedCharacter.splice(index, 1);
        setCharacter(updatedCharacter);
    };

    const getData = async () => {
        try {
            const fetchedData = await fetchData('get', 'user', 'getdata');
            setData(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (resetData) {
            setUploadedImageNames([]);
            setCharacters([]);
            setCharacterImageFile(null);
            setCharacterImage(null);
            setRealName('');
            setCharacterName('');
            setCharacter([]);
            setSwitchDelete(false)
        }
    }, [resetData, setCharacter]);

    useEffect(() => {
        if (defineComponent) {
            getData();
        }
    }, [defineComponent, data]);

    useEffect(() => {
        const dataFilter = data.find(item => item._id === id && item.character !== null);
        if (JSON.stringify(prevDataRef.current) !== JSON.stringify(data) && dataFilter) {
            const { character: fetchedCharacters } = dataFilter;
            prevDataRef.current = data;
            prevCharacterRef.current = fetchedCharacters;
        }
    }, [data, switchDelete, id, characters]);

    useEffect(() => {
        if (switchDelete) {
            setCharacters(prevCharacterRef.current);
            setCharacter(prevCharacterRef.current);
        } else {
            setCharacters([]);
            setCharacter([]);
        }
    }, [switchDelete, setCharacter]);

    return (
        <Box width={'100%'}>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center">
                    <Box mr={{ xs: 0, md: 2 }} mb={{ xs: 2, md: 0 }}>
                        <Paper elevation={10} sx={{ borderRadius: 2, opacity: (switchDelete || preventAddCharacter) && 0.6 }}>
                            <Box sx={{ position: 'relative', borderRadius: 2 }} width={130} height={130}>
                                {characterImage && (
                                    <img src={characterImage} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                                )}
                                <label htmlFor='characterUploadInput' style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                                    <AddIcon color="primary" fontSize="large" />
                                </label>
                                <input
                                    id='characterUploadInput'
                                    type='file'
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0,
                                        cursor: (switchDelete || preventAddCharacter) ? 'auto' : 'pointer'
                                    }}
                                    disabled={switchDelete || preventAddCharacter}
                                />
                            </Box>
                        </Paper>
                    </Box>
                    <Box width="100%">
                        <Box mb={1}>
                            <TextField
                                variant='outlined'
                                label='Character Name'
                                size="small"
                                fullWidth
                                value={characterName}
                                disabled={switchDelete || preventAddCharacter}
                                onChange={(e) => setCharacterName(e.target.value)}
                            />
                        </Box>
                        <Box mb={1}>
                            <TextField
                                variant='outlined'
                                label='Real Name'
                                size="small"
                                fullWidth
                                value={realName}
                                disabled={switchDelete || preventAddCharacter}
                                onChange={(e) => setRealName(e.target.value)}
                            />
                        </Box>
                        <Box display={'flex'}>
                            {defineComponent && (
                                <FormControlLabel control={<Switch checked={switchDelete}/>} label='Xóa' onChange={() => setSwitchDelete(!switchDelete)} disabled={prevCharacterRef.current.length === 0} />
                            )}
                            <Button variant="outlined" color="primary" onClick={handleSubmit} fullWidth disabled={switchDelete || preventAddCharacter}>
                                Add Character
                            </Button>
                        </Box>
                    </Box>
                </Box>
                {characters.length > 0 && (
                    <div>
                        <Divider sx={{ my: 3 }} />
                        <Box mt={3} display="flex" justifyContent="center">
                            {characters.length > 4 ? (
                                <AvatarGroup max={4}>
                                    {characters.map((character, index) => (
                                        <Avatar key={index} alt={character.characterName} src={character.url}>
                                            <IconButton onClick={() => handleDeleteCharacter(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Avatar>
                                    ))}
                                </AvatarGroup>
                            ) : (
                                characters.map((character, index) => (
                                    <Box key={index} display="flex" flexDirection="column" alignItems="center" mr={1} width={`${100 / maxColumns}%`}>
                                        <img src={character.url} alt={character.characterName} style={{ width: 50, height: 50, marginBottom: 5, borderRadius: '50%' }} />
                                        <Typography variant="body2">{character.characterName}</Typography>
                                        <Typography variant="caption" color="textSecondary">{character.realName}</Typography>
                                        <IconButton onClick={() => handleDeleteCharacter(index)} disabled={preventAddCharacter}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))
                            )}
                        </Box>
                    </div>
                )}
            </Paper>
        </Box>
    );
}

export default AddCharacter;
