import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import BackGround from "../images/background.jpg";

export function Hero() {
  return (
    <div id="home" className="relative min-h-screen">
      {/* Achtergrondafbeelding */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: BackGround,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Inhoud met solide achtergrond */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl px-6 py-10 sm:px-8 lg:px-10 bg-black/80 rounded-xl shadow-lg"
          >
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Ik overbrug de kloof en maak technologie een krachtig onderdeel
              van jouw bedrijf.
            </h1>
            <p className="mb-8 text-lg text-gray-300 sm:text-xl">
              Ik maak technologie écht inzetbaar voor jouw onderneming. Dat doe
              ik niet met dure of complexe trajecten, maar via betaalbare,
              gebruiksvriendelijke en toegankelijke oplossingen. Denk aan
              heldere websites, slimme software, begrijpelijke contentanalyses
              en praktische begeleiding van je digitale projecten.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto"
              >
                Contacteer me
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Mijn diensten
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
