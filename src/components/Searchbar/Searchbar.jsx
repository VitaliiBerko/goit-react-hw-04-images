import { useState } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import s from '../styles.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    const { value } = e.currentTarget;
    setSearchQuery(value.trim());
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
     if (searchQuery.trim() === '') {
      Notiflix.Notify.info('Введіть ваш запит');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={s.searchbar}>
      <form onSubmit={handleOnSubmit} className={s.form}>
        <button type="submit" className={s.button}>
          <span className={s.button__label}>Search</span>
        </button>

        <input
          onChange={handleChange}
          value={searchQuery}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


// export class Searchbar extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   state = {
//     searchQuery: '',
//   };

//   handleChange = e => {
//     const { value } = e.currentTarget;
//     this.setState({ searchQuery: value.trim() });
//   };

//   handleOnSubmit = e => {
//     e.preventDefault();
//     const { searchQuery } = this.state;
//     if (searchQuery.trim() === '') {
//       Notiflix.Notify.info('Введіть ваш запит');
//       return;
//     }

//     this.props.onSubmit(searchQuery);
//     this.setState({searchQuery: ''});
//   };

//   render() {
//     const { searchQuery } = this.state;
//     return (
//       <header className={s.searchbar}>
//         <form onSubmit={this.handleOnSubmit} className={s.form}>
//           <button type="submit" className={s.button}>
//             <span className={s.button__label}>Search</span>
//           </button>

//           <input
//             onChange={this.handleChange}
//             value={searchQuery}
//             className={s.input}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
