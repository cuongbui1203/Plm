const Card = (props) => {
  let index = props.index;
  let item = props.item;
  return (
    <div
      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item"
      key={index}
    >
      <div className="m-2 card p-2">
        <img src={item.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.history}</p>
        </div>
      </div>
    </div>
  );
};
