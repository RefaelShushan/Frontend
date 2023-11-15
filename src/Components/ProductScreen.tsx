import { useEffect, useState } from "react";
function ProductScreen() {
  const [product, setProduct] = useState<any>(null);
  const id = "1";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/spesific/${id}`
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
  }, []);
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="product-screen">
      <div className="product-details">
        <h1>{product.name}</h1>
        <p>${product.price}</p>
        <p>popularity: {product.popularity}</p>
      </div>
    </div>
  );
}
export default ProductScreen;
