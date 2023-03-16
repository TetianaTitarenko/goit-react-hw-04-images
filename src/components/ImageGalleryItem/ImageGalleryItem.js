import css from "components/ImageGalleryItem/ImageGalleryItem.module.css"
import PropTypes from "prop-types";

export const ImageGalleryItem = ({ imgs, onOpen }) => {
  return (    
    <ul className={css.ImageGallery}>
      {imgs.map(img => {
        return (
          <li
            key={img.id}
            className={css.ImageGalleryItem}
            onClick={() => onOpen(img)}
          >
            <img
              className={css.ImageGalleryItemImage}
              src={img.webformatURL}
              alt=""
            />
          </li>
        );
      })}
    </ul>
  );
};

ImageGalleryItem.propTypes = {
  imgs: PropTypes.array.isRequired,
  onOpen: PropTypes.func.isRequired,
}