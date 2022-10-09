import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayOne from '../../components/DisplayOne/DisplayOne'
import './DashboardStyle.css'
import CustomPagination from '../../components/Pagination/Pagination'

const DashboardPage = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

        setContent(data.results)
    }


    useEffect(() => {
        fetchTrending();
        //eslint-disable-next-line
    }, [page]);

    return (
        <div>
            <span className='pageTitle'>Trending Today</span>
            <div className='dashboard'>
                {
                    content && content.map((c) => (
                        <DisplayOne
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            mediaType={c.media_type}
                            rating={c.vote_average}
                        />
                    ))
                }
            </div>
            <CustomPagination setPage={setPage} />
        </div>
    )
}
export default DashboardPage