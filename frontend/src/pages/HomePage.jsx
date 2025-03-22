import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { PlusCircleIcon, RefreshCcwIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { products, loading, error, fetchProducts} = useProductStore();

  useEffect(() => {
    fetchProducts();
  },[fetchProducts]);

  //// console.log("products:", products);
  
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 ">
      <section className="flex items-center justify-between mb-8">
        <button className="btn btn-primary">
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>

        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCcwIcon className="size-5" />
        </button>
      </section>

      {/* Error handler */}
      {error && <div className="alert alert-error mb-8">{error}</div>}

      {/* Loading & data handler */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  )
}

export default HomePage;