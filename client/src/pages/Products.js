import { Table, Breadcrumb, Row, Col, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { inputProduct } from "../utils/input-product";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState({
    productImg: "",
    name: "",
    stock: "",
    price: "",
    category_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      await axios
        .get("http://localhost:3200/api/products", {
          headers: { Authorization: "c23b9fc4-f4ee-4c38-b937-f6fcc9a66249" },
        })
        .then((result) => setProducts(result.data.data));
    } catch (error) {
      setError(error.response.data.errors);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleChange = (e) => {
    setProductInput({
      ...productInput,
      productImg: e.target.files,
      [e.target.name]: e.target.value,
    });
  };

  const productData = new FormData();
  productData.append("product", productInput);
  console.log(productData);
  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    try {
      await axios.post("http://localhost:3200/api/products", productData, {
        headers: { Authorization: "c23b9fc4-f4ee-4c38-b937-f6fcc9a66249" },
      });
    } catch (error) {
      setError(error.response.data.errors);
    }

    setLoading(false);
  };

  return (
    <div>
      <Row className="mt-4">
        <Col className="col-md-12 col-lg-6">
          <h1>Products Data</h1>
        </Col>
        <Col className="col-md-12 col-lg-6 text-end">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleShowModal}
          >
            <i className="fa-solid fa-plus" style={{ paddingRight: ".3rem" }} />
            Add Product
          </button>
          <Modal show={showModal} onHide={handleShowModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Modal.Body>
                {inputProduct.map((property, i) => (
                  <Form
                    key={i}
                    label={property.label}
                    type={property.type}
                    placeholder={property.placeholder}
                    required={property.required}
                    name={property.name}
                    min={property.min}
                    tag={property.tag}
                    onChange={handleChange}
                  />
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleShowModal}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
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
                <img src={product.image} alt="no image" className="img-fluid" />
              </td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.price}</td>
              <td>{product.category.name}</td>
              <td>
                <a
                  href="#"
                  className="text-white btn btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </a>
                <a
                  href="#"
                  className="text-white btn btn-danger"
                  style={{ textDecoration: "none", marginLeft: ".3rem" }}
                >
                  <i className="fa-solid fa-trash"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
