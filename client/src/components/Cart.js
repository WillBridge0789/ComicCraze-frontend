import Comic from "./Comic";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalState";
import axios from "axios";

//pass setCart function down through page
//could pass to a card component as a prop
//passed a variable to shopping cart

function Cart() {
  const [state, dispatch] = useGlobalState();
  // const [cartItem, setCartItem] = useState(state.cart);

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

  const removeFromCart = (comicId) => {
    dispatch({
      ...state,
      cart: state.cart.filter((c) => c.id !== comicId),
    });
  };

  let renderedCartItems = state.cart.map((comic) => (
    <Comic key={comic.id} comic={comic} removeFromCart={removeFromCart} />
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
