import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayOne from '../../components/DisplayOne/DisplayOne'
import CustomPagination from '../../components/Pagination/Pagination'



const MoviesPage = () => {
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();


    const fetchMovies = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
        );

        setContent(data.results)
        setNumOfPages(data.total_pages)
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovies();
        // eslint-disable-next-line
    }, [page])


    return (
        <div>
            <span className='pageTitle'>Movies</span>
            <div className='dashboard'>
                {
                    content && content.map((c) => (
                        <DisplayOne
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            mediaType="movie"
                            rating={c.vote_average}
                        />
                    ))
                }
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} color="primary" />
            )}
        </div>
    )
}

export default MoviesPage