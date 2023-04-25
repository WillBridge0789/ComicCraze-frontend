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
          <h1 className="display-3">{state.currentUser?.username}</h1>
        </div>
        <div className="row">
          <div className="col-6">
            <h3>{state.currentUser?.favorite_comics}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
