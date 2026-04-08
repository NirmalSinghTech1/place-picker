import { useState } from "react";

import Places from "./components/Places";
import { AVAILABLE_PLACES } from "./data";

function App() {
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  function handleAddPlace(selectedPlaceId) {
    setSelectedPlaces((prevPlaces) => {
      if (!prevPlaces.includes(selectedPlaceId)) {
        return [selectedPlaceId, ...prevPlaces];
      } else {
        return prevPlaces
      }
    });
  }

  function handleRemovePlace(placeId) {
    setSelectedPlaces((prevPlaces) => {
      if (prevPlaces.includes(placeId)) {
        return prevPlaces.filter((place) => place !== placeId);
      }
    });
  }

  const selectedPlacesData = selectedPlaces.map(place => (
    AVAILABLE_PLACES.find(item => item.id === place)
  ))

  return (
    <>
      <div className="border-2 border-cyan-950 rounded-[7px] mt-7 py-6 px-7">
        <h2 className="font-['Raleway'] font-semibold text-lg sm:text-[1.3rem] mb-2.5 text-cyan-100">
          I'd like to visit...
        </h2>
        {selectedPlacesData.length > 0 ? (
          <Places
            availablePlaces={selectedPlacesData}
            onAddRemovePlace={handleRemovePlace}
          />
        ) : (
          <p className="font-['Bricolage_Grotesque'] text-gray-300 text-sm sm:text-[1rem]">
            Select the places you would like to visit below.
          </p>
        )}
      </div>
      <div className="border-2 border-cyan-950 rounded-[7px] mt-7 mb-5 py-6 px-7">
        <h2 className="font-['Raleway'] font-semibold text-lg sm:text-[1.3rem] text-cyan-100">
          Available Places
        </h2>
        <Places
          onAddRemovePlace={handleAddPlace}
          availablePlaces={AVAILABLE_PLACES}
        />
      </div>
    </>
  );
}

export default App;
