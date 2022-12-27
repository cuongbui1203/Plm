import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { getAllUsersApi } from "../../API/productApi";
import Notification from "../../components/notification/notification";
import PaginationComponent from "../../components/pagination/Pagination";
import ProductLineComponent from "../../components/showProductLine/ProductLineComponent";
import ProductComponent from "../../components/showProducts/ProductComponent";
import UsersComponent from "../../components/User/UserComponent";
import { useDataContext } from "../../state/hook/hooks";
import "../product/Product.css";

function Users() {
  const [users, setProduct] = useState([]);
  const allUsersCount = users.length;
  const [UsersPerPage, setUsersPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  // const scrollPosition = useScroll();

  const lastSessionNumber = currentPage * UsersPerPage;
  const firstSessionIndex = lastSessionNumber - UsersPerPage;
  const limitedUsers = users.slice(firstSessionIndex, lastSessionNumber);
  // const [state,dispatch] = useStore()
  const [product, updateProduct] = useDataContext();

  async function getProduct() {
    let response = await getAllUsersApi();
    // dispatch(actions.setLoading(''))
    if (response.success) {
      Notification("success", "Get All Account Success");
      console.log(response.data);

      response.data.forEach((e) => {
        e.imgUrl = process.env.REACT_APP_API_ENDPOINT + e.imgPath;
      });
      setProduct(response.data);
      // await handleGetPlImage(response.data);
      // console.log(users);
    } else {
      Notification("error", "Get All Account Fail");
    }
  }

  useEffect(() => {
    getProduct().then((res) => {
      console.log(users);
      setCurrentPage(1);
    });
  }, []);
  // useEffect(() => {}, [users]);
  return (
    <div>
      <div>
        <Button onClick={getProduct}>Lấy toàn bộ tài khoản</Button>
      </div>
      <Container className="product">
        <UsersComponent products={limitedUsers} />
      </Container>
      <PaginationComponent
        itemsCount={allUsersCount}
        currentPage={currentPage}
        itemsPerPage={UsersPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Users;
