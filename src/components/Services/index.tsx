import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { ServiceCard } from "./ServiceCard";
import { services } from "./services.data";

export function Services() {
  const [ref, inView] = useInView({ triggerOnce: true });

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            mijn diensten
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-8 text-gray-600 px-4">
            Als trotse generalist en zwitsers zakmes kan je bij mij terecht voor
            heel veel.
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              onContactClick={scrollToContact}
              buttonText={service.buttonText}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
