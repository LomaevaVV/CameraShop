import { Link } from 'react-router-dom';

export default function Pagination(): JSX.Element {
  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item"><Link className="pagination__link pagination__link--active" to="1">1</Link>
        </li>
        <li className="pagination__item"><Link className="pagination__link" to="2">2</Link>
        </li>
        <li className="pagination__item"><Link className="pagination__link" to="3">3</Link>
        </li>
        <li className="pagination__item"><Link className="pagination__link pagination__link--text" to="2">Далее</Link>
        </li>
      </ul>
    </div>
  );
}

