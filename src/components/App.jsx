import { Component } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getImg } from "components/Search/Search"
import { Loader } from "./Loader/Loader";
import PropTypes from "prop-types";


export class App extends Component {
  state = {
    textSearch: '',
    page: 1,
    hits: [],
    loading: false
  };

  handleSubmit = textSearch => {
    this.setState({ page: 1, hits: [] });
    this.setState({ textSearch });
  };

  componentDidUpdate(prevProps, prevState) {
    const {textSearch, page, hits } = this.state
    if (
      prevState.textSearch !== textSearch ||
      prevState.page !== page
    ) {
      this.setState({loading: true });
      getImg(textSearch, page)
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
          return this.setState({
            hits: [...hits, ...imgs.hits],
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({loading: false}));
    }
  }

  handleLoad = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const{loading, hits, textSearch} = this.state
    return (
      <div>
        <Toaster/>
        <Searchbar onSearch={this.handleSubmit} />
        {loading && <Loader/>}
        <ImageGallery
          hits={hits}
          value={textSearch}
          handleLoad={this.handleLoad}
        />
      </div>
    );
  }
}

App.propTypes = {
  textSearch: PropTypes.string,
  page: PropTypes.number,
  hits: PropTypes.array,
  loading: PropTypes.bool,
}
