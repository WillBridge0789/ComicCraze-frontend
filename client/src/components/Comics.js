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
import { GridLoader } from "react-spinners";

function Comics() {
  const [comics, setComics] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [state, dispatch] = useGlobalState();
  const [, setCart] = useState(state.cart);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    axios
      .get(`${API_URL}/comics`)
      .then((response) => {
        setComics(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (state?.currentUser?.user_id) {
      axios
        .get(`${API_URL}/users/${state.currentUser.user_id}/`)
        .then((response) => {
          setFavorites(response?.data?.favorite_comics?.map((c) => c.id) || []);
          setCart(response?.data?.cart_item?.map((c) => c.id) || []);
        });
    }
  }, [state?.currentUser?.user_id]);

  const handleComicsSearch = async (searchQuery) => {
    axios
      .get(`${API_URL}/comics/?q=${searchQuery}`)
      .then((response) => {
        setComics(response.data);
      })
      .catch((error) => console.error(error));
  };

  let renderedComics = null;
  if (isLoading) {
    renderedComics = (
      <div className="sweet-loading">
        <GridLoader
          height={180}
          width={180}
          loading={isLoading}
          color={"#ffffff"}
          css={override}
          aria-label="grid-loading"
          radius={12.5}
        />
      </div>
    );
  } else {
    renderedComics = comics
      .sort(() => 0.5 - Math.random())
      .slice(0, 50)
      .map((comic) => {
        return (
          <Comic
            key={comic.id}
            comic={comic}
            addToFavorites={addToFavorites}
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
