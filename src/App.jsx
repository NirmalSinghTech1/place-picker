import { useState, useEffect, useRef } from "react";

import Places from "./components/Places";
import { AVAILABLE_PLACES } from "./data";
import { sortPlacesByDistance } from "./loc.js";
import Modal from "./components/Modal.jsx";

function App() {
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [sortedPlaces, setSortedPlaces] = useState([]);
  const modalRef = useRef(null);
  const selectedPlace = useRef(null);

  // Get user current location and sort places accordingly
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const places = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude,
      );
      setSortedPlaces(places);
    });
  }, []);

  // Handle Add place to the list
  function handleAddPlace(selectedPlaceId) {
    setSelectedPlaces((prevPlaces) => {
      if (!prevPlaces.includes(selectedPlaceId)) {
        return [selectedPlaceId, ...prevPlaces];
      } else {
        return prevPlaces;
      }
    });
  }

  // Handle select place to remove/keep
  function handleSelectPlace(placeId) {
    modalRef.current.open();
    selectedPlace.current = placeId;
  }

  // Handle remove place from the list
  function handleRemovePlace() {
    const placeId = selectedPlace.current;

    setSelectedPlaces((prevPlaces) => {
      return prevPlaces.filter((place) => place !== placeId);
    });

    modalRef.current.close();
  }

  // Close modal dialog
  function handleStopRemovePlace() {
    modalRef.current.close();
  }

  // Filter selected places from available places
  const selectedPlacesData = selectedPlaces.map((placeId) =>
    AVAILABLE_PLACES.find((place) => place.id === placeId),
  );

  return (
    <>
      <Modal
        ref={modalRef}
        onRemovePlace={handleRemovePlace}
        onStopRemovePlace={handleStopRemovePlace}
      />
      <Places
        title="I'd like to visit..."
        places={selectedPlacesData}
        fallbackText="Select the places you would like to visit below."
        onAddRemovePlace={handleSelectPlace}
      />
      <Places
        title="Available Places"
        places={sortedPlaces}
        fallbackText="Please wait while we're getting data..."
        onAddRemovePlace={handleAddPlace}
      />
    </>
  );
}

export default App;
