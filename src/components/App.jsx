import {useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getImg } from "components/Search/Search"
import { Loader } from "./Loader/Loader";
import PropTypes from "prop-types";


export const App = () => {
  const [textSearch, setTextSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = textSearch => {
    setPage(1);
    setHits([]);
    setTextSearch(textSearch);
  };
  useEffect(() => {
    if (!textSearch) {
      return
    }
    setLoading(true);

    getImg(textSearch, page,
    )
      .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(toast.error('Try again')));
        })
        .then(imgs => {
          console.log('img hits', imgs.hits);
          if (imgs.hits.length === 0) {
            return toast.error('No such image');
          }
          return setHits(
            prefHits => [...prefHits, ...imgs.hits],
          );
        })
        .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [textSearch, page])
  const handleLoad = () => {
    setPage(prefPage => prefPage + 1 );
  };
    return (
      <div>
        <Toaster/>
        <Searchbar onSearch={handleSubmit} />
        {loading && <Loader />}
        {textSearch && <ImageGallery
          hits={hits}
          value={textSearch}
          handleLoad={handleLoad}
        />}
      </div>
    );
}

App.propTypes = {
  textSearch: PropTypes.string,
  page: PropTypes.number,
  hits: PropTypes.array,
  loading: PropTypes.bool,
}
