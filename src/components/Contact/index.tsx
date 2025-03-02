import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from './ContactForm';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9279757762',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@quaxis.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Mujjafarpur, Bihar, India',
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
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-4 text-base sm:text-lg leading-8 text-gray-600 px-4">
            Get in touch with our team to discuss your needs
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 sm:space-y-8">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center space-x-4 p-4 rounded-lg bg-white shadow-sm">
                <Icon className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{label}</p>
                  <p className="text-gray-600">{value}</p>
                </div>
              </div>
            ))}
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14303.785256146194!2d85.36720022438846!3d26.119185228626057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991f5dbfbc68b6f%3A0x6847f6e634ff804f!2sMuzaffarpur%2C%20Bihar!5e0!3m2!1sen!2sin!4v1646472278010!5m2!1sen!2sin"
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
          <div className="rounded-lg bg-white p-6 sm:p-8 shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
