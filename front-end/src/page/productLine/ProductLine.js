import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { getAllProductLine } from "../../API/productApi";
import Notification from "../../components/notification/notification";
import PaginationComponent from "../../components/pagination/Pagination";
import ProductLineComponent from "../../components/showProductLine/ProductLineComponent";
import "../product/Product.css";

function ProductLine() {
  const [products, setProduct] = useState([]);
  const allProductCount = products.length;
  const [ProductPerPage, setProductPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  // const scrollPosition = useScroll();

  const lastSessionNumber = currentPage * ProductPerPage;
  const firstSessionIndex = lastSessionNumber - ProductPerPage;
  const limitedProduct = products.slice(firstSessionIndex, lastSessionNumber);
  // const [state,dispatch] = useStore()

  async function getProduct() {
    let response = await getAllProductLine();
    // dispatch(actions.setLoading(''))
    if (response.success) {
      Notification("success", "Get All Product Line Success");
      console.log(response.data);

      response.data.forEach((e) => {
        e.imgUrl = process.env.REACT_APP_API_ENDPOINT + e.imgPath;
      });
      setProduct(response.data);
      // await handleGetPlImage(response.data);
      // console.log(products);
    } else {
      Notification("error", "Get All Product Line Fail");
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
    <div>
      <div>
        <Button onClick={getProduct}>Lấy toàn bộ dòng sản phẩm</Button>
      </div>
      <Container className="product">
        <ProductLineComponent products={limitedProduct} />
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

export default ProductLine;
