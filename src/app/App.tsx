import { Hero } from '@/app/components/hero';
import { AboutMe } from '@/app/components/about-me';
import { Contact } from '@/app/components/contact';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-foreground">
      <Hero />
      <AboutMe />
      <Contact />
    </div>
  );
}