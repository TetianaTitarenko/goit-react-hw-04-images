import { Component } from "react"
import PropTypes from "prop-types";

import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { Button } from "components/Button/Button"
import { Modal } from "components/Modal/Modal";

export class ImageGallery extends Component {
    state = {
      showModal: false,
      largeImageUrl: null,
    };
  
    onOpen = img => {
      this.setState({ showModal: true, largeImageUrl: img.largeImageURL });
    };
  
    onClose = () => {
      this.setState({ showModal: false });
    };
  
    render() {
      const { hits, handleLoad } = this.props;
      return (
        <>
          <ImageGalleryItem imgs={hits} onOpen={this.onOpen} />
          {hits.length > 0 && <Button onClick={handleLoad} />}
          {this.state.showModal && (
            <Modal
              src={this.state.largeImageUrl}
              alt="image"
              onClose={this.onClose}
            />
          )}
        </>
      );
    }
  }

ImageGallery.propTypes = {
    showModal: PropTypes.bool,
    largeImageUrl: PropTypes.string,
  }