import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 60000,
  },
  {
    id: 2,
    name: "Mobile",
    price: 30000,
  },
  {
    id: 3,
    name: "Keyboard",
    price: 2000,
  },
  {
    id: 4,
    name: "Mouse",
    price: 1000,
  },
  {
    id: 5,
    name: "Monitor",
    price: 15000,
  },
];

const ProductList = () => {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");

    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <section>
      <h2>useMemo Practice</h2>

      <input
        type="text"
        placeholder="Search product"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      <div>
        {filteredProducts.map((product) => (
          <p key={product.id}>
            {product.name} - ₹{product.price}
          </p>
        ))}
      </div>
    </section>
  );
};

export default ProductList;