import React, {useState, useEffect} from "react"
import axios from "axios";
import DisplayOne from "../../components/DisplayOne/DisplayOne";
import CustomPagination from "../../components/Pagination/Pagination";


const TvShowPage = () => {
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const fetchTvShows = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
        );
        setContent(data.results)
        setNumOfPages(data.total_pages)
        console.log(data)
    };

    useEffect(() => {
        window.scroll(0,0);
        fetchTvShows();
        // eslint-disable-next-line
    }, [page])


    return (
        <div>
            <span className='pageTitle'>TV Series</span>
            <div className='dashboard'>
                {
                    content && content.map((c) => (
                        <DisplayOne
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            mediaType="tv"
                            rating={c.vote_average}
                        />
                    ))
                }
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}

export default TvShowPage