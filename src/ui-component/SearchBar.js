import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ setSearchQuery }) => (
    <form>
        <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
                setSearchQuery(String(e.target.value).toLowerCase());
            }}
            autoComplete="off"
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{ width: '15rem' }}
        />
    </form>
);

export default SearchBar;
