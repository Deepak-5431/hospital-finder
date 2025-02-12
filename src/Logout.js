import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

const Logout = () => {
  const auth = getAuth();

  const signOutFromGoogle = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error during sign-out:', error);
      });
  };

  return (
    <div style={{marginLeft:'45%'}}>
      <h2>Logout </h2>
      <button onClick={signOutFromGoogle} style={{marginLeft:'1%'}}>Sign Out </button>
    </div>
  );
};

export default Logout;
