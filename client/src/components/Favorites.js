import NavBar from "./NavBar";

function Favorites() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <h1>My Favorites</h1>
          <h2>Category 1</h2>
        </div>
        <div className="row">
          <div className="col">
            <div className="card" style={{ width: 18 + "rem" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: 18 + "rem" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: 18 + "rem" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
