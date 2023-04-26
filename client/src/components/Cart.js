import Comic from "./Comic";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalState";
import axios from "axios";

//pass setCart function down through page
//could pass to a card component as a prop
//passed a variable to shopping cart

function Cart() {
  const [cartItem, setCartItem] = useState([]);
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    axios
      .get(
        `https://8000-willbridge0-comiccrazeb-ckt42wxy9y8.ws-us95.gitpod.io/orders/`
      ) // may need a new port link per project reload
      .then((response) => {
        // setCartItem(response.data.cart_item);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleRemove = (comicId) => {
    axios
      .delete(
        `https://8000-willbridge0-comiccrazeb-ckt42wxy9y8.ws-us95.gitpod.io/users/${state.currentUser.user_id}/delete-favorite/${comicId}`
      )
      .then(() => {
        setCartItem(cartItem.filter((c) => c.id !== comicId));
      });
  };
  console.log(cartItem);
  let renderedCartItems = state.cart.map((comic) => (
    <Comic key={comic.id} comic={comic} />
  ));

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <h1 className="display-1 page-head">Cart</h1>
          <hr className="line"></hr>
        </div>
        <div className="row m-3">{renderedCartItems}</div>
      </div>
    </div>
  );
}

export default Cart;
