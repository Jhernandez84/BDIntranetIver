import { NavLink } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../Context/User/UserContext"
import ClientContext from "../Context/Client/ClientContext"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { db } from '../Firebase/firebase'; // Import your Firestore instance.
import { auth, provider } from '../Firebase/firebase'; // Import the auth and provider from your firebase.js file
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import the modular Firebase auth functions
import GetUserPrivileges from "../AuthFunctions/LogIn"

export const NavBar = () => {

    const Navigate = useNavigate()

    const { user, setUser } = useContext(UserContext);
    const { client, setClient } = useContext(ClientContext);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // User is signed in, set the user in your state
                const readUserPrivileges = async () => {
                    const collectionRef = db.collection('DBUsuarios');
                    try {
                        const querySnapshot = await collectionRef
                            .where('UserID', '==', `${authUser.uid}`)
                            .limit(1)
                            .get();
                        if (!querySnapshot.empty) {
                            const recordData = querySnapshot.docs[0].data();
                            setUser({ ...authUser, privileges: recordData });
                            setClient({ ClientEvent: recordData.ClientEvent, UserEntity: recordData.UserEntity, UserPermisions: recordData.UserPermisions });
                            // swal("Respuesta", "Usuario con permisos", "success");
                            // Update user privileges in the context or perform other actions as needed.
                        } else {
                            // swal("Respuesta", "Usuario sin permisos", "warning");
                        }
                    } catch (error) {
                        console.error('Error fetching user privileges:', error);
                        // Handle the error appropriately.
                    }
                };
                readUserPrivileges();

                // setUser(authUser);
            } else {
                // User is signed out, set user state to null
                setUser(undefined);
                Navigate("/Home")
            }
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user !== undefined && client.UserPermisions === "Admin") {
            Navigate("/Attendance"); // Navigate to the "/Attendance" route
        }
    }, [user, client]);

    const handleGoogleSignIn = async (e) => {
        e.preventDefault()
        const authInstance = getAuth();
        try {
            await signInWithPopup(authInstance, provider);
            // User signed in with Google successfully
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const handleGoogleLogout = async () => {
        try {
            await auth.signOut();
            // User signed out successfully
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/Home"><img src="/easyapps-Logo.png" alt="" /></NavLink>          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/Home">Home</NavLink>
              </li> */}
                            {/* <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/Dashboard">Dashboard</NavLink>
              </li> */}
                            {!user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/Home">Eventos</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/Home">Acerca de Nosotros</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/Home">Ayuda</NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/Attendance">Asistencias</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/Dashboard">Dashboard</NavLink>
                                    </li>
                                    {/* <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/Home">Ayuda</NavLink>
                                    </li> */}
                                </>
                            )}
                        </ul>


                        <form className="d-flex">
                            {user ? (
                                <>
                                    <button className="btn btn-outline-danger" onClick={handleGoogleLogout}> <img src={user.photoURL} alt="" /> Cerrar Sesión </button>
                                    {/* <p>{user.displayName}</p> */}
                                </>
                            ) : (
                                <button className="btn btn-outline-success" onClick={handleGoogleSignIn}> Iniciar Sesión </button>
                            )}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}