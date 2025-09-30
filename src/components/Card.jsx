import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { actions } from "../store";

const Card = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();
  const isFav = actions.isFavorite(store.favorites, item.uid, type);

  // For people, use the image from API. For others, use placeholder
  const getImageUrl = () => {
    if (type === "people" && item.image) {
      return item.image;
    }
    
    // For vehicles and planets, use unsplash placeholder or themed images
    const placeholders = {
      vehicles: `https://via.placeholder.com/300x400/000000/FFD700?text=${encodeURIComponent(item.name)}`,
      planets: `https://via.placeholder.com/300x400/1a1a2e/FFD700?text=${encodeURIComponent(item.name)}`
    };
    
    return placeholders[type] || 'https://via.placeholder.com/300x400';
  };

  const imgUrl = getImageUrl();

  const handleFavorite = (e) => {
    e.preventDefault();
    if (isFav) {
      actions.removeFavorite(dispatch, item.uid, type);
    } else {
      actions.addFavorite(dispatch, { ...item, type });
    }
  };

  return (
    <div className="card h-100" style={{ width: "18rem", minWidth: "18rem" }}>
      <img
        src={imgUrl}
        className="card-img-top"
        alt={item.name}
        style={{ height: "300px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <div className="mt-auto d-flex justify-content-between">
          <Link to={`/details/${type}/${item.uid}`} className="btn btn-outline-primary">
            Learn more!
          </Link>
          <button
            className={`btn ${isFav ? "btn-warning" : "btn-outline-warning"}`}
            onClick={handleFavorite}
          >
            <i className={`fa${isFav ? "s" : "r"} fa-heart`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;