import PropTypes from "prop-types";

const BASE_URL = `https://pixabay.com/api/`
const KEY = `33016808-d330fe94469becbda09795ec3`
export const getImg = (textSearch, page) => 
    fetch(`${BASE_URL}?q=${textSearch}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)

getImg.propTypes = {
    textSearch: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
}