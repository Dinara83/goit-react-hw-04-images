import { Dna } from 'react-loader-spinner';

import css from './loader.module.css';

export const Loader = () => {
  return (
    <div className={css.overlay}>
      <Dna
        visible={true}
        height="180"
        width="180"
        ariaLabel="dna-loading"
        wrapperStyle={{ display: 'block', margin: 'auto' }}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};
