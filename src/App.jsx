import { useState, useEffect, useRef } from "react";

import Places from "./components/Places";
import { AVAILABLE_PLACES } from "./data";
import { sortPlacesByDistance } from "./loc.js";
import Modal from "./components/Modal.jsx";

const storedPlacesFromLocal =
  JSON.parse(localStorage.getItem("selectedPlaces")) || [];

function App() {
  const [selectedPlaces, setSelectedPlaces] = useState(storedPlacesFromLocal);
  const [sortedPlaces, setSortedPlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    const storedPlaces =
      JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (!storedPlaces.includes(selectedPlaceId)) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([selectedPlaceId, ...storedPlaces]),
      );
    }

    setSelectedPlaces((prevPlaces) => {
      let updatedPlaces = [];

      if (!prevPlaces.includes(selectedPlaceId)) {
        updatedPlaces = [selectedPlaceId, ...prevPlaces];
      } else {
        updatedPlaces = prevPlaces;
      }

      return updatedPlaces;
    });
  }

  // Handle select place to remove/keep
  function handleSelectPlace(placeId) {
    modalRef.current.open();
    setIsModalOpen(true);
    selectedPlace.current = placeId;
  }

  // Handle remove place from the list
  function handleRemovePlace() {
    const placeId = selectedPlace.current;

    const storedPlaces =
      JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedPlaces.filter((place) => place !== placeId)),
    );

    setSelectedPlaces((prevPlaces) => {
      return prevPlaces.filter((place) => place !== placeId);
    });

    modalRef.current.close();
    setIsModalOpen(false);
  }

  // Close modal dialog
  function handleStopRemovePlace() {
    setIsModalOpen(false);
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
        isModalOpen={isModalOpen}
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
