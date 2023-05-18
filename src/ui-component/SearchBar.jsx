import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

const SearchBar = ({ setSearchQuery }) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(String(e.target.value).toLowerCase())
      }}
      autoComplete="off"
      variant="outlined"
      placeholder="Search..."
      size="small"
      sx={{ width: '15rem' }}
    />
  </form>
)
SearchBar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired
}

export default SearchBar
