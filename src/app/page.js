import Image from "next/image";
import BelowNavLinks from "../component/belowNavLinks";
import Header from "../component/header";
import BrandsExplore from "../component/brandsExplore";
import FeaturedProducts from "../component/featuredProducts";
import ProductSlider from "../component/productSlider";
import Footer from "../component/footer";

export default function Home() {
  return (
    <div className="font-sans">
      <Header />
      <BelowNavLinks />
      <div className="container mx-auto px-4">
      <div className="relative h-[600px] w-full">
        <Image
          src="/images/banner.png"
          alt="Fashion Banner"
          fill
          className="object-cover rounded-2xl"
          priority
        />
      </div>
      </div>

      <BrandsExplore />
      <FeaturedProducts />
      <ProductSlider />
      <Footer />

    </div>
  );
}
