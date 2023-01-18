import { Fragment } from 'react';
import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [alt, setAlt] = useState('');
  const [src, setSrc] = useState('');

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const handleImageClick = evt => {
    const { alt, src } = evt.target;
    setShowModal(true);
    setAlt(alt);
    setSrc(src);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Fragment>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery searchQuery={searchQuery} onImageClick={handleImageClick} />

      {showModal && <Modal src={src} alt={alt} onClose={toggleModal} />}
    </Fragment>
  );
};

// export const App =()=> {
//   // state = {
//   //   searchQuery: '',
//   //   showModal: false,
//   //   alt: '',
//   //   src: '',
//   // };
// const[searchQuery, setSearchQuery]=useState('');

//   handleFormSubmit = searchQuery => {
//     this.setState({ searchQuery });
//   };

//   handleImageClick = e => {
//     this.setState({
//       showModal: true,
//       alt: e.target.alt,
//       src: e.target.src,
//     });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   render() {
//     const { showModal, searchQuery, alt, src } = this.state;

//     return (
//       <Fragment>
//         <Searchbar onSubmit={this.handleFormSubmit} />

//           <ImageGallery
//             searchQuery={searchQuery}
//             onImageClick={this.handleImageClick}
//          />

//         {showModal && <Modal src={src} alt={alt} onClose={this.toggleModal} />}
//       </Fragment>
//     );
//   }
// }
