import {Button, TextField} from "@mui/material";
import { Link } from "react-router-dom";
import {useState,useEffect} from 'react'

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

  return (
    <div>
     
     <Button> <Link to={"/signUp"} className="linkButton">signUp </Link></Button>
      <Button><Link to={"/signIn"} className="linkButton"> signIn </Link>  </Button>
      <h1>Main Page</h1>
      {categories  ? (
        categories.map(category => (
          <div key={category.id}> 
            <h2>{category.name}</h2>
            <button><img src={category.image} width={100}/></button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <h1>Category Popular</h1>
    </div>
  );
}