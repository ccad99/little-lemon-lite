// Home page (Header, Hero, Specials, etc.)

import Carousel from "../components/Carousel";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import About from "../components/About";

function HomePage() {
   return (
      <div>
         <Hero />
         <section>
            <Carousel />
         </section>
         <section id="testimonials">
            <Testimonials />
         </section>
         <section id="about">
            <About />
         </section>
      </div>
   );
}

export default HomePage;
