import { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Email } from "../Context/emailContext.tsx";
import ButtonAppBar from "./header";
import { MapComponent } from "./OpenLairs";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import "../style/ProductScreen.css";

function ProductScreen() {
  const [product, setProduct] = useState<any>(null);
  const { paramsProduct } = useParams();
  const emailContext = useContext(Email);
  const email = emailContext?.email;

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
    <Card>
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={product.image_link}
      />
      <CardContent>
        <Link to={"/"} className="linkButton">
          <ButtonAppBar />
        </Link>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
        {Object.entries(product).map(([key, value]) =>
          key !== "id" &&
          key !== "_id" &&
          key !== "name" &&
          key !== "price" &&
          key !== "category" ? (
            key === "image_link" ? null : (
              <div key={key}>
                <strong>{key}:</strong> {value as React.ReactNode}
              </div>
            )
          ) : null
        )}

        <Button onClick={handleAddToCart} variant="contained" color="primary">
          Add to cart
        </Button>
        <Button onClick={handleCompare} variant="contained" color="secondary">
          Comparison
        </Button>
      </CardContent>
      <MapComponent />
    </Card>
  );
}

export default ProductScreen;
