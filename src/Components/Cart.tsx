import {useContext, useEffect, useState} from "react";

import {Email} from "../Context/emailContext.tsx";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";


interface Product {
    id: string;
    category: string;
    name: string;
    price: number;
    image: string
}

export default function Cart() {
    const [products, setProducts] = useState<Product[]>([]);
    const emailContext = useContext(Email);
    const email = emailContext?.email;
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const productsData = await fetch(`http://localhost:3000/api/users/cartarr/${email}`);
                const products: Product[] = await productsData.json();
                setProducts(products);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                }
            }
        };
        fetchItems();
    }, []);
    return(
        <>
            {products.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick={async () => {
                                const res = await fetch(
                                    `http://localhost:3000/api/users/delete/${email}`,
                                    {
                                        headers: {"content-Type": "application/json"},
                                        method: 'put',
                                        body: JSON.stringify({id: product.id})
                                    }
                                )
                                if (res.ok) {
                                    setProducts(products => products.filter(prod =>
                                    prod.id !== product.id
                                    ))
                                }
                            }}
                                    size="small" color="primary">
                                REMOVE
                            </Button>
                        </CardActions>
                    </Card>
                </Link>
            ))}
        </>
    )
}