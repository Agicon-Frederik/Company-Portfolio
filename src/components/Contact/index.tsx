import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from './ContactForm';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@servicepro.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Business Ave, Suite 100, Enterprise City, EC 12345',
  },
];

export function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Get in touch with our team to discuss your needs
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center space-x-4">
                <Icon className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{label}</p>
                  <p className="text-gray-600">{value}</p>
                </div>
              </div>
            ))}
            <div className="aspect-video w-full rounded-lg bg-gray-100">
              {/* Add map component here */}
            </div>
          </div>
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}