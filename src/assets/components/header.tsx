import './header.css';
import { Link } from 'react-router-dom';
import myImage from '../medihub.png';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <img className="pic" src={myImage} alt="Medihub" />
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search Medicines..." />
        </div>

        <div className="header-actions">
          <Link to="/signin" className="auth-link">Sign In | Sign Up</Link>
          <Link to="/Dashboard" className="auth-link"   >Admin Dashboard</Link>
          <Link to='/asdf' className='auth-link'>Owner Dashboard</Link>
          <Link to="/cart" className="cart-link">
            <FaShoppingCart />
            <span className="cart-count">0</span>
          </Link>
        </div>
      </div>


      <nav className="categories-menu">
        <ul className="menu">
          <li className="menu-item">
            <Link to="/medicines">Medicines</Link>
            <ul className="dropdown">
              <li><Link to="/medicines/pain-relief">Pain Relief</Link></li>
              <li><Link to="/medicines/antibiotics">Antibiotics</Link></li>
              <li><Link to="/medicines/supplements">Supplements</Link></li>
            </ul>
          </li>
          <li className="menu-item">
            <Link to="/personal-care">Personal Care</Link>
            <ul className="dropdown">
              <li><Link to="/personal-care/skin-care">Skin Care</Link></li>
              <li><Link to="/personal-care/hair-care">Hair Care</Link></li>
              <li><Link to="/personal-care/oral-care">Oral Care</Link></li>
            </ul>
          </li>
          <li className="menu-item">
            <Link to="/baby-care">Baby Care</Link>
            <ul className="dropdown">
              <li><Link to="/baby-care/diapers">Diapers</Link></li>
              <li><Link to="/baby-care/feeding">Feeding</Link></li>
              <li><Link to="/baby-care/toys">Toys</Link></li>
            </ul>
          </li>
          <li className="menu-item">
            <Link to="/lifestyle-fitness">Lifestyle & Fitness</Link>
            <ul className="dropdown">
              <li><Link to="/lifestyle-fitness/yoga">Yoga</Link></li>
              <li><Link to="/lifestyle-fitness/gym">Gym</Link></li>
              <li><Link to="/lifestyle-fitness/supplements">Supplements</Link></li>
            </ul>
          </li>
          <li className="menu-item">
            <Link to="/organic">Organic</Link>
            <ul className="dropdown">
              <li><Link to="/organic/vegetables">Vegetables</Link></li>
              <li><Link to="/organic/fruits">Fruits</Link></li>
              <li><Link to="/organic/grains">Grains</Link></li>
            </ul>
          </li>
          <li className="menu-item">
            <Link to="/healthcare-devices">Healthcare Devices</Link>
            <ul className="dropdown">
              <li><Link to="/healthcare-devices/monitors">Monitors</Link></li>
              <li><Link to="/healthcare-devices/thermometers">Thermometers</Link></li>
              <li><Link to="/healthcare-devices/glucometers">Glucometers</Link></li>
            </ul>
          </li>
          <li className="menu-item">
            <Link to="/track-order">Track Order</Link>
          </li>
          <li className="menu-item">
            <Link to="/offers">Offers</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
