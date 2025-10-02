import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { actions } from "../store";

const Details = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const isFav = actions.isFavorite(store.favorites, id, type);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        if (type === "people") {
          
          const response = await fetch(`https://akabab.github.io/starwars-api/api/id/${id}.json`);
          const data = await response.json();
          setDetails(data);
        } else {
          const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
          const data = await response.json();
          setDetails(data.result.properties);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, id]);

  const handleFavorite = () => {
    if (isFav) {
      actions.removeFavorite(dispatch, id, type);
    } else {
      actions.addFavorite(dispatch, { uid: id, name: details?.name || "Unknown", type });
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="container text-center mt-5">
        <h2>Item not found</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>
    );
  }

  
const getImageUrl = () => {
  
  if (type === "people" && details.image) {
    return details.image;
  }

  
  const placeholders = {
    vehicles: `https://placehold.co/600x400/000000/FFE81F?text=${encodeURIComponent(details.name || type)}`,
    planets: `https://placehold.co/600x400/1a1a2e/FFE81F?text=${encodeURIComponent(details.name || type)}`
  };

  
  return placeholders[type] || "https://starwars-visualguide.com/assets/img/placeholder.jpg";
};

  const imgUrl = getImageUrl();

  return (
    <div className="container mt-5">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={imgUrl}
              className="img-fluid rounded-start"
              alt={details.name}
              style={{ height: "100%", objectFit: "cover", minHeight: "400px" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1 className="card-title">{details.name}</h1>
                <button
                  className={`btn ${isFav ? "btn-warning" : "btn-outline-warning"}`}
                  onClick={handleFavorite}
                >
                  <i className={`fa${isFav ? "s" : "r"} fa-heart`}></i>
                </button>
              </div>
              
              <div className="text-secondary">
                {Object.entries(details).map(([key, value]) => {
                  if (["id", "name", "url", "created", "edited", "image", "wiki"].includes(key)) return null;
                  
                  let displayValue = value;
                  if (Array.isArray(value)) {
                    displayValue = value.length > 0 ? value.join(", ") : "None";
                  }
                  
                  return (
                    <p key={key} className="mb-2">
                      <strong className="text-capitalize text-dark">
                        {key.replace(/_/g, " ")}:
                      </strong>{" "}
                      {displayValue}
                    </p>
                  );
                })}
              </div>

              <hr className="text-danger" />

              <button className="btn btn-primary" onClick={() => navigate("/")}>
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;