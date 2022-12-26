import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { getAllProductApi } from "../../API/productApi";
import Notification from "../../components/notification/notification";
import PaginationComponent from "../../components/pagination/Pagination";
import ProductComponent from "../../components/showProducts/ProductComponent";
import { data, testProduct } from "../../data";
import { handleGetUrlImage } from "../../hook/getInformation";
import { handleGetAllProduct } from "../../hook/productHook";
import { HeaderBar, SideBar } from "../../layout";
import { setImageUrlPL } from "../../state/actions/DataActions";
import { useDataContext } from "../../state/hook/hooks";
import "./Product.css";

function Product() {
  const [products, setProduct] = useState([]);
  const allProductCount = products.length;
  const [ProductPerPage, setProductPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const scrollPosition = useScroll();

  const lastSessionNumber = currentPage * ProductPerPage;
  const firstSessionIndex = lastSessionNumber - ProductPerPage;
  const limitedProduct = products.slice(firstSessionIndex, lastSessionNumber);
  // const [state,dispatch] = useStore()
  const [product, updateProduct] = useDataContext();
  async function getProduct() {
    let response = await getAllProductApi();
    // dispatch(actions.setLoading(''))
    if (response.success) {
      Notification("success", "Get All Product Success");
      console.log(response.data);

      response.data.forEach(async (e) => {
        const response2 = await handleGetUrlImage(e.imgId);
        e.imgUrl = response2;
      });
      setProduct(response.data);
      // await handleGetPlImage(response.data);
      // console.log(products);
    } else {
      Notification("error", "Get All Product Fail");
    }
  }

  useEffect(() => {
    getProduct().then((res) => {
      console.log(products);
      setCurrentPage(1);
    });
  }, []);
  // useEffect(() => {}, [products]);
  return (
    <div >
      <div>
        <Button onClick={getProduct}>btn</Button>
      </div>
      <Container className="product">
        <ProductComponent products={limitedProduct} /> 
      </Container>
      <PaginationComponent
        itemsCount={allProductCount}
        currentPage={currentPage}
        itemsPerPage={ProductPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Product;
