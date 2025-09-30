export const initialState = {
  people: [],
  vehicles: [],
  planets: [],
  favorites: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PEOPLE":
      return { ...state, people: action.payload };
    
    case "SET_VEHICLES":
      return { ...state, vehicles: action.payload };
    
    case "SET_PLANETS":
      return { ...state, planets: action.payload };
    
    case "ADD_FAVORITE":
      const exists = state.favorites.find(
        fav => fav.uid === action.payload.uid && fav.type === action.payload.type
      );
      if (exists) return state;
      return { ...state, favorites: [...state.favorites, action.payload] };
    
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
        )
      };
    
    default:
      return state;
  }
};

// Action creators
export const actions = {
  loadPeople: async (dispatch) => {
    try {
      // Use the new API with images!
      const response = await fetch("https://akabab.github.io/starwars-api/api/all.json");
      const data = await response.json();
      
      // Transform to match our format (take first 10)
      const transformed = data.slice(0, 10).map(char => ({
        uid: char.id.toString(),
        name: char.name,
        image: char.image // Image URL included!
      }));
      
      dispatch({ type: "SET_PEOPLE", payload: transformed });
    } catch (error) {
      console.error("Error loading people:", error);
    }
  },

  loadVehicles: async (dispatch) => {
    try {
      const response = await fetch("https://www.swapi.tech/api/vehicles");
      const data = await response.json();
      dispatch({ type: "SET_VEHICLES", payload: data.results });
    } catch (error) {
      console.error("Error loading vehicles:", error);
    }
  },

  loadPlanets: async (dispatch) => {
    try {
      const response = await fetch("https://www.swapi.tech/api/planets");
      const data = await response.json();
      dispatch({ type: "SET_PLANETS", payload: data.results });
    } catch (error) {
      console.error("Error loading planets:", error);
    }
  },

  addFavorite: (dispatch, item) => {
    dispatch({ type: "ADD_FAVORITE", payload: item });
  },

  removeFavorite: (dispatch, uid, type) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: { uid, type } });
  },

  isFavorite: (favorites, uid, type) => {
    return favorites.some(fav => fav.uid === uid && fav.type === type);
  }
};