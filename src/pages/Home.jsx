import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { actions } from "../store";
import Card from "../components/Card";

const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    // Load all data when component mounts
    actions.loadPeople(dispatch);
    actions.loadVehicles(dispatch);
    actions.loadPlanets(dispatch);
  }, [dispatch]);

  // Debug: Log the data to see what we're getting
  useEffect(() => {
    if (store.people.length > 0) {
      console.log("People data:", store.people);
    }
    if (store.vehicles.length > 0) {
      console.log("Vehicles data:", store.vehicles);
    }
    if (store.planets.length > 0) {
      console.log("Planets data:", store.planets);
    }
  }, [store.people, store.vehicles, store.planets]);

  return (
    <div className="container">
      {/* Characters Section */}
      <div className="mb-5">
        <h2 className="text-danger mb-3">
          <i className="fas fa-user me-2"></i>
          Characters
        </h2>
        <div className="overflow-auto">
          <div className="d-flex flex-row flex-nowrap gap-3 pb-3">
            {store.people.length === 0 ? (
              <p className="text-muted">Loading characters...</p>
            ) : (
              store.people.map((person) => (
                <Card key={person.uid} item={person} type="people" />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Vehicles Section */}
      <div className="mb-5">
        <h2 className="text-danger mb-3">
          <i className="fas fa-rocket me-2"></i>
          Vehicles
        </h2>
        <div className="overflow-auto">
          <div className="d-flex flex-row flex-nowrap gap-3 pb-3">
            {store.vehicles.length === 0 ? (
              <p className="text-muted">Loading vehicles...</p>
            ) : (
              store.vehicles.map((vehicle) => (
                <Card key={vehicle.uid} item={vehicle} type="vehicles" />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Planets Section */}
      <div className="mb-5">
        <h2 className="text-danger mb-3">
          <i className="fas fa-globe me-2"></i>
          Planets
        </h2>
        <div className="overflow-auto">
          <div className="d-flex flex-row flex-nowrap gap-3 pb-3">
            {store.planets.length === 0 ? (
              <p className="text-muted">Loading planets...</p>
            ) : (
              store.planets.map((planet) => (
                <Card key={planet.uid} item={planet} type="planets" />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;