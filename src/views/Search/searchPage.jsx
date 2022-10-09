import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DisplayOne from '../../components/DisplayOne/DisplayOne';
import CustomPagination from '../../components/Pagination/Pagination';
import './searchStyle.css';



const SearchPage = () => {

    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState()
    const [numOfPages, setNumOfPages] = useState();

    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
            setContent(data.results);
            setNumOfPages(data.total_pages);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
    }, [type, page])

    return (
        <div>

            <div className='search'>
                <TextField
                    style={{ flex: 1 }}
                    className="searchBox"
                    label="search"
                    varient="filled"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button
                    variant='contained'
                    style={{ marginLeft: 10 }}
                    onClick={fetchSearch}>
                    <SearchIcon />
                </Button>
            </div>

            <Tabs
                value={type}
                indicatorColor="Primary"
                textColor="primary"
                onChange={(event, newValue) => {
                    setType(newValue);
                    setPage(1);
                }}
                style={{ paddingBottom: 5 }}>

                <Tab style={{ width: "50%" }} label="Movies" />
                <Tab style={{ width: "50%" }} label="TV Shows" />
            </Tabs>

            <div className='dashboard'>
                {
                    content && content.map((c) => (
                        <DisplayOne
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            mediaType={type ? "tv" : "movie"}
                            rating={c.vote_average}
                        />
                    ))}
                {searchText &&
                    !content &&
                    (type ? <h2>No TV Shows Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}

export default SearchPage