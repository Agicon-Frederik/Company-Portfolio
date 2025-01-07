import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}