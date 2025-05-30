import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "../ui/Button";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onContactClick: () => void;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  buttonText,
  onContactClick,
}: Readonly<ServiceCardProps>) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex h-full flex-col rounded-lg bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="mb-6">
        <Icon className="h-12 w-12 text-green-600" />
      </div>
      <h3 className="mb-4 text-xl font-bold text-gray-900">{title}</h3>
      <p className="mb-6 flex-grow text-gray-600">{description}</p>

      <Button onClick={onContactClick} className="mt-auto">
        {buttonText}
      </Button>
    </motion.div>
  );
}
