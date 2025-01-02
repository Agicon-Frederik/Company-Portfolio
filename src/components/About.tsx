import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Clients Served', value: '500+' },
  { icon: Award, label: 'Years Experience', value: '15+' },
  { icon: TrendingUp, label: 'Projects Completed', value: '1000+' },
];

export function About() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            We're a team of passionate professionals dedicated to delivering exceptional business solutions.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-lg bg-white p-8 shadow-lg"
            >
              <Icon className="h-12 w-12 text-blue-600" />
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}