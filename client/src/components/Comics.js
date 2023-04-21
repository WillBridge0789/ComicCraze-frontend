import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
// import './css/style.css';
// import backgroundImg from 'public/marvel_display_img2.jpg';

function Comics() {
  const [comics, setComics] = useState([]);
  useEffect(() => {
    fetch(
      "https://8000-willbridge0-comiccrazeb-ckt42wxy9y8.ws-us95.gitpod.io/comics/" //may need a new port link per project reload
    )
      .then((response) => response.json())
      .then((data) => {
        setComics(data);
      })
      .catch((error) => console.error(error));
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

  let renderedComics = comics
    .sort(() => .5 - Math.random())
    .slice(0, 20)
    .map((comic) => {
      return (
        <div className="col">
          <div className="card" style={{ width: 18 + "rem" }}>
            <img src={comic.thumbnail} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{comic.title}</h5>
              <p className="card-text">{comic.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Price</li>
            </ul>
            <div className="card-body">
              <a href="#" className="btn btn-dark m-2">
                Favorite
              </a>
              <a href="#" className="btn btn-dark m-2">
                Add to Cart
              </a>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row m-3">{renderedComics}</div>
      </div>
    </div>
  );
}

export default Comics;
