import MoonLoader from 'react-spinners/MoonLoader';
import styles from './loader.module.css';

export default function Loader(): JSX.Element {
  return (
    <MoonLoader
      className={styles.page_loader}
      color="#3fdc62"
      size={130}
      speedMultiplier={0.3}
    />

  );
}
