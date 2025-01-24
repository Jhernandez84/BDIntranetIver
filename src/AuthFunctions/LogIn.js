import React, { useContext, useEffect } from 'react';
import UserContext from '../Context/User/UserContext';
import { db } from '../Firebase/firebase'; // Import your Firestore instance.

const GetUserPrivileges = ({ authUser }) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const readUserPrivileges = async () => {
      if (!authUser) return;

      const collectionRef = db.collection('BDUsuarios');
      try {
        const querySnapshot = await collectionRef
          .where('UserID', '==', authUser.UID)
          .limit(1)
          .get();

        if (!querySnapshot.empty) {
          const recordData = querySnapshot.docs[0].data();
          swal("Respuesta", "Usuario con permisos", "success");
          // Update user privileges in the context or perform other actions as needed.
          // setUser({ ...authUser, privileges: recordData });
        } else {
          swal("Respuesta", "Usuario sin permisos", "warning");
        }
      } catch (error) {
        console.error('Error fetching user privileges:', error);
        // Handle the error appropriately.
      }
    };

    readUserPrivileges();
  }, [authUser, setUser]);

  return null;
};

export default GetUserPrivileges;
