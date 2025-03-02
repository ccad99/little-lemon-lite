import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
   return (
      <footer className={styles.footer} aria-label="Website footer">
         <div className={styles.footerLogo}>
            <img
               src="/assets/images/littleLemon/box-logo-yellow.png"
               alt="Little Lemon Logo"
            />
         </div>
         <div className={styles.footerColumns}>
            <div className={styles.footerColumn}>
               <h3>Navigation</h3>
               <ul>
                  <li className={styles.navLink}>
                     <Link to="/" aria-label="Go to Home Page">
                        Home
                     </Link>
                  </li>
                  <li className={styles.navLink}>
                     <Link to="/#about" aria-label="Go to About Us Page">
                        About Us
                     </Link>
                  </li>
                  <li className={styles.navLink}>
                     <Link to="/" aria-label="Go to Menu Page">
                        Menu
                     </Link>
                  </li>
                  <li className={styles.navLink}>
                     <Link
                        to="/reservations"
                        aria-label="Go to Reservations Page"
                     >
                        Reservations
                     </Link>
                  </li>
                  <li>
                     <Link to="/" aria-label="Order Food Online">
                        Order Online
                     </Link>
                  </li>
                  <li className={styles.navLink}>
                     <Link to="/" aria-label="Login to your account">
                        Login
                     </Link>
                  </li>
               </ul>
            </div>
            <div className={styles.footerColumn}>
               <h3>Contact</h3>
               <p aria-label="Restaurant address">
                  123 Main Street, Chicago, IL 45678
               </p>
               <p aria-label="Restaurant phone number">(123) 456-7890</p>
               <p aria-label="Restaurant email address">
                  contact@littlelemon.com
               </p>
            </div>
            <div className={styles.footerColumn}>
               <h3>Social Media</h3>
               <ul className={styles.socialLinks}>
                  <li>
                     <Link
                        to="https://twitter.com"
                        aria-label="Follow us on Twitter"
                     >
                        <FaTwitter className={styles.icon} />
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="https://facebook.com"
                        aria-label="Follow us on Facebook"
                     >
                        <FaFacebook className={styles.icon} />
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="https://instagram.com"
                        aria-label="Follow us on Instagram"
                     >
                        <FaInstagram className={styles.icon} />
                     </Link>
                  </li>
               </ul>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
