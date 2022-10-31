import {Link} from 'react-router-dom';
import styles from './not-found-page.module.css';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';

export default function NotFoundPage(): JSX.Element {
  return (

    <div className="wrapper">
      <Header />

      <main>
        <title>Страница не найдена</title>

        <div className="page__not-found-container container">
          <section className={styles.notfound}>
            <h1 className={styles.title}>Page not found</h1>
            <h2 className={styles.title}>404</h2>
            <span className={styles.description}>{'Сервер не может найти данные согласно запросу'}</span>
            <h3>
              <Link className={styles.button} to={AppRoute.Main}>Вернуться на главную страницу</Link>
            </h3>
          </section>
        </div>
      </main>
    </div>
  );
}
