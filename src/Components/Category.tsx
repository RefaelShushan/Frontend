import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ButtonAppBar from "./header";

interface Product {
  id: string;
  category: string;
  name: string;
  price: number;
}

export default function Category() {
  const { category }: Record<string, string | undefined> = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const productsData = await fetch("http://localhost:3000/api/products/");
        const products: Product[] = await productsData.json();
        const filteredProducts = products.filter(
          (product) => product.category === category
        );
        setProducts(filteredProducts);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    };
    fetchItems();
  }, [category]);

  return (
    <>
    <Link to={"/"} className="linkButton"><ButtonAppBar/> </Link>
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <Box
            key={product.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              mb: 2,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Typography component="h2" variant="h3" color="textPrimary">
              {product.name}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {product.price}
            </Typography>
          </Box>
        </Link>
      ))}
    </>
  );
}
