import React, { useState } from "react";

const AddProductPage: React.FC = () => {
  const [productData, setProductData] = useState({
    productName: "",
    category: "",
    productPrice: "",
    productStock: "",
    supplierName: "",
    productDescription: "",
  });
  const [productImages, setProductImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setProductImages(files);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const token = sessionStorage.getItem("jwtToken");
      if (!token) {
        alert("You need to login first!");
        return;
      }

      const formData = new FormData();
      formData.append("product_name", productData.productName);
      formData.append("category", productData.category);
      formData.append("price", productData.productPrice);
      formData.append("stock", productData.productStock);
      formData.append("supplier_name", productData.supplierName);
      formData.append("description", productData.productDescription);

      productImages.forEach((file) => formData.append("images", file));

      const response = await fetch("http://your-django-backend-url/api/products/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload product.");
      }

      setSuccessMessage("Product added successfully!");
      setProductData({
        productName: "",
        category: "",
        productPrice: "",
        productStock: "",
        supplierName: "",
        productDescription: "",
      });
      setProductImages([]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Something went wrong.");
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl !mb-5">Add a New Product</h1>
      {successMessage && (
        <p className="text-green-600 text-center mb-4">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 text-center mb-4">{errorMessage}</p>
      )}

      <form onSubmit={handleFormSubmit} className="!space-y-4">
        <div>
          <label htmlFor="category" className="block text-base font-medium mb-1">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 !py-2"
          >
            <option value="">Select a category</option>
            <optgroup label="Medicines">
              <option value="medicines-pain-relief">Pain Relief</option>
              <option value="medicines-antibiotics">Antibiotics</option>
              <option value="medicines-supplements">Supplements</option>
            </optgroup>
            <optgroup label="Personal Care">
              <option value="personal-care-skin-care">Skin Care</option>
              <option value="personal-care-hair-care">Hair Care</option>
              <option value="personal-care-oral-care">Oral Care</option>
            </optgroup>
            <optgroup label="Baby Care">
              <option value="baby-care-diapers">Diapers</option>
              <option value="baby-care-feeding">Feeding</option>
              <option value="baby-care-toys">Toys</option>
            </optgroup>
            <optgroup label="Lifestyle & Fitness">
              <option value="lifestyle-fitness-yoga">Yoga</option>
              <option value="lifestyle-fitness-gym">Gym</option>
              <option value="lifestyle-fitness-supplements">Supplements</option>
            </optgroup>
            <optgroup label="Organic">
              <option value="organic-vegetables">Vegetables</option>
              <option value="organic-fruits">Fruits</option>
              <option value="organic-grains">Grains</option>
            </optgroup>
            <optgroup label="Healthcare Devices">
              <option value="healthcare-devices-monitors">Monitors</option>
              <option value="healthcare-devices-thermometers">Thermometers</option>
              <option value="healthcare-devices-glucometers">Glucometers</option>
            </optgroup>
          </select>
        </div>

        <div>
          <label htmlFor="productName" className="block text-base font-medium mb-1">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Product Name"
            value={productData.productName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md !py-2"
          />
        </div>

        <div>
          <label htmlFor="productImages" className="block text-base font-medium mb-1">
            Product Images:
          </label>
          <input
            type="file"
            id="productImages"
            name="productImages"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            className="w-full border border-gray-300 rounded-md !py-2"
          />
        </div>

        <div>
          <label htmlFor="productPrice" className="block text-base font-medium mb-1">
            Product Price:
          </label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            placeholder="Product Price"
            value={productData.productPrice}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md !py-2"
          />
        </div>

        <div>
          <label htmlFor="productStock" className="block text-base font-medium mb-1">
            Product Quantity:
          </label>
          <input
            type="number"
            id="productStock"
            name="productStock"
            placeholder="Product Quantity"
            value={productData.productStock}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md !py-2"
          />
        </div>

        <div>
          <label htmlFor="supplierName" className="block text-base font-medium mb-1">
            Supplier Name:
          </label>
          <input
            type="text"
            id="supplierName"
            name="supplierName"
            placeholder="Supplier Name"
            value={productData.supplierName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md !py-2"
          />
        </div>

        <div>
          <label
            htmlFor="productDescription"
            className="block text-base font-medium mb-1"
          >
            Description:
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            placeholder="Description of the product/medicine"
            rows={4}
            value={productData.productDescription}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md !py-2"
          ></textarea>
        </div>

        <div className="flex justify-start items-center gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;