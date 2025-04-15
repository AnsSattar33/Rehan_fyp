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
import { UseSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { addItem } from "@/lib/redux/cartSlice";
// Mock function to fetch products
export const fetchProducts = async () => {

  return [
    {
      id: "1",
      name: "Brufen Cream 30G",
      brand: "Abbott",
      price: 96.00,
      description: "Used for relief of muscle and joint pain.",
      imageUrl: "/image/brufencream.webp",
      quantity: 1,
      requiresPrescription: false,
      generics: "Ibuprofen",
      usedFor: "Muscle pain, joint pain",
      howItWorks: "Works by reducing hormones that cause inflammation and pain in the body.",
      dosage: "Apply a thin layer to the affected area 2-3 times daily.",
      sideEffects: "Skin irritation, rash, redness, burning sensation.",
      drugInteractions: "Avoid using with other NSAIDs on the same area.",
      indication: "Pain relief from muscle and joint inflammation.",
      whenNotToUse: "Do not use on broken or infected skin."
    },
    {
      id: "2",
      name: "Nexton Baby Diaper Care Cream 75Ml",
      brand: "Nexton",
      price: 250.00,
      description: "Protects baby's skin from rashes and irritation caused by diapers.",
      imageUrl: "/image/nexten baby.webp",
      quantity: 1,
      requiresPrescription: false,
      generics: "Zinc Oxide",
      usedFor: "Diaper rash",
      howItWorks: "Forms a protective barrier on the skin to repel moisture.",
      dosage: "Apply during every diaper change.",
      sideEffects: "Rare skin irritation or allergic reaction.",
      drugInteractions: "None known.",
      indication: "Prevents and treats diaper rash.",
      whenNotToUse: "Avoid if allergic to any ingredient."
    },
    {
      id: "3",
      name: "Panadol Extra Tablets (1 Strip = 10 Tablets)",
      brand: "GSK",
      price: 34.00,
      description: "Used for headache, migraine, toothache, and general pain relief.",
      imageUrl: "/image/panadol.webp",
      quantity: 1,
      requiresPrescription: false,
      generics: "Paracetamol + Caffeine",
      usedFor: "Pain and fever",
      howItWorks: "Paracetamol reduces pain and fever, caffeine enhances pain relief.",
      dosage: "1-2 tablets every 4-6 hours (max 8 tablets/day).",
      sideEffects: "Nausea, insomnia, allergic reactions.",
      drugInteractions: "Other paracetamol-containing products, blood thinners.",
      indication: "Mild to moderate pain and fever.",
      whenNotToUse: "Liver disease, caffeine sensitivity."
    },
    {
      id: "4",
      name: "De-Lice Shampoo 1% 60Ml",
      brand: "GETZ Pharma",
      price: 750.00,
      description: "Used to treat head lice infestations.",
      imageUrl: "/image/de-lice.webp",
      quantity: 1,
      requiresPrescription: false,
      generics: "Permethrin 1%",
      usedFor: "Head lice",
      howItWorks: "Paralyzes and kills lice and their eggs.",
      dosage: "Apply to wet hair, leave for 10 minutes, rinse thoroughly.",
      sideEffects: "Itching, redness, scalp irritation.",
      drugInteractions: "None significant.",
      indication: "Lice treatment.",
      whenNotToUse: "Do not use on broken or inflamed skin."
    },
    {
      id: "5",
      name: "Qarshi Lal Sharbat 240Ml",
      brand: "Qarshi",
      price: 89.00,
      description: "A traditional herbal drink used to cool the body.",
      imageUrl: "/image/lal sharbat.webp",
      quantity: 1,
      requiresPrescription: false,
      generics: "Herbal blend",
      usedFor: "Heatstroke, thirst",
      howItWorks: "Cools down the body temperature naturally.",
      dosage: "Mix 2 tablespoons in a glass of cold water.",
      sideEffects: "None known.",
      drugInteractions: "None known.",
      indication: "Used in hot weather for hydration.",
      whenNotToUse: "If allergic to any herbal ingredient."
    },
    {
      id: "6",
      name: "Johar Joshanda Sachet (1 Box = 30 Sachets)",
      brand: "Hamdard",
      price: 25.00,
      description: "Herbal remedy used for cold, flu, cough, and sore throat.",
      imageUrl: "/image/11647.webp",
      quantity: 1,
      requiresPrescription: false,
      generics: "Herbal formulation",
      usedFor: "Cold, cough, flu",
      howItWorks: "Provides soothing effect and relieves congestion and throat irritation.",
      dosage: "1 sachet in hot water, 2-3 times a day.",
      sideEffects: "Drowsiness, mild stomach discomfort (rare).",
      drugInteractions: "None known.",
      indication: "Respiratory relief and immune support.",
      whenNotToUse: "Avoid in case of known allergy to herbs used in the product."
    },
    {
      id: "7",
      name: "Ensure Milk Powder Vanilla 400G",
      brand: "Abbott",
      price: 2945.00,
      description: "Complete, balanced nutrition for adults with high protein and essential nutrients.",
      imageUrl: "/image/ensure.webp",
      quantity: 1,
      requiresPrescription: false,
      generics: "Nutritional supplement",
      usedFor: "Malnutrition, elderly nutrition, recovery",
      howItWorks: "Provides essential vitamins, minerals, protein, and calories.",
      dosage: "Mix 6 scoops in 190 ml of water 1-2 times daily.",
      sideEffects: "Mild bloating or stomach discomfort in some individuals.",
      drugInteractions: "None significant.",
      indication: "Nutritional support for adults.",
      whenNotToUse: "Not suitable for people with galactosemia or lactose intolerance (unless lactose-free version is used)."
    },
    {
      id: "8",
      name: "Bm407 Digital Blood Pr Monitor Blood Pressure Monitoring Device",
      brand: "BM407",
      price: 5400.00,
      description: "Digital device to monitor blood pressure at home.",
      imageUrl: "/image/bpm.webp",
      quantity: 1,
      requiresPrescription: false,
      generics: "N/A (Medical Device)",
      usedFor: "Blood pressure monitoring",
      howItWorks: "Uses oscillometric method to detect blood pressure via cuff inflation.",
      dosage: "Use as per instructions (usually 1-2 times daily or as directed by doctor).",
      sideEffects: "None (if used properly).",
      drugInteractions: "N/A",
      indication: "Home monitoring of blood pressure.",
      whenNotToUse: "Not suitable for patients with arm injuries or conditions affecting accurate readings."
    },
    {
      id: "9",
      name: "Johnsons Baby Wipes",
      brand: "Johnson & Johnson",
      price: 300.00,
      description: "Gentle wipes for baby’s delicate skin, suitable for face and body.",
      imageUrl: "/image/wipes.webp",
      quantity: 1,
      requiresPrescription: false,
      generics: "Moisturizing wipes",
      usedFor: "Cleaning and moisturizing baby skin",
      howItWorks: "Cleans and moisturizes skin with mild, non-irritating formula.",
      dosage: "Use as needed during diaper changes or for general cleaning.",
      sideEffects: "Very rare skin irritation.",
      drugInteractions: "None.",
      indication: "Baby skincare and hygiene.",
      whenNotToUse: "Avoid if baby has known sensitivity to ingredients."
    },
    {
      id: "10",
      name: "Johnsons Baby Essentials Baby Gift Set 3Pcs",
      brand: "Johnson & Johnson",
      price: 1789.00,
      description: "Includes baby wash, lotion, and powder – perfect for newborn care.",
      imageUrl: "./image/babe.webp",
      quantity: 1,
      requiresPrescription: false,
      generics: "Baby care products",
      usedFor: "Bathing, moisturizing, and skin protection",
      howItWorks: "Cleans and protects baby’s skin with hypoallergenic formulas.",
      dosage: "Use each product as per label instructions.",
      sideEffects: "Rare allergic reactions if sensitive to fragrance or ingredients.",
      drugInteractions: "None.",
      indication: "Daily baby care routine.",
      whenNotToUse: "If allergic to any specific component in the kit."
    }
  ]
};

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
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

  const handleCartItems = (productId: string) => {

    const product = products.find((product) => product.id === productId);
    if (product) {
      dispatch(addItem(product));
      alert("Item added to cart successfully!");
    } else {
      alert("Product not found!");
    }
  }

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
                  <Link onClick={() => handleCartItems(product.id)} to={`/cart`} className="add-to-cart-button">
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
