import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Phone, Linkedin } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefoon",
    value: "+32 484426492",
    href: "tel:+32484426492",
    isLink: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "frederik@agicon.be",
    href: "mailto:frederik@agicon.be",
    isLink: true,
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "Sint-Denijsstraat 4, Zwevegem, België",
    isLink: false,
  },
  {
    icon: Linkedin,
    label: "Volg me",
    value: "op LinkedIn",
    href: "https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=frevant",
    isLink: true,
  },
];

export function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contacteer me
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-8 text-gray-600 px-4">
            Get in touch with our team to discuss your needs
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 sm:space-y-8">
            {contactInfo.map(({ icon: Icon, label, value, href, isLink }) => (
              <div
                key={label}
                className="flex items-center space-x-4 p-4 rounded-lg bg-white shadow-sm"
              >
                <Icon className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900">{label}</p>
                  {isLink ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline hover:text-blue-800"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-gray-600">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-white p-6 sm:p-8 shadow-lg">
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.756448547827!2d3.331930577566308!3d50.79862206223248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c33cb52f31f8bb%3A0x32ae3852f81548e8!2sSint-Denijsstraat%204%2C%208550%20Zwevegem!5e0!3m2!1snl!2sbe!4v1746189181571!5m2!1snl!2sbe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
