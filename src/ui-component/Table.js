import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SearchBar from './SearchBar';
import { Grid } from '@material-ui/core';

const filterData = (query, data) => {
    if (!query) {
        return data;
    } else {
        return data.filter((item) => Object.values(item).toString().toLowerCase().includes(query));
    }
};

const Table = ({ rowsData, columnsData, error, loading }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const dataFiltered = filterData(searchQuery, rowsData);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </Grid>
            <Grid item xs={12} height={420}>
                <DataGrid rows={dataFiltered} columns={columnsData} pageSize={5} rowsPerPageOptions={[5]} error={error} loading={loading} />
            </Grid>
        </Grid>
    );
};

export default Table;
