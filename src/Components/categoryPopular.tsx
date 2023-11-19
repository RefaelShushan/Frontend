import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  image: string;
  popularity: number;
}

export default function CardCategoryPopular() {
  const [categoriesPopular, setCategoriesPopular] = useState<Category[] | null>(null);
//   const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/category/popularity ")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Category[]) => {
        setCategoriesPopular([...data]);
      });
  }, []);

//   const handleButtonClick = (category: Category) => {
//     fetch(`http://localhost:3000/api/category/${category.id}`, {
//       method: "PUT",
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Network response was not ok - ${response.statusText}`);
//         }
//       })
//       .catch((error) => {
//         console.error("There was a problem with the fetch operation:", error);
//       });
    // navigate(`/category/${category.name}`);
//   };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}
    >
      {categoriesPopular ? (
        categoriesPopular.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.name}`}
            >
          <Card
            key={category.id}
            // onClick={() => handleButtonClick(category)}
            sx={{
              width: 345,
              margin: "10px",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={category.image}
                alt={category.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {category.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Link>
        ))
      ) : (
        <div>No categories available</div>
      )}
    </Box>
  );
}