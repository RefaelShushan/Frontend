import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductScreen() {
  const [product, setProduct] = useState<any>(null);
  const {paramsProduct} = useParams();

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
    
    console.log("Added to cart:", product);
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
    </div>
  );
}

export default ProductScreen;
