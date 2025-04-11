const Footer = () => {
  return (
    <footer className="!p-8 bg-[#004080] !text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="footer-column">
          <h3 className="text-xl font-semibold mb-4 !text-white">About Us</h3>
          <p className="text-sm leading-relaxed">
            At Medihub, we are dedicated to providing high-quality medicines and healthcare products to meet your needs.
            Our mission is to ensure your well-being by offering a wide range of trusted products at affordable prices.
            Your health is our priority, and we strive to make healthcare accessible for everyone.
          </p>
        </div>
        <div className="footer-column">
          <h3 className="text-xl font-semibold mb-4 text-white">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="!text-white">Medicines</a></li>
            <li><a href="#" className="!text-white">Personal Care</a></li>
            <li><a href="#" className="!text-white">Baby Care</a></li>
            <li><a href="#" className="!text-white">Lifestyle & Fitness</a></li>
            <li><a href="#" className="!text-white">Organic</a></li>
            <li><a href="#" className="!text-white">Healthcare Devices</a></li>
          </ul>
        </div>
        <div className="footer-column text-white">
          <h3 className="text-xl font-semibold mb-4 !text-white">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+983124567891" className="!text-white">+98 312 4567891</a></li>
            <li><a href="mailto:abc@email.com" className="!text-white">abc@email.com</a></li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <a href="#" className="text-gray-500 hover:text-blue-500 text-xl"><i className="fab fa-facebook"></i></a>
        <a href="#" className="text-gray-500 hover:text-blue-500 text-xl"><i className="fab fa-linkedin"></i></a>
        <a href="#" className="text-gray-500 hover:text-blue-500 text-xl"><i className="fab fa-twitter"></i></a>
        <a href="#" className="text-gray-500 hover:text-blue-500 text-xl"><i className="fab fa-instagram"></i></a>
        <a href="#" className="text-gray-500 hover:text-blue-500 text-xl"><i className="fab fa-youtube"></i></a>
        <a href="#" className="text-gray-500 hover:text-blue-500 text-xl"><i className="fab fa-tiktok"></i></a>
      </div>
      <div className="border-t border-gray-300 mt-8 pt-4 text-center">
        <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
        <div className="space-x-4 mt-2">
          <a href="#" className="text-sm hover:text-blue-500">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="text-sm hover:text-blue-500">Terms of Use</a>
          <span>·</span>
          <a href="#" className="text-sm hover:text-blue-500">Legal Notice</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;