import React from "react";
import { useGlobalState } from "../../context/GlobalState";
import NavBar from "../NavBar";

const Profile = () => {
  const [state, dispatch] = useGlobalState();

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <h1>{state.currentUser?.user_id}</h1>
        </div>
        <div className="row">
          <h3>{state.currentUser?.username}</h3>
        </div>
      </div>
    </>
  );
};

export default Profile;
