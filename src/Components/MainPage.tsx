import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ButtonAppBar from "./header";
import "../style/MainPage.css";
import ActionAreaCard from "./mainPageCategory";
import CardCategoryPopular from "./categoryPopular";

interface Category {
  id: number;
  name: string;
  image: string;
  popularity: number;
}

export default function MainPage() {
  const [productsPopular, setProductsPopular] = useState<Category[] | null>(
    null
  );

  useEffect(() => {
    fetch("http://localhost:3000/api/products/popularity")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataProductPopular: Category[]) => {
        setProductsPopular([...dataProductPopular]);
      });
  }, []);
  
  return (
    <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      <Link to={"/"} className="linkButton">
        <ButtonAppBar />
      </Link>
      <h1>Main Page</h1>

      <ActionAreaCard />

      <h1>Category Popular</h1>

      <CardCategoryPopular/>

      <h1>Products Popular</h1>
      {productsPopular ? (
        productsPopular.map((productPopular) => (
          <div className="divCreateCard">
            <Link key={productPopular.id} to={`/product/${productPopular.id}`}>
              <button>
                <h2>{productPopular.name}</h2>
              </button>
              <img src={productPopular.image} width={100} />
            </Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
}
