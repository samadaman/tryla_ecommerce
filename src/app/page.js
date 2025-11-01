import Image from "next/image";
import BelowNavLinks from "../component/belowNavLinks";
import Header from "../component/header";
import CategoriesExplore from "../component/categoriesExplore";
import FeaturedProducts from "../component/featuredProducts";
import ProductSlider from "../component/productSlider";
import Footer from "../component/footer";
import HeroCarousel from "../component/heroCarousel";

export default function Home() {
  return (
    <div className="font-sans">
      <Header />
      <BelowNavLinks />
      <div className="container mx-auto px-4 my-8 md:my-16 lg:my-20">
      <div className="container mx-auto px-4 my-5 md:my-20 lg:my-16">
        <div className="w-full overflow-hidden">
          <HeroCarousel />
        </div>
      </div>
      </div>

      <CategoriesExplore />
      <FeaturedProducts />
      <ProductSlider />
      <Footer />

    </div>
  );
}
