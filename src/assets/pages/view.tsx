import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './viewpage.css';

// Mock function to fetch product details (replace this with an API call)
const fetchProductDetails = async (productId: string) => {
  return [
    {
      id: "1",
      name: "Brufen Cream 30G",
      brand: "Abbott",
      price: 96.00,
      description: "Used for relief of muscle and joint pain.",
      imageUrl: "/image/brufencream.webp",
      requiresPrescription: "No",
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
      requiresPrescription: "No",
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
      requiresPrescription: "No",
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
      requiresPrescription: "No",
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
      requiresPrescription: "No",
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
      requiresPrescription: "No",
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
      requiresPrescription: "No",
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
      requiresPrescription: "No",
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
      requiresPrescription: "No",
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
      requiresPrescription: "No",
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

const ViewPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const loadProductDetails = async () => {
      const productDetails = await fetchProductDetails(productId || "");
      const selectedProduct = productDetails.find((item: any) => item.id === productId);
      setProduct(selectedProduct);
    };

    loadProductDetails();
  }, [productId]);
  console.log(productId, "productId");
  console.log(product, "product");
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row justify-around items-center w-full ">
      <div className="flex flex-col justify-start items-start gap-4 !px-10 !py-8 ">
        <div className="text-center">
          <div className="flex justify-center items-center">
            <img src={product.imageUrl} alt={product.name} className="" />
          </div>
          <div className="flex flex-col gap-2">
            <h1>{product.name}</h1>
            <p className="">Brand: {product.brand}</p>
            <p className="">
              {product.price.toFixed(2)}PKR  <span className="">PKR {product.price.toFixed(2)}</span>
            </p>
            <p>Per Strip</p>
            <Link to="/cart">
              <button className="">Add to Cart</button>
            </Link>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="">Specification</button>
          <button className="">Usage and Safety</button>
          <button className="">Precautions</button>
          <button className="">Warnings</button>
          <button className="">Additional Information</button>
        </div>
      </div>

      <div className="">
        <h2>Specification</h2>
        <p><strong>Requires Prescription:</strong> {product.requiresPrescription}</p>
        <p><strong>Generics:</strong> {product.generics}</p>
        <p><strong>Used For:</strong> {product.usedFor}</p>
        <p><strong>How It Works:</strong> {product.howItWorks}</p>

        <h2>Usage and Safety</h2>
        <p><strong>Dosage:</strong> {product.dosage}</p>
        <p><strong>Side Effects:</strong> {product.sideEffects}</p>

        <h2>Drug Interactions</h2>
        <p>{product.drugInteractions}</p>
      </div>
    </div>
  );
};

export default ViewPage;
