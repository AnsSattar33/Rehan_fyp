import React from "react";
import "./order.css";

interface Order {
  id: number;
  customer: string;
  shippingAddress: string;
  product: string;
  quantity: number;
  price: number;
  billingMethod: string;
  prescriptionImage: string;
  status: string;
}

const Orders: React.FC = () => {
  const orders: Order[] = [
    {
      id: 1,
      customer: "Rehan",
      shippingAddress: "123 Main Street, Vehari",
      product: "Panadol",
      quantity: 2,
      price: 80,
      billingMethod: "Credit Card",
      prescriptionImage: "/path/to/prescription1.jpg",
      status: "Delivered",
    },
    {
      id: 2,
      customer: "Waleed",
      shippingAddress: "456 4 Street, Vehari",
      product: "Asparine",
      quantity: 1,
      price: 56,
      billingMethod: "Cash on Delivery",
      prescriptionImage: "/path/to/prescription2.jpg",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Zohaib",
      shippingAddress: "5th Main Street, Vehari",
      product: "Thermameter",
      quantity: 2,
      price: 80,
      billingMethod: "Credit Card",
      prescriptionImage: "/path/to/prescription1.jpg",
      status: "Returned",
    },
    {
      id: 4,
      customer: "Asim",
      shippingAddress: "2nd Street, Vehari",
      product: "Lipiget",
      quantity: 2,
      price: 300,
      billingMethod: "COD",
      prescriptionImage: "/path/to/prescription1.jpg",
      status: "Delivered",
    },
    {
      id: 5,
      customer: "Abdullah",
      shippingAddress: "123 Main Street, Vehari",
      product: "Panadol",
      quantity: 2,
      price: 80,
      billingMethod: "Credit Card",
      prescriptionImage: "/path/to/prescription1.jpg",
      status: "Delivered",
    },
  ];

  const handleAccept = (id: number) => {
    console.log(`Order ${id} accepted.`);
    // Add logic for accepting the order
  };

  const handleReject = (id: number) => {
    console.log(`Order ${id} rejected.`);
    // Add logic for rejecting the order
  };

  return (
    <div className="orders">
      <h1 className="text-2xl">Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Shipping Address</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Billing Method</th>
            <th>Prescription</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.shippingAddress}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td> {order.price} PKR</td>
              <td>{order.billingMethod}</td>
              <td>
                <a href={order.prescriptionImage} target="_blank" rel="noopener noreferrer">
                  View Prescription
                </a>
              </td>
              <td>{order.status}</td>
              <td>
                {order.status === "Pending" ? (
                  <>
                    <button onClick={() => handleAccept(order.id)}>Accept</button>
                    <button onClick={() => handleReject(order.id)}>Reject</button>
                  </>
                ) : (
                  <span>{order.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
