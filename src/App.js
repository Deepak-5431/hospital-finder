// App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Login from './Login';
import Logout from './Logout';
import MapComponent from './MapComponent';

const App = () => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch user's location
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
            },
            (error) => {
              console.error('Error fetching location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      {user ? (
        location ? (
          <div>
            <h1>Welcome, {user.displayName}</h1>
            <MapComponent location={location} />
          </div>
        ) : (
          <p>Fetching your location...</p>
        )
      ) : (
        <Login />
      )}
      <></>
      <Logout/>
    </>
  );
};

export default App;
