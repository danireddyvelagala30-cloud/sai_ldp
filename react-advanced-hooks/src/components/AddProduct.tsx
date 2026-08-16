import {
  useCallback,
  useState,
} from "react";

const AddProduct = () => {
  const [products, setProducts] = useState<string[]>([]);
  const [productName, setProductName] = useState("");

  const addProduct = useCallback(() => {
    if (productName.trim() === "") {
      return;
    }

    setProducts((previousProducts) => [
      ...previousProducts,
      productName,
    ]);

    setProductName("");
  }, [productName]);

  return (
    <section>
      <h2>useCallback Practice</h2>

      <input
        type="text"
        value={productName}
        placeholder="Product name"
        onChange={(event) =>
          setProductName(event.target.value)
        }
      />

      <button onClick={addProduct}>
        Add Product
      </button>

      <ul>
        {products.map((product, index) => (
          <li key={`${product}-${index}`}>
            {product}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AddProduct;