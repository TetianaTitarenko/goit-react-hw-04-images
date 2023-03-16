import { useState } from "react"
import PropTypes from "prop-types";

import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { Button } from "components/Button/Button"
import { Modal } from "components/Modal/Modal";

export const ImageGallery = ({ hits, handleLoad }) => {
  const [showModal, isShowModal] = useState(false);
  const [largeImageUrl, isLargeImageUrl] = useState(null)
  
  const onOpen = (img) => {
      console.log(img.largeImageURL)
      isShowModal(true)
      isLargeImageUrl(img.largeImageURL)
    };
  
    const onClose = () => {
      isShowModal(false);
    };
  
      return (
        <>
          <ImageGalleryItem imgs={hits} onOpen={onOpen} />
          {hits.length > 0 && <Button onClick={handleLoad} />}
          {showModal && (
            <Modal
              src={largeImageUrl}
              alt="image"
              onClose={onClose}
            />
          )}
        </>
      );
    }
  // }

ImageGallery.propTypes = {
    showModal: PropTypes.bool,
    largeImageUrl: PropTypes.string,
  }