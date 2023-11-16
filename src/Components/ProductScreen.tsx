import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Email } from "../Context/emailContext.tsx";
import ButtonAppBar from "./header";
import { Link } from "react-router-dom";
import { MapComponent } from "./OpenLairs";
import "../style/ProductScreen.css";

function ProductScreen() {
  const [product, setProduct] = useState<any>(null);
  const { paramsProduct } = useParams();
  const emailContext = useContext(Email);
  const { email } = emailContext;
  console.log(email);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/spesific/${paramsProduct}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [paramsProduct]);

  const handleAddToCart = () => {
    if (email) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      fetch(`http://localhost:3000/api/users/update/${email}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({ id: product.id }),
      });
    } else {
      const storedValue = localStorage.getItem("cartItems");
      const existingCart: any[] = storedValue ? JSON.parse(storedValue) : [];
      const isProductInCart = existingCart.some(
        (item) => item.id === product.id
      );
      if (!isProductInCart) {
        const updatedCart = [...existingCart, product];
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        console.log("Added to cart:", product);
      } else {
        console.log("Product is already in the cart");
      }
    }
  };

  const handleCompare = () => {
    console.log("Added to comparison:", product);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-screen">
      <div className="product-details">
        <Link to={"/"} className="linkButton">
          <ButtonAppBar />
        </Link>
        <h1>{product.name}</h1>
        <p>${product.price}</p>
        {Object.entries(product).map(([key, value]) =>
          key !== "id" &&
          key !== "_id" &&
          key !== "name" &&
          key !== "price" &&
          key !== "category" ? (
            key === "image_link" ? null : (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            )
          ) : null
        )}

        {product.image_link && (
          <div>
            <strong></strong>
            <div
              dangerouslySetInnerHTML={{
                __html: `<img src="${product.image_link}" alt="Product" width="100"/>`,
              }}
            />
          </div>
        )}

        <button onClick={handleAddToCart}>Add to cart</button>
        <button onClick={handleCompare}>Comparison</button>
      </div>
      <MapComponent />
    </div>
  );
}

export default ProductScreen;
