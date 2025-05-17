import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import "./StartCardStyle.css";
import Loading from "../../../Loading/Loading";

interface StartCardProps {
  name: string;
  icon: LucideIcon;
  value: number | undefined;
  color: string;
}

const StatCard: React.FC<StartCardProps> = ({
  name,
  icon: Icon,
  value,
  color,
}) => {
  return (
    <motion.div
      className="section-start-card"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-400">
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <span className="mt-1 text-3xl font-semibold text-gray-100">
          {value ? value : <Loading padding={0} size={15} color="red" />}
        </span>
      </div>
    </motion.div>
  );
};
export default StatCard;
