import styles from "./Testimonials.module.css";
import Customer1 from "../assets/images/customers/customer1.png";
import Customer2 from "../assets/images/customers/customer2.png";
import Customer3 from "../assets/images/customers/customer3.png";
import Customer4 from "../assets/images/customers/customer4.png";
import { FaStar } from "react-icons/fa";

function Testimonials() {
   const testimonials = [
      {
         image: Customer1,
         title: "Fantastic Service!",
         text: "The food was good, and the staff was so welcoming. If they served Tiramisu, it would be perfect!",
         name: "Daniel T",
         rating: 4,
      },
      {
         image: Customer2,
         title: "Delicious Food!",
         text: "The pasta was fresh, and the flavors were incredible. Highly recommend this place!",
         name: "Michael S",
         rating: 5,
      },
      {
         image: Customer3,
         title: "Decent Place for Lunches",
         text: "Nice lunch plates, but I would have liked to see more economical choices on the dinner menu",
         name: "Sophia L",
         rating: 3,
      },
      {
         image: Customer4,
         title: "Best Italian Cuisine!",
         text: "Authentic flavors, great portions, and reasonable prices. What more could you ask for?",
         name: "Emily R",
         rating: 5,
      },
   ];

   return (
      <section className={styles.testimonials}>
         <h2 className={styles.heading}>What Our Fantastic Customers Say</h2>
         <div className={styles.testimonialContainer}>
            {testimonials.map((testimonial, index) => (
               <div key={index} className={styles.testimonial}>
                  <img
                     src={testimonial.image}
                     alt={testimonial.name}
                     className={styles.image}
                  />

                  <div className={styles.text}>
                     <h3>{testimonial.title}</h3>
                     <p>{testimonial.text}</p>
                     <div className={styles.rating}>
                        {Array.from({ length: testimonial.rating }).map(
                           (_, i) => (
                              <FaStar key={i} className={styles.star} />
                           )
                        )}
                     </div>
                     <p className={styles.name}> - {testimonial.name}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
}

export default Testimonials;
