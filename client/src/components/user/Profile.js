import React from "react";
import { useGlobalState } from "../../context/GlobalState";
import NavBar from "../NavBar";

const Profile = () => {
  const [state, dispatch] = useGlobalState();

  return (
    <>
      <NavBar />
      <div>
        <h1>{state.currentUser.user_id}</h1>
      </div>
    </>
  );
};

export default Profile;
