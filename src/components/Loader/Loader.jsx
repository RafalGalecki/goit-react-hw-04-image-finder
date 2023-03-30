import { Component } from 'react';
import { Circles } from 'react-loader-spinner';
import css from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <Circles
        height="45vh"
        width="45vw"
        color="#e18957"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass={css.spinner}
        visible={true}
      />
    );
  }
}

export default Loader;
