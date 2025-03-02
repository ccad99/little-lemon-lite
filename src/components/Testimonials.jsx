import styles from "./Testimonials.module.css";
import { FaStar } from "react-icons/fa";

function Testimonials() {
   const testimonials = [
      {
         image: "/assets/images/customers/customer1.png",
         title: "Fantastic Service!",
         text: "The food was good, and the staff was so welcoming. If they served Tiramisu, it would be perfect!",
         name: "Daniel T",
         rating: 4,
      },
      {
         image: "/assets/images/customers/customer2.png",
         title: "Delicious Food!",
         text: "The pasta was fresh, and the flavors were incredible. Highly recommend this place!",
         name: "Michael S",
         rating: 5,
      },
      {
         image: "/assets/images/customers/customer3.png",
         title: "Decent Place for Lunches",
         text: "Nice lunch plates, but I would have liked to see more economical choices on the dinner menu",
         name: "Sophia L",
         rating: 3,
      },
      {
         image: "/assets/images/customers/customer4.png",
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
