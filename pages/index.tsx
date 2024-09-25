import Link from "next/link";
import ProductCard from "../components/ProductCard/page";
import HeroSection from "@/components/Hero/page";
import Navbar from "@/components/Header/page";
import EventsSection from "@/components/Event/page";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <EventsSection />

      {/* Marketplace Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Marketplace
            </h2>
            <Link href="/marketplace">
              <div className="text-blue-600 hover:underline">
                View All Products
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ProductCard Components */}
            <ProductCard
              product={{
                name: "Handmade Pottery",
                price: "$45",
                store: "Local Crafts",
                image: "/product1.jpg",
              }}
            />
            <ProductCard
              product={{
                name: "Organic Honey",
                price: "$20",
                store: "Farmer's Market",
                image: "/product2.jpg",
              }}
            />
            <ProductCard
              product={{
                name: "Leather Wallet",
                price: "$60",
                store: "Artisan Goods",
                image: "/product3.jpg",
              }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>&copy; 2024 Hyperlocal Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
