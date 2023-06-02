export default function Comic({
  comic,
  addToFavorites = null,
  addToCart = null,
  removeFromCart = null,
}) {
  return (
    <div
      className="card text-bg-light mb-3"
      style={{ maxWidth: "540px" }}
      data-aos="fade-up"
      data-aos-duration="150"
    >
      <div className="row d-flex justify-content-center g-0">
        <div className="col-md-6">
          <img
            src={comic.thumbnail}
            className="img-fluid rounded-start m-2"
            alt="comic book cover"
          />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{comic.title}</h5>
            <p className="card-text">{comic.description}</p>
            <p className="card-text">Price: {comic.description?.match(/[$]\d+[.]\d\d/) || 'Not Found'}</p>
            <div className="card-body">
              {addToFavorites && (
                <button
                  className="btn btn-dark m-2"
                  onClick={() => addToFavorites(comic.id)}
                >
                  Favorite
                </button>
              )}
              <button
                className="btn btn-dark m-1"
                onClick={() => addToCart(comic)}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-dark m-1"
                onClick={() => removeFromCart(comic.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
