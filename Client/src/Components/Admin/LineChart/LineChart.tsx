import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

import Loading from "../../Loading/Loading";

export interface DataLineChart {
  name: string;
  value: number;
}
interface LineChartComponentProps {
  title: string;
  data: DataLineChart[] | undefined;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  title,
  data,
}) => {
  return (
    <motion.div
      className="p-6 bg-opacity-50 border shadow-lg section-start-card backdrop-blur-md rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-100">{title}</h2>
      <div className="h-[320px]">
        {data ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Loading padding={5} size={30} color="red" />
        )}
      </div>
    </motion.div>
  );
};
export default LineChartComponent;
