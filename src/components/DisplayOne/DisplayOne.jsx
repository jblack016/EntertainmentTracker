import React from 'react'
import { img_300, unavailable } from '../../config/config'
import '../DisplayOne/DisplayOneStyle.css'
import { Badge } from '@mui/material'
import ContentModal from "../ContentModal/ContentModal"

const DisplayOne = ({
    id,
    poster,
    title,
    date,
    mediaType,
    rating
}) => {

    return (
        <ContentModal mediaType={mediaType} id={id}>
            <Badge badgeContent={rating} color={rating > 6 ? "primary" : "secondary"} />
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className='title'>{title}</b>
            <span className='subTitle'>{mediaType === "tv" ? "TV Series" : "Movie"}
                <span className='subTitle'>{date}</span>
            </span>
        </ContentModal>
    )
}

export default DisplayOne