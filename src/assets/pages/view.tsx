import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './viewpage.css';

// Mock function to fetch product details (replace this with an API call)
const fetchProductDetails = async (productId: string) => {
  return {
    id: productId,
    name: "Panadol Extra Tablets (1 Strip = 10 Tablets)",
    brand: "Atco Laboratories Limited",
    price: 34,
    description: "Used to reduce the risk of heart attack or stroke in patients...",
    imageUrl: "/image/panadol.webp",
    requiresPrescription: "Yes",
    generics: "Aspirin",
    usedFor: "Stroke",
    howItWorks:
      "This medicine helps by making blood flow smoothly throughout the heart. It is also used to reduce fever and mild to moderate pain.",
    dosage: "Aspirin",
    sideEffects:
      "Bronchospasm, GI upset, allergic reactions, dizziness, confusion, increased bleeding.",
    drugInteractions:
      "Oral anticoagulants, NSAIDs, corticosteroids, and others.",
    indication: "For primary and secondary prevention of CV disease.",
    whenNotToUse: "Avoid in case of severe allergic reactions to aspirin.",
  };
};

const ViewPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const loadProductDetails = async () => {
      const productDetails = await fetchProductDetails(productId!);
      setProduct(productDetails);
    };

    loadProductDetails();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row justify-center items-center w-full h-screen bg-gray-100">
      <div className="">
        <img src={product.imageUrl} alt={product.name} className="" />
        <div className="">
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

      <div className="">
        <button className="">Specification</button>
        <button className="">Usage and Safety</button>
        <button className="">Precautions</button>
        <button className="">Warnings</button>
        <button className="">Additional Information</button>
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
