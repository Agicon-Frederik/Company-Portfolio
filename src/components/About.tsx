import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Hammer,
  Hourglass,
  PersonStanding,
  Lightbulb,
  Glasses,
  Recycle,
  Globe,
  HandCoins,
} from "lucide-react";

const stats = [
  {
    icon: Hammer,
    label:
      "Gij zult eenvoud en effectiviteit boven alles verkiezen, en pragmatisch handelen in alles wat ge doet.",
    value: "Pragmatisch ",
  },
  {
    icon: Hourglass,
    label:
      "Gij zult niet blindelings volgen, maar kritisch denken en bestaande ideeën aanpassen om oplossingen te creëren die perfect passen bij de unieke noden van uw cliënten.",
    value: "Kritisch",
  },
  {
    icon: Lightbulb,
    label:
      "Gij zult innovatie omarmen, maar altijd met een doelgericht plan dat de eenvoud en het nut dient.",
    value: "Innovatief",
  },
  {
    icon: Glasses,
    label:
      "Gij zult integriteit en transparantie in al uw handelingen bewaren, en eerlijkheid als fundament beschouwen in uw samenwerking met anderen. ",
    value: "Transparant",
  },
  {
    icon: Recycle,
    label:
      "Gij zult duurzaamheid in al uw beslissingen verankeren, en streven naar een toekomst waarin mens en planeet floreren. ",
    value: "Duurzaam",
  },
  {
    icon: PersonStanding,
    label:
      "Gij zult inclusie omarmen en bevorderen, en zorgen dat iedere stem gehoord wordt en iedere persoon gelijk behandeld wordt. ",
    value: "Inclusief",
  },
  {
    icon: Globe,
    label:
      "Gij zult uw werk inzetten voor het grotere goed, en steeds streven naar sociale impact in uw onderneming.",
    value: "Sociale impact ",
  },
  {
    icon: HandCoins,
    label:
      "Gij zult uw passie en toewijding inzetten om echte waarde te creëren, en nooit uw eigen waarden verloochenen. ",
    value: "Echte waarde",
  },
];

export function About() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-white-900 sm:text-4xl">
            mijn credo
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-8 text-white-600 px-4">
            Hier vind je 8 waarden die ik heel belangrijk vind - inclusief de
            Bijbelse geboden.
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-lg bg-white p-6 sm:p-8 shadow-lg"
            >
              <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-green-900 mx-auto" />
              <div className="mt-4 text-center">
                <p className="text-xl sm:text-2xl font-bold text-green-900">
                  {value}
                </p>
                <p className="text-sm sm:text-base text-gray-900">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
