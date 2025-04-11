import React from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  pharmacy: string;
}

const ProductList: React.FC = () => {
  const products: Product[] = [
    { id: 1, name: 'Paracetamol', price: '$10', pharmacy: 'Pharmacy A' },
    { id: 2, name: 'Ibuprofen', price: '$12', pharmacy: 'Pharmacy B' }
  ];

  return (
    <div className="product-list">
      <h3>Available Medications</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.price} at {product.pharmacy}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
