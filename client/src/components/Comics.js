import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useGlobalState } from "../context/GlobalState";
import Comic from "./Comic";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import { API_URL } from "../services/auth.constants";
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";

// TODO: LOOK INTO react-spinners FOR THIS PAGE
function Comics() {
  const [comics, setComics] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [state, dispatch] = useGlobalState();
  const [cart, setCart] = useState(state.cart);
  const [seriesFilter, setSeriesFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const addToFavorites = (comicId) => {
    let newFavs = [...favorites, comicId];
    setFavorites(newFavs);
    axios.patch(`${API_URL}/users/${state.currentUser.user_id}/`, {
      favorite_comics: newFavs,
    });
  };

  const addToCart = (comicId) => {
    let newItem = [...state.cart, comicId];
    dispatch({
      ...state,
      cart: newItem,
    });
    setCart(newItem);
    axios.patch(
      `https://8000-willbridge0-comiccrazeb-ckt42wxy9y8.ws-us95.gitpod.io/users/${state.currentUser.user_id}/`,
      { cart_item: newItem }
    );
  };

  // const handleRemove = (comicId) => {
  //   axios
  //     .delete(
  //       `${API_URL}/users/${state.currentUser.user_id}/delete-favorite/${comicId}`
  //     )
  //     .then(() => {
  //       if (favorites.some((c) => c.id === comicId)) {
  //         setFavorites(favorites.filter((c) => c.id !== comicId));
  //       } else if (state.cart.some((c) => c.id === comicId)) {
  //         setCart(cart.filter((c) => c.id !== comicId));
  //       }
  //     });
  // };

  useEffect(() => {
    axios
      .get(`${API_URL}/comics`) // may need a new port link per project reload
      .then((response) => {
        setComics(response.data);
      })
      .catch((error) => console.error(error));

    if (state.currentUser) {
      axios
        .get(`${API_URL}/users/${state.currentUser.user_id}/`) // may need a new port link per project reload
        .then((response) => {
          setFavorites(response.data.favorite_comics.map((c) => c.id));
          setCart(response.data.cart_item.map((c) => c.id));
        });
    }
  }, []);

  // // Populate the card with the data
  // for (let i = 0; i < 10; i++) {
  //   // loop for 10 entries
  //   const card = (
  //     <div className="card">
  //       <img
  //         src={data[i].id.thumbnail.props.children[0].props}
  //         class="card-img-top"
  //         alt="..."
  //       />
  //       <div class="card-body">
  //         {/* <h5 class="card-title">{data[i].title}</h5>
  //                 <p class="card-text">{data[i].description}</p> */}
  //       </div>
  //     </div>
  //   );

  //   // append new card element to document
  //   const cardContainer = document.querySelector(".card-container");
  //   cardContainer.appendChild(card);
  // }

  const handleComicsSearch = async (searchQuery) => {
    axios
      .get(`${API_URL}/comics/?q=${searchQuery}`) // may need a new port link per project reload
      .then((response) => {
        setComics(response.data);
      })
      .catch((error) => console.error(error));
  };

  let renderedComics = null;
  if (loading) {
    renderedComics = (
      <div className="sweet-loading">
        <ScaleLoader
          color={"#ffffff"}
          loading={loading}
          css={override}
          size={150}
        />
      </div>
    );
  } else {
    renderedComics = comics
      .sort(() => 0.5 - Math.random())
      .slice(0, 50)
      // .filter(
      //   (comic) =>
      //     comic.description &&
      //     comic.description.toLowerCase().includes(seriesFilter)
      // )
      .map((comic) => {
        return (
          <Comic
            key={comic.id}
            comic={comic}
            addToFavorites={addToFavorites}
            // handleRemove={handleRemove}
            addToCart={addToCart}
          />
        );
      });
  }
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <NavBar onComicsSearch={handleComicsSearch} />
      <div className="container-fluid g-0">
        <div className="row d-flex m-4 align-items-center">
          <div data-aos="fade-left">
            <h1 className="display-1 page-head d-flex justify-content-center">
              Comics
            </h1>
          </div>
          <hr className="line"></hr>
        </div>
        <div className="row d-flex justify-content-center background-gradient">
          {renderedComics}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Comics;
