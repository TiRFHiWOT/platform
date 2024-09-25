import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-center"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.store}</p>
        <p className="text-md font-semibold text-gray-700 mt-2">
          {product.price}
        </p>
        <div className="mt-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
