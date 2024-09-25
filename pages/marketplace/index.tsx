import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/marketplaceSlice";
import ProductCard from "../../components/ProductCard";

export default function MarketplacePage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.marketplace);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Discover Local Products</h1>
      <SearchBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
