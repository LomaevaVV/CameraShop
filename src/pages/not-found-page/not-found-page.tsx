import {Link} from 'react-router-dom';
import styles from './not-found-page.module.css';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';

export default function NotFoundPage(): JSX.Element {
  return (

    <div className="wrapper">
      <Header />

      <main>
        <title>Page not found</title>

        <div className="page__not-found-container container">
          <section className={styles.notfound}>
            <h1 className={styles.title}>Page not found</h1>
            <h2 className={styles.title}>404</h2>
            <span className={styles.description}>{'The link you followed may be broken, or the page have been removed or it\'s temporarily unavailable.'}</span>
            <h3>
              <Link className={styles.button} to={AppRoute.Main}>Return to the main page</Link>
            </h3>
          </section>
        </div>
      </main>
    </div>
  );
}
