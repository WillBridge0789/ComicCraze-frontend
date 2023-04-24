import axios from "axios";
import NavBar from "./NavBar";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context/GlobalState";
import Comic from "./Comic";

function Favorites() {
  const [favComics, setfavComics] = useState([]);
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    axios
      .get(
        `https://8000-willbridge0-comiccrazeb-ckt42wxy9y8.ws-us95.gitpod.io/users/${state.currentUser.user_id}/`
      ) // may need a new port link per project reload
      .then((response) => {
        setfavComics(response.data.favorite_comics);
      })
      .catch((error) => console.error(error));
  }, []);

  let renderedFavs = favComics.map((comic) => (
    <Comic key={comic.id} comic={comic} />
  ));

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <h1 className="display-1 page-head">Favorites</h1>
        </div>
        <div className="row m-3">{renderedFavs}</div>
      </div>
    </div>
  );
}

export default Favorites;
