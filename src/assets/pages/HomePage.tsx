import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './homepage.css';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

// Mock function to fetch products
export const fetchProducts = async () => {
  return [
    {
      id: "1",
      name: "Brufen Cream",
      description: "Brufen Cream 30G",
      price: 96.00,
      imageUrl: "/image/brufencream.webp",
    },
    {
      id: "2",
      name: "Nexton Baby",
      description: "Nexton Baby Diaper Care Cream 75Ml",
      price: 250.00,
      imageUrl: "/image/nexten baby.webp",
    },
    {
      id: "3",
      name: "Panadol Extra",
      description: "Panadol Extra Tablets (1 Strip = 10 Tablets)",
      price: 34.00,
      imageUrl: "/image/panadol.webp",
    },
    {
      id: "4",
      name: "De-Lice Shampoo",
      description: "De-Lice Shampoo 1% 60Ml",
      price: 750.00,
      imageUrl: "/image/de-lice.webp",
    },
    {
      id: "5",
      name: "Lal Sharbat",
      description: "Qarshi Lal Sharbat 240Ml",
      price: 89.00,
      imageUrl: "/image/lal sharbat.webp",
    },
    {
      id: "6",
      name: "Johar Joshanda",
      description: "Johar Joshanda Sachet (1 Box = 30 Sachets)",
      price: 25.00,
      imageUrl: "/image/11647.webp",
    },
    {
      id: "7",
      name: "Ensure Milk",
      description: "Ensure Milk Powder Vanilla 400G",
      price: 2945.00,
      imageUrl: "/image/ensure.webp",
    },
    {
      id: "8",
      name: "Digital BP Monitor",
      description: "Bm407 Digital Blood Pr Monitor Blood Pressure Monitoring Device",
      price: 5400.00,
      imageUrl: "/image/bpm.webp",
    },
    {
      id: "9",
      name: "Johnsons Baby Wipes",
      description: "Johnsons Baby Wipes",
      price: 300.00,
      imageUrl: "/image/wipes.webp",
    },
    {
      id: "10",
      name: "Johnsons Baby",
      description: "Johnsons Baby Essentials Baby Gift Set 3Pcs",
      price: 1789.00,
      imageUrl: "./image/babe.webp",
    },
  ];
};

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsFromDatabase = await fetchProducts();
      setProducts(productsFromDatabase);
    };

    loadProducts();
  }, []);

  const handleDragStart = (e: any) => e.preventDefault();

  const items = [

    <img src="public\coursel\Dvago140-web-banner.png" alt="Image 1" onDragStart={handleDragStart} role="presentation" />,
    <img src="public\coursel\Eid20web 20banner.png" alt="Image 2" onDragStart={handleDragStart} role="presentation" />,
    // <img src="public\coursel\getz-pharma-web.png" alt="Image 3" onDragStart={handleDragStart} role="presentation" />,
    <img src="public\coursel\Rederm20Banner282 29.png" alt="Image 4" onDragStart={handleDragStart} role="presentation" />,
    <img src="public\coursel\vouch-web-banner.png" alt="Image 5" onDragStart={handleDragStart} role="presentation" />,
  ]


  return (
    <div className="homepage-container ">
      <div className="!mb-20">
        <AliceCarousel mouseTracking items={items} autoPlay autoPlayInterval={2000} infinite autoHeight disableButtonsControls disableDotsControls={true} disableSlideInfo ></AliceCarousel>
      </div>

      <div className="content !mb-20">
        <section className="products ">
          <div className="w-1/5 flex justify-end items-between !mb-5">
            <h2 className="productheadline w-full">Products</h2>
          </div>
          <div className="product-list">
            {products.map((product) => (

              <Card className=" h-full bg-white rounded-lg overflow-hidden product-item flex flex-col justify-center items-center" key={product.id}>
                <CardContent className="p-4">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-800 font-bold">Price: {product.price} PKR</p>
                </CardContent>
                <CardFooter className="flex justify-between p-4">
                  <Link to={`/cart`} className="add-to-cart-button">
                    Add to Cart
                  </Link>
                  <Link to={`/view/${product.id}`} className="view-button">
                    View
                  </Link>
                </CardFooter>
              </Card>

              // <div className="product-item flex flex-col justify-center items-center" key={product.id}>
              //   <img src={product.imageUrl} alt={product.name} className="product-image1" />
              //   <h3>{product.name}</h3>
              //   <p>{product.description}</p>
              //   <p>Price: {product.price}  PKR </p>
              //   <div className="button-group">
              //     <Link to={`/cart`} className="add-to-cart-button">
              //       Add to Cart
              //     </Link>
              //     <Link to={`/view/${product.id}`} className="view-button">
              //       View
              //     </Link>
              //   </div>
              // </div>
            ))}
          </div>
        </section>
      </div>
      <div className="flex flex-col justify-center items-center !mb-20">
        <div className="w-full flex justify-start items-start !mb-5">
          <h2 className="productheadline w-1/5 ">Categories</h2>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-3/5 "
        >
          <CarouselContent className="space-x-5">
            {/* {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <img
                    src={`/coursel/image${index + 1}.png`}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              </CarouselItem>
            ))} */}
            {products.map((product) => (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={product.id}>

                <Card className=" h-full bg-white shadow-lg rounded-lg overflow-hidden product-item flex flex-col justify-center items-center" key={product.id}>
                  <CardContent className="p-4">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
                    <h3 className="text-lg font-semibold">{product.name}</h3>

                  </CardContent>
                  {/* <CardFooter className="flex justify-between p-4">
                    <Link to={`/cart`} className="add-to-cart-button">
                      Add to Cart
                    </Link>
                    <Link to={`/view/${product.id}`} className="view-button">
                      View
                    </Link>
                  </CardFooter> */}
                </Card>

                {/* <div className="product-item flex flex-col justify-center items-center" key={product.id}>
                  <img src={product.imageUrl} alt={product.name} className="product-image1" />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: {product.price}  PKR </p>
                  <div className="button-group">
                    <Link to={`/cart`} className="add-to-cart-button">
                      Add to Cart
                    </Link>
                    <Link to={`/view/${product.id}`} className="view-button">
                      View
                    </Link>
                  </div>
                </div> */}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="content !mb-20">
        <section className="products ">
          <div className="w-1/5 flex justify-end items-between !mb-5 ">
            <h2 className="productheadline w-full">Products</h2>
          </div>
          <div className="product-list">
            {products.map((product) => (

              <Card className=" h-full bg-white rounded-lg overflow-hidden product-item flex flex-col justify-center items-center" key={product.id}>
                <CardContent className="p-4">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-800 font-bold">Price: {product.price} PKR</p>
                </CardContent>
                <CardFooter className="flex justify-between p-4">
                  <Link to={`/cart`} className="add-to-cart-button">
                    Add to Cart
                  </Link>
                  <Link to={`/view/${product.id}`} className="view-button">
                    View
                  </Link>
                </CardFooter>
              </Card>

              // <div className="product-item flex flex-col justify-center items-center" key={product.id}>
              //   <img src={product.imageUrl} alt={product.name} className="product-image1" />
              //   <h3>{product.name}</h3>
              //   <p>{product.description}</p>
              //   <p>Price: {product.price}  PKR </p>
              //   <div className="button-group">
              //     <Link to={`/cart`} className="add-to-cart-button">
              //       Add to Cart
              //     </Link>
              //     <Link to={`/view/${product.id}`} className="view-button">
              //       View
              //     </Link>
              //   </div>
              // </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
