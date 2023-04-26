import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useGlobalState } from "../context/GlobalState";
import Comic from "./Comic";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
// import './css/style.css';
// import backgroundImg from 'public/marvel_display_img2.jpg';

function Comics() {
  const [comics, setComics] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [state, dispatch] = useGlobalState();
  const [seriesFilter, setSeriesFilter] = useState("");

  const addToFavorites = (comicId) => {
    let newFavs = [...favorites, comicId];
    setFavorites(newFavs);
    axios.patch(
      `https://8000-willbridge0-comiccrazeb-ckt42wxy9y8.ws-us95.gitpod.io/users/${state.currentUser.user_id}/`,
      { favorite_comics: newFavs }
    );
  };

  const addToCart = (comicId) => {
    let newItem = [...state.cart, comicId];
    dispatch({
      ...state,
      cart: newItem,
    });
    // axios.patch(
    //   `https://8000-willbridge0-comiccrazeb-ckt42wxy9y8.ws-us95.gitpod.io/users/${state.currentUser.user_id}/`,
    //   { cart_item: newItem }
    // );
  };

  const handleRemove = (comicId) => {
    axios
      .delete(
        `https://8000-willbridge0-comiccrazeb-ckt42wxy9y8.ws-us95.gitpod.io/users/${state.currentUser.user_id}/delete-favorite/${comicId}`
      )
      .then(() => {
        setFavorites(favorites.filter((c) => c.id !== comicId));
      });
  };

  useEffect(() => {
    axios
      .get(
        "https://8000-willbridge0-comiccrazeb-ckt42wxy9y8.ws-us95.gitpod.io/comics"
      ) // may need a new port link per project reload
      .then((response) => {
        setComics(response.data);
      })
      .catch((error) => console.error(error));

    if (state.currentUser) {
      axios
        .get(
          `https://8000-willbridge0-comiccrazeb-ckt42wxy9y8.ws-us95.gitpod.io/users/${state.currentUser.user_id}/`
        ) // may need a new port link per project reload
        .then((response) => {
          setFavorites(response.data.favorite_comics.map((c) => c.id));
        });
    }
  }, []);
  // console.log(comics);

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
  //   console.log(card);

  //   // append new card element to document
  //   const cardContainer = document.querySelector(".card-container");
  //   cardContainer.appendChild(card);
  // }

  const handleChange = async (e) => {
    axios
      .get(
        `https://8000-willbridge0-comiccrazeb-ckt42wxy9y8.ws-us95.gitpod.io/comics/?q=${e.target.value}`
      ) // may need a new port link per project reload
      .then((response) => {
        setComics(response.data);
      })
      .catch((error) => console.error(error));
  };

  let renderedComics = comics
    // .sort(() => 0.5 - Math.random())
    // .slice(0, 20)
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
          handleRemove={handleRemove}
          addToCart={addToCart}
        />
      );
    });

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <NavBar />
      <div data-aos="fade-left">
        <div className="p-2" id="comic-input">
          <input type="text" onChange={handleChange} />
        </div>
        {/* <div className="background-img1"> */}
        <div className="container-fluid g-0">
          <div className="row d-flex m-4 align-items-center">
            <h1 className="display-1 page-head">Comics</h1>
            <hr className="line"></hr>
          </div>
          <div className="row d-flex justify-content-center background-gradient">
            {renderedComics}
          </div>
        </div>
        {/* </div> */}
      </div>
      <Footer />
    </>
  );
}

export default Comics;
