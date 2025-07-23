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
      <div className="container mx-auto px-4 my-5 md:my-20 lg:my-16">
        <div className="w-full overflow-hidden">
          <div className="relative w-full aspect-[16/6] md:aspect-[16/6] lg:aspect-[16/6]">
            <Image
              src="/images/banner.png"
              alt="Fashion Banner"
              fill
              className="object-cover w-full h-full rounded-2xl"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </div>
        </div>
      </div>

      <BrandsExplore />
      <FeaturedProducts />
      <ProductSlider />
      <Footer />

    </div>
  );
}
