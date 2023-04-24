import NavBar from "./NavBar";

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
        </div>
      </div>
    </div>
  );
}

export default Cart;
