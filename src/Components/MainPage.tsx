import {Button, TextField} from "@mui/material";
import { Link } from "react-router-dom";
import {useState,useEffect} from 'react'
import NavBar from "./header";

interface Category {
  id: number;
  name: string;
  image: string;
  popularity: number;
}

// interface CategoriesArray {
//   categories: Category[];
// }

export default function MainPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoriesPopular, setCategoriesPopular] = useState<Category[] | null>(null);
  const [productsPopular, setProductsPopular] = useState<Category[] | null>(null);

 
  useEffect(() => {
    fetch('http://localhost:3000/api/category/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Category[]) => {
        
        setCategories([...data]);
        
      })
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/category/popularity ')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Category[]) => {
        
        setCategoriesPopular([...data]);
        
      })
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/products/popularity')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((dataProductPopular: Category[]) => {
        
        setProductsPopular([...dataProductPopular]);
        
      })
  }, []);

  const handleButtonClick = (categoryId: number) => {
  
    fetch(`http://localhost:3000/api/category/${categoryId}`, {
      method: 'PUT',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
      })
      // .catch(error => {
      //   console.error('Error updating popularity:', error);
      // });
  };


  return (
    <div>
      <Link to={"/"} className="linkButton"><NavBar/> </Link>
     <Button> <Link to={"/signUp"} className="linkButton">signUp </Link></Button>
      <Button><Link to={"/signIn"} className="linkButton"> signIn </Link>  </Button>
      <h1>Main Page</h1>
      {categories  ? (
        categories.map(category => (
          <div>
          <Link key={category.id} to={`/category/${category.name}`}>
            <h2>{category.name}</h2>
            <button onClick={() => handleButtonClick(category.id)}><img src={category.image} width={100}/></button></Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <h1>Category Popular</h1>
      {categoriesPopular  ? (
        categoriesPopular.map(categoryPopular => (
          <div>
          <Link key={categoryPopular.id} to={`/category/${categoryPopular.name}`}>
            <h2>{categoryPopular.name}</h2>
            <button><img src={categoryPopular.image} width={100}/></button></Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <h1>Products Popular</h1>
      {productsPopular  ? (
        productsPopular.map(productPopular => (
          <div>
          <Link key={productPopular.id} to={`/product/${productPopular.id}`}>
            <button><h2>{productPopular.name}</h2></button>
            <img src={productPopular.image} width={100}/>
            </Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}