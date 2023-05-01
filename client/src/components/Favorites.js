import axios from "axios";
import NavBar from "./NavBar";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context/GlobalState";
import Comic from "./Comic";
import Footer from "./Footer";
import { API_URL } from '../services/auth.constants';

function Favorites() {
  const [favComics, setfavComics] = useState([]);
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${state.currentUser?.user_id}/`) // may need a new port link per project reload
      .then((response) => {
        setfavComics(response.data.favorite_comics);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleRemove = (comicId) => {
    axios
      .delete(
        `${API_URL}/users/${state.currentUser.user_id}/delete-favorite/${comicId}`
      )
      .then(() => {
        setfavComics(favComics.filter((c) => c.id !== comicId));
      });
  };

  let renderedFavs = favComics.map((comic) => (
    <Comic key={comic.id} comic={comic} handleRemove={handleRemove} />
  ));

  return (
    <div className="h-100">
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <h1 className="display-1 page-head mt-3 d-flex justify-content-center">
            Favorites
          </h1>
          <hr className="line"></hr>
        </div>
        <div className="background-gradient">
          <div className="row d-flex justify-content-center">
            {renderedFavs}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Favorites;
