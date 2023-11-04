import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db, createUserWithEmailAndPassword } from "../../firebase";

const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthDetails = ({ children }) => {
  const [error, setError] = useState(""); // handle error response
  const [currentuser, setCurrentUser] = useState(); // store current user

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log("User ID : ", user.uid);
        console.log("User Email : ", user.email);
      } else {
        console.log("no user availble");
      }
    });
  }, []);
  const signUp = (email, password, name) => {
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        console.log(result.user);
        const ref = doc(db, "usersinformation", result.user.uid);
        const docref = await setDoc(ref, { name })
          .then((re) => {
            alert("yes the data has been enter");
          })
          .catch((e) => {
            console.log(e.message);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const value = {
    currentuser,
    signUp,
    error,
  };

  /// here new code ended

  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
  const userLoginOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successfully");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {" "}
      <div>
        {authUser ? (
          <>
            {" "}
            <p>{`Signed in with email : ${authUser.email} `}</p>{" "}
            <button onClick={userLoginOut}>Sign Out</button>
          </>
        ) : (
          <p>Signed Out</p>
        )}
      </div>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthDetails;
