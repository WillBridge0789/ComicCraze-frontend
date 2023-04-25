export default function Comic({
  comic,
  handleClick = null,
  handleRemove = null,
}) {
  return (
    <div
      className="card text-bg-secondary mb-3"
      style={{ maxWidth: "540px" }}
      data-aos="fade-up"
      data-aos-duration="350"
    >
      <div className="row g-0">
        <div className="col-6">
          <img
            src={comic.thumbnail}
            className="img-fluid rounded-start m-2"
            alt="..."
          />
        </div>
        <div className="col-6">
          <div className="card-body">
            <h5 className="card-title">{comic.title}</h5>
            <p className="card-text">{comic.description}</p>
            <div className="card-body">
              {handleClick && (
                <a
                  href="#"
                  className="btn btn-dark m-2"
                  onClick={() => handleClick(comic.id)}
                >
                  Favorite
                </a>
              )}
              <a href="#" className="btn btn-dark m-1">
                Add to Cart
              </a>
              <a
                href="#"
                className="btn btn-dark m-1"
                onClick={() => handleRemove(comic.id)}
              >
                Remove
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* // <div className="col">
    //   <div className="card" style={{ width: 18 + "rem" }}>
    //     <img src={comic.thumbnail} className="card-img-top" alt="..." />
    //     <div className="card-body">
    //       <h5 className="card-title">{comic.title}</h5>
    //       <p className="card-text">{comic.description}</p>
    //     </div>
    //     
    //      
    //         
    //       )}
    //       
    //     
    //   </div>
    // </div> */
}
