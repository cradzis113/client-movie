import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Pagination,
    Typography,
    Tooltip,
    Checkbox,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Alert,
    Box,
    Switch,
} from '@mui/material';
import fetchData from '../../utils/fetchData';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import calculateAverageScore from '../../utils/calculatorScore';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const Catalogs = () => {
    const [page, setPage] = useState(1);
    const [videoToDelete, setVideoToDelete] = useState(null);

    const [data, setData] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [episodeSelected, setEpisodeSelected] = useState([]);

    const [unlink, setUnlink] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false);
    const [unlockSwitch, setUnlockSwitch] = useState(true);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const navigate = useNavigate();

    const startIndex = (page - 1) * 10;
    const endIndex = page * 10;
    const displayedVideos = data.slice(startIndex, endIndex);

    const getData = async () => {
        const fetchedData = await fetchData('get', 'user', 'getdata');
        setData(fetchedData);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedVideos = Array.from({ length: data.length }, (_, index) => index);
            setSelectedVideos(newSelectedVideos);
            return;
        }
        setSelectedVideos([]);
    };

    const handleVideoSelect = (event, index) => {
        const selectedIndex = selectedVideos.indexOf(index);
        let newSelectedVideos = [];

        if (selectedIndex === -1) {
            newSelectedVideos = newSelectedVideos.concat(selectedVideos, index);
        } else if (selectedIndex === 0) {
            newSelectedVideos = newSelectedVideos.concat(selectedVideos.slice(1));
        } else if (selectedIndex === selectedVideos.length - 1) {
            newSelectedVideos = newSelectedVideos.concat(selectedVideos.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedVideos = newSelectedVideos.concat(
                selectedVideos.slice(0, selectedIndex),
                selectedVideos.slice(selectedIndex + 1)
            );
        }

        setSelectedVideos(newSelectedVideos);
    };

    const handleEdit = (item) => {
        navigate(`/admin/edit-item/${item._id}`);
    };

    const handleDelete = (item) => {
        setVideoToDelete(item);
        setOpenDeleteDialog(true);
    }

    const handleCloseDialog = () => {
        setEpisodeSelected([]);
        setOpenDeleteDialog(false);
        setUnlockSwitch(true)
    }

    const handleSelectEpisode = (select) => {
        const episodes = videoToDelete.videoInfo.childVideoInfo;
        const firstEpisodeId = episodes[0]._id;
        const allEpisodeIds = episodes.map(episode => episode._id);

        if (select === firstEpisodeId && episodeSelected.length === 0) {
            setEpisodeSelected(allEpisodeIds);
        } else if (select === firstEpisodeId && episodeSelected.length === episodes.length) {
            setEpisodeSelected([]);
        } else if (episodeSelected.length === episodes.length) {
            const filteredSelected = episodeSelected.filter(item => item !== select && item !== firstEpisodeId);
            setEpisodeSelected(filteredSelected);
        } else if (!episodeSelected.includes(select)) {
            setEpisodeSelected([...episodeSelected, select]);
        } else if (episodeSelected.includes(select) && select !== firstEpisodeId) {
            const filteredSelected = episodeSelected.filter(item => item !== select);
            setEpisodeSelected(filteredSelected);
        } else if (select === firstEpisodeId && episodeSelected.length <= episodes.length && episodeSelected.includes(firstEpisodeId)) {
            setEpisodeSelected([]);
        }

        if (!episodeSelected.includes(firstEpisodeId) && select === firstEpisodeId) {
            setEpisodeSelected(allEpisodeIds);
        }
    }

    const handleDeleteConfirmed = async () => {
        if (selectedVideos.length > 0 && !videoToDelete) {
            const selectedData = selectedVideos.map((index) => {
                const childName = data[index].videoInfo.childVideoInfo.length > 1 && data[index].videoInfo.childVideoInfo.slice(1).map(child => child.url.split('/')[3]);
                if (childName) {
                    return {
                        childVideoName: childName,
                        id: data[index]._id,
                        imageName: data[index].imageInfo.name,
                        videoName: data[index].videoInfo.name,
                        character: JSON.stringify(data[index].character)
                    };
                } else {
                    return {
                        id: data[index]._id,
                        imageName: data[index].imageInfo.name,
                        videoName: data[index].videoInfo.name,
                        character: JSON.stringify(data[index].character)
                    };
                }
            });

            const dataRes = await fetchData('post', 'admin', 'delete-video', selectedData);

            if (dataRes.message) {
                setAlertOpen(true);
                getData(); // Refresh the data after deletion
            }
        }

        if (videoToDelete) {
            const { _id, imageInfo, videoInfo, character } = videoToDelete;
            const { name: imageName } = imageInfo;
            const { name: videoName, childVideoInfo } = videoInfo;

            let selectData = {
                id: _id,
                imageName,
                videoName,
                character,
                deleteMainRecord: true
            };

            const filteredVideoInfo = childVideoInfo.map(item => {
                if (episodeSelected.includes(item._id)) {
                    return {
                        nameChildVideo: item.url.split('/')[3],
                        idChildVideo: item._id
                    };
                }
                return null
            }).filter(item => item !== null);

            if (childVideoInfo.length > 1 && episodeSelected.length === childVideoInfo.length) {
                selectData.childVideoInfo = unlink ? filteredVideoInfo.slice(1) : filteredVideoInfo
                selectData.deleteMainRecord = unlink ? false : true
            } else if (childVideoInfo.length > 1 && episodeSelected.length !== childVideoInfo.length) {
                selectData.childVideoInfo = filteredVideoInfo
                selectData.deleteMainRecord = false
            }

            const dataRes = await fetchData('post', 'admin', 'delete-video', selectData)

            if (dataRes.message) {
                setAlertOpen(true);
                getData();
            }
        }

        setOpenDeleteDialog(false);
        setVideoToDelete(null);
        setSelectedVideos([]);
        setEpisodeSelected([]);
    };

    const handleDisabled = () => {
        if (!videoToDelete) return true;

        const { childVideoInfo } = videoToDelete.videoInfo;

        return childVideoInfo.length > 1 && episodeSelected.length === 0;
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (videoToDelete && videoToDelete.videoInfo.childVideoInfo.length > 1) {
            const childVideos = videoToDelete.videoInfo.childVideoInfo;
            const remainingEpisodes = childVideos.slice(1).length;

            if (remainingEpisodes === episodeSelected.length) {
                const episodeIds = childVideos.map(episode => episode._id);
                setEpisodeSelected(episodeIds);
            }

            if (episodeSelected.length === videoToDelete.videoInfo.childVideoInfo.length) {
                setUnlockSwitch(false)
            }
        }
    }, [episodeSelected, videoToDelete]);

    return (
        <div style={{ width: '100%', padding: '10px 10px' }}>
            {data.length < 1 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                        <SentimentDissatisfiedIcon color="action" style={{ fontSize: 50, marginBottom: '10px', color: '#f44336' }} />
                        <Typography variant="h6" color="textSecondary">
                            Không có dữ liệu
                        </Typography>
                    </Paper>
                </Box>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={selectedVideos.length > 0 && selectedVideos.length < data.length}
                                            checked={selectedVideos.length === data.length}
                                            onChange={handleSelectAllClick}
                                        />
                                    </TableCell>
                                    <TableCell align="left">Số thứ tự</TableCell>
                                    <TableCell align="left">Điểm Rating Video</TableCell>
                                    <TableCell align="left">Title</TableCell>
                                    <TableCell align="left">Category</TableCell>
                                    <TableCell align="left">View</TableCell>
                                    <TableCell align="left">Ngày Tạo</TableCell>
                                    <TableCell align="right">Hành Động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedVideos.map((data, index) => (
                                    <TableRow key={index}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedVideos.indexOf(startIndex + index) !== -1}
                                                onChange={(event) => handleVideoSelect(event, startIndex + index)}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{startIndex + index + 1}</TableCell>
                                        <TableCell align="left">
                                            <div style={{ whiteSpace: 'nowrap' }}>
                                                <AutoAwesomeIcon style={{ verticalAlign: 'middle', marginRight: 5 }} htmlColor="#f6d365" />
                                                <span style={{ verticalAlign: 'middle' }}>{calculateAverageScore(data.score, data.totalRating)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: 100 }}>
                                            <div style={{ whiteSpace: 'nowrap' }}>{data.title}</div>
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: 100 }}>
                                            <div style={{ whiteSpace: 'nowrap' }}>{data.category}</div>
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: 100 }}>
                                            <div style={{ whiteSpace: 'nowrap' }}>{data.view}</div>
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: 100 }}>
                                            <div style={{ whiteSpace: 'nowrap' }}>{data.createdAt}</div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Chỉnh sửa">
                                                <IconButton aria-label="Edit" onClick={() => handleEdit(data)}>
                                                    <EditIcon style={{ color: '#3f51b5' }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Xóa">
                                                <IconButton aria-label="Delete" onClick={() => handleDelete(data)}>
                                                    <DeleteIcon style={{ color: '#f44336' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ display: 'flex', marginTop: 10 }}>
                        {selectedVideos.length > 0 && <Button variant={'contained'} sx={{ mr: 1 }} onClick={handleDeleteConfirmed}>Xóa tất cả</Button>}
                        <div style={{ flex: 1 }}>
                            <Paper style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }} elevation={2}>
                                <Typography variant="body1" style={{ color: '#757575' }}>
                                    Trang {page} / {Math.ceil(data.length / 10)}
                                </Typography>
                                <Pagination
                                    count={Math.ceil(data.length / 10)}
                                    page={page}
                                    onChange={handleChangePage}
                                    showFirstButton
                                    showLastButton
                                    size="large"
                                    siblingCount={2}
                                    variant="outlined"
                                    shape="rounded"
                                    style={{ color: '#3f51b5' }}
                                />
                            </Paper>
                        </div>
                    </div>
                </>
            )}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Xác nhận xóa video?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText component={'div'} id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa video <strong>{videoToDelete?.title}</strong> không?
                        {videoToDelete?.videoInfo?.childVideoInfo?.length > 1 && (
                            <Box sx={{ mt: 0.5 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="p">Các tập phim:</Typography>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="p">Hủy liên kết phim:</Typography>
                                        <Switch
                                            disabled={unlockSwitch}
                                            inputProps={{ 'aria-label': 'Switch demo' }}
                                            onChange={() => setUnlink(!unlink)}
                                        />
                                    </div>
                                </div>
                                {videoToDelete.videoInfo.childVideoInfo.map((childVideo, childIndex) => (
                                    <div key={childIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox sx={{ mr: 1 }} checked={episodeSelected.includes(childVideo._id)} onChange={() => handleSelectEpisode(childVideo._id)} />
                                        <span>
                                            {childVideo.episode} {childVideo.episode === 'Episode 1' && '(Video chính)'}
                                        </span>
                                    </div>
                                ))}
                            </Box>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleDeleteConfirmed} color="primary" autoFocus disabled={handleDisabled()}>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={alertOpen} autoHideDuration={4000} onClose={() => setAlertOpen(false)}>
                <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Dữ liệu đã được xóa thành công!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Catalogs;
