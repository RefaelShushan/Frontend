import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

interface Product {
    id: string;
    category: string;
    name: string;
    price: number;
}

interface Params {
    category: string;
}

export default function Category() {
    const { category } = useParams<Params>();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const productsData = await fetch('http://localhost:3000/api/products/');
                const products: Product[] = await productsData.json();
                const filteredProducts = products.filter(product => product.category === category);
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
            {products.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                    <Box
                        key={product.id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            mb: 2,
                            textDecoration: 'none',
                            color: 'inherit',
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

