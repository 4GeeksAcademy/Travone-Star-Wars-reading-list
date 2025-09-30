import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const { store } = useGlobalReducer();

  return (
    <nav className="navbar navbar-dark bg-dark mb-3">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <i className="fas fa-jedi me-2"></i>
            Star Wars
          </span>
        </Link>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="favoritesDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites
            <span className="badge bg-secondary ms-2">
              {store.favorites.length}
            </span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
            {store.favorites.length === 0 ? (
              <li>
                <span className="dropdown-item text-muted">No favorites yet</span>
              </li>
            ) : (
              store.favorites.map((fav, index) => (
                <li key={index}>
                  <Link
                    to={`/details/${fav.type}/${fav.uid}`}
                    className="dropdown-item d-flex justify-content-between align-items-center"
                  >
                    <span>{fav.name}</span>
                    <i className="fas fa-trash-alt text-danger"></i>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;