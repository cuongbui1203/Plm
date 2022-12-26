import { useEffect } from "react";
import { handleGetImage } from "../../hook/getInformation";

const User = (props) => {
  let user = props.user;
  console.log(user);

  // useEffect(() => {
  //   document.getElementById("image").appendChild(handleGetImage(user.imageId));
  // });
  return (
    <div
      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item"
      
    >
      <div className="m-2 card p-2" id="userCard">
        <img src={props.image} alt="none" />
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
