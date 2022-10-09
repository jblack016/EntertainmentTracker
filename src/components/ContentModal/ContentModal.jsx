import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import "./ContentModalStyle.css";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "80%",
    bgcolor: '#5d5d5d',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: "white",
};


export default function ContentModal({children, mediaType, id }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();



    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setContent(data);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div
                className="media"
                style={{ cursor: "pointer" }}
                color="inherit"
                onClick={handleOpen}
            >
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content &&
                        <Box sx={style}>
                            <div className='ContentModal'>
                                {/* Portrait mode */}
                                <img
                                    className='ContentModalPortrait'
                                    alt={content.name || content.title}
                                    src={
                                        content.poster_path ?
                                            `${img_500}/${content.poster_path}`
                                            : unavailable}
                                />
                                {/* Landscape mode */}
                                <img
                                    src={
                                        content.backdrop_path
                                            ? `${img_500}/${content.backdrop_path}`
                                            : unavailableLandscape
                                    }
                                    alt={content.name || content.title}
                                    className="ContentModalLandscape"
                                />
                                <div className='ContentModal_about'>
                                    <span className='ContentModal_title'>
                                        {content.name || content.title}(
                                        {(
                                            content.first_air_date ||
                                            content.release_date ||
                                            ""
                                        ).substring(0, 4)}
                                        )
                                    </span>
                                    {content.tagline && (
                                        <i className='tagline'>{content.tagline}</i>
                                    )}
                                    <span className='ContentModal_description'>
                                        {content.overview}
                                    </span>
                                </div>
                            </div>
                        </Box>
                    }
                </Fade>
            </Modal>
        </div>
    );
}
