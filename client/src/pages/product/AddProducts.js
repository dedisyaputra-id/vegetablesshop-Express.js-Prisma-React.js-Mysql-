import Form from "../../components/Form";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { inputProduct } from "../../utils/input-product";
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProducts = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [productInput, setProductInput] = useState({
    name: "",
    stock: "",
    price: "",
    category_id: "",
  });

  const handleClick = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setProductInput({
      ...productInput,
      [e.target.name]: e.target.value,
    });
  };

  // const { fetchApi, isloading, error } = useFetch(
  //   "http://localhost:3200/api/products",
  //   {
  //     method: "post",
  //     headers: {
  //       Authorization: "c23b9fc4-f4ee-4c38-b937-f6fcc9a66249",
  //       "Content-Type": "multipart/form-data",
  //     },
  //     data: formData,
  //   }
  // );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productImg", image);
    formData.append("name", productInput.name);
    formData.append("stock", productInput.stock);
    formData.append("price", productInput.price);
    formData.append("category_id", productInput.category_id);

    try {
      await axios.post("http://localhost:3200/api/products", formData, {
        headers: {
          Authorization: "c23b9fc4-f4ee-4c38-b937-f6fcc9a66249",
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className="flex justify-content-center mt-4">
      <Col className="col-md-12 col-lg-5">
        <Card>
          <div className="card-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {inputProduct.map((property) => (
                <Form
                  key={property.id}
                  {...property}
                  onChange={handleChange}
                  onClick={handleClick}
                />
              ))}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default AddProducts;
