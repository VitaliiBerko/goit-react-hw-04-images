import { useState, useEffect, Fragment } from 'react';
import Notiflix from 'notiflix';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import s from '../styles.module.css';
import { fetchApiImages } from '../../services/images-api.services';
import { Button } from 'components/Button/Button';

export const ImageGallery = ({ onImageClick, searchQuery }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setLoading(true);
    fetchApiImages(searchQuery, page).then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images ${searchQuery} matching your search query. Please try again.`
        );
        setLoading(false);
        return;
      }

      if (hits.length === 0 && totalHits !== 0) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        setLoading(false);
        return;
      }
      if (page === 1) {
        setImages([]);
        setLoading(false);
      }

      const newImage = hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );

      setImages(prev => [...prev, ...newImage]);
      setLoading(false);
    });
  }, [page, searchQuery]);

  // componentDidUpdate(prevProps, prevState) {
  //   const prevSearch = prevProps.searchQuery;
  //   const nextSearch = this.props.searchQuery;
  //   const prevPage = prevState.page;
  //   const nextPage = this.state.page;

  //   if (prevSearch !== nextSearch) {
  //     this.setState({ searchQuery: nextSearch, images: [], page: 1 });
  //   }

  //   if (
  //     (prevSearch !== nextSearch && nextPage === 1) ||
  //     prevPage !== nextPage
  //   ) {
  //     this.setState({ loading: true });

  //     fetchApiImages(nextSearch, nextPage).then(({ hits, totalHits }) => {
  //       if (hits.length === 0) {
  //         Notiflix.Notify.failure(
  //           `Sorry, there are no images ${nextSearch} matching your search query. Please try again.`
  //         );
  //         this.setState({ loading: false });
  //         return;
  //       }

  //       if (hits.length === 0 && totalHits !== 0) {
  //         Notiflix.Notify.info(
  //           "We're sorry, but you've reached the end of search results."
  //         );
  //         this.setState({ loading: false });
  //         return;
  //       }

  //       const newImage = hits.map(
  //         ({ id, webformatURL, largeImageURL, tags }) => ({
  //           id,
  //           webformatURL,
  //           largeImageURL,
  //           tags,
  //         })
  //       );

  //       this.setState(({ images }) => ({
  //         images: [...images, ...newImage],
  //         loading: false,
  //       }));
  //     });
  //   }
  // }

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Fragment>
      {searchQuery && (
        <ul className={s.gallery}>
          {images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              onClick={onImageClick}
              key={id}
              id={id}
              src={webformatURL}
              alt={tags}
            />
          ))}
        </ul>
      )}

      {(loading && Loader) ||
        (images.length > 0 && <Button onClick={loadMore}></Button>)}
    </Fragment>
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

// export class ImageGallery extends Component {
//   static propTypes = {
//     searchQuery: PropTypes.string.isRequired,
//   };

//   state = {
//     images: [],
//     loading: false,
//     searchQuery: '',
//     page: 1,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevSearch = prevProps.searchQuery;
//     const nextSearch = this.props.searchQuery;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevSearch !== nextSearch) {
//       this.setState({ searchQuery: nextSearch, images: [], page: 1 });
//     }

//     if (
//       (prevSearch !== nextSearch && nextPage === 1) ||
//       prevPage !== nextPage
//     ) {
//       this.setState({ loading: true });

//       fetchApiImages(nextSearch, nextPage).then(({ hits, totalHits }) => {
//         if (hits.length === 0) {
//           Notiflix.Notify.failure(
//             `Sorry, there are no images ${nextSearch} matching your search query. Please try again.`
//           );
//           this.setState({ loading: false });
//           return;
//         }

//         if (hits.length === 0 && totalHits !== 0) {
//           Notiflix.Notify.info(
//             "We're sorry, but you've reached the end of search results."
//           );
//           this.setState({ loading: false });
//           return;
//         }

//         const newImage = hits.map(
//           ({ id, webformatURL, largeImageURL, tags }) => ({
//             id,
//             webformatURL,
//             largeImageURL,
//             tags,
//           })
//         );

//         this.setState(({ images }) => ({
//           images: [...images, ...newImage],
//           loading: false,
//         }));
//       });
//     }
//   }

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { images, loading, searchQuery } = this.state;

//     return (
//       <Fragment>
//         {searchQuery && (
//           <ul className={s.gallery}>
//             {images.map(({ id, webformatURL, tags }) => (
//               <ImageGalleryItem
//                 onClick={this.props.onImageClick}
//                 key={id}
//                 id={id}
//                 src={webformatURL}
//                 alt={tags}
//               />
//             ))}
//           </ul>
//         )}

//         {(loading && Loader) ||
//           (images.length > 0  &&  <Button onClick={this.loadMore}></Button>)}
//       </Fragment>
//     );
//   }
// }
