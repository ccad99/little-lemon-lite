import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import CartIcon from "../assets/icons/icon-basket.svg";
import Logo from "../assets/images/littleLemon/logo-small.svg";
import styles from "./Header.module.css";

function Header() {
   const [menuOpen, setMenuOpen] = useState(false);

   const toggleMenu = () => {
      setMenuOpen(!menuOpen);
   };

   /* Auto close hamburger menu when screen size increases */
   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth > 768) {
            setMenuOpen(false);
         }
      };
      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   return (
      <header className={styles.header}>
         {/*  Animated Hamburger Menu Button */}

         <button
            className={`${styles.menuButton} ${menuOpen ? styles.open : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
         >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
         </button>

         {/*  Logo (Centered) */}
         <Link to="/">
            <img
               className={styles.headerLogo}
               src={Logo}
               alt="Little Lemon logo"
            />
         </Link>

         {/*  Cart Icon (Stays on Right) */}
         {/* <img className={styles.icon} src={CartIcon} alt="shopping cart icon" /> */}

         {/*  Mobile Drop Down Menu */}
         <nav className={`${styles.navMenu} ${menuOpen ? styles.open : ""}`}>
            <ul>
               <li>
                  <Link to="/" onClick={() => setMenuOpen(false)}>
                     Home
                  </Link>
               </li>
               <li>
                  <Link to="/about" onClick={() => setMenuOpen(false)}>
                     About
                  </Link>
               </li>
               <li>
                  <Link to="/menu" onClick={() => setMenuOpen(false)}>
                     Menu
                  </Link>
               </li>
               <li>
                  <Link to="/reservations" onClick={() => setMenuOpen(false)}>
                     Reservations
                  </Link>
               </li>
               <li>
                  <Link to="/testimonials" onClick={() => setMenuOpen(false)}>
                     Testimonials
                  </Link>
               </li>
               <li>
                  <Link to="" onClick={() => setMenuOpen(false)}>
                     Order Online
                  </Link>
               </li>
               <li>
                  <Link to="" onClick={() => setMenuOpen(false)}>
                     Log In
                  </Link>
               </li>
            </ul>
         </nav>

         {/*  Desktop Navigation (Hidden on Mobile) */}
         <nav className={styles.desktopNav}>
            <ul>
               <li>
                  <Link to="/">Home</Link>
               </li>
               <li>
                  <Link to="/about">About</Link>
               </li>
               <li>
                  <Link to="">Menu</Link>
               </li>
               <li>
                  <Link to="/reservations">Reservations</Link>
               </li>
               <li>
                  <Link to="/testimonials">Testimonials</Link>
               </li>
               <li>
                  <Link to="">Order Online</Link>
               </li>
               <li>
                  <Link to="">Login</Link>
               </li>
            </ul>
         </nav>
      </header>
   );
}

export default Header;
