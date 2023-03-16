import PropTypes from "prop-types";

const BASE_URL = `https://pixabay.com/api/`
const KEY = `33016808-d330fe94469becbda09795ec3`
export const getImg = (searchText, page) => 
fetch(`${BASE_URL}?q=${searchText}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)

getImg.propTypes = {
    searchText: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
}