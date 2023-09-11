import { Table, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Products = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useFetch("http://localhost:3200/api/products", {
    method: "get",
    headers: { Authorization: "c23b9fc4-f4ee-4c38-b937-f6fcc9a66249" },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <Row className="mt-4">
        <Col className="col-md-12 col-lg-6">
          <h1>Products Data</h1>
        </Col>
        <Col className="col-md-12 col-lg-6 text-end">
          <Link to="/add/products" className="btn btn-success">
            <i className="fa-solid fa-plus" style={{ paddingRight: ".3rem" }} />
            Add Product
          </Link>
        </Col>
      </Row>

      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active href="/">
          Products
        </Breadcrumb.Item>
      </Breadcrumb>
      <Table className="my-4 table-bordered">
        <thead align="center">
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody align="center">
          {products.map((product, i) => (
            <tr key={product.id}>
              <td>{i + 1}</td>
              <td>
                <img
                  src={"../../assets/products/" + product.image}
                  alt="no image"
                  className="img-fluid img-thumbnail"
                  width="100px"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.price}</td>
              <td>{product.category.name}</td>
              <td>
                <Link
                  to="#"
                  className="text-white btn btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <Link
                  to="#"
                  className="text-white btn btn-danger"
                  style={{ marginLeft: ".3rem" }}
                >
                  <i className="fa-solid fa-trash"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
