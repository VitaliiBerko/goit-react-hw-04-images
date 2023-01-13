import { Fragment } from 'react';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    alt: '',
    src: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  handleImageClick = e => {
    this.setState({
      showModal: true,
      alt: e.target.alt,
      src: e.target.src,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal, searchQuery, alt, src } = this.state;

    return (
      <Fragment>
        <Searchbar onSubmit={this.handleFormSubmit} />
        
          <ImageGallery
            searchQuery={searchQuery}
            onImageClick={this.handleImageClick}
         />       

        {showModal && <Modal src={src} alt={alt} onClose={this.toggleModal} />}
      </Fragment>
    );
  }
}
