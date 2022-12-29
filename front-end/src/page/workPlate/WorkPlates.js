import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { getAllWorkPlatesApi } from "../../API/Other";
import Notification from "../../components/notification/notification";
import PaginationComponent from "../../components/pagination/Pagination";
import WorkPlatesComponent from "../../components/workPlates/WorkPlatesComponent";
import { useDataContext } from "../../state/hook/hooks";

const WorkPlates = () => {
  const [products, setProduct] = useState([]);
  const allProductCount = products.length;
  const [ProductPerPage, setProductPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  // const scrollPosition = useScroll();

  const lastSessionNumber = currentPage * ProductPerPage;
  const firstSessionIndex = lastSessionNumber - ProductPerPage;
  const limitedProduct = products.slice(firstSessionIndex, lastSessionNumber);
  // const [state,dispatch] = useStore()
  const [product, updateProduct] = useDataContext();

  async function getProduct() {
    const response = await getAllWorkPlatesApi();
    if (response.success) {
      Notification("success", "Get all Work Plate successful");
      setProduct(response.data);
      // console.log(response.data);
    } else {
      Notification("error", "Get all work plate fails");
    }
  }

  useEffect(() => {
    getProduct().then(() => {
      console.log(products);
      setCurrentPage(1);
    });
  }, []);
  // useEffect(() => {}, [products]);
  return (
    <div>
      <div>
        <Button onClick={getProduct}>Get All Work Plate</Button>
      </div>
      <Container className="product">
        <WorkPlatesComponent workPlates={limitedProduct} />
      </Container>
      <PaginationComponent
        itemsCount={allProductCount}
        currentPage={currentPage}
        itemsPerPage={ProductPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default WorkPlates;
