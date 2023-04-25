import Comic from "./Comic";
import NavBar from "./NavBar";
import { useState } from "react";

// const [cart, setCart] = useState([]);
//pass setCart function down through page
//could pass to a card component as a prop
//passed a variable to shopping cart

function Cart() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row m-4">
          <h1 className="display-1 page-head">Shopping Bag</h1>
        </div>
        <div className="row">
          <h3 className="display-4 page-head">Items</h3>
          <hr className="line"></hr>
        </div>
        <div className="row">
          <div className="col">
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="{comic.thumbnail}"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">title</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
