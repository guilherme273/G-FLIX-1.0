import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Loading from "../../Loading/Loading";

export interface ChartData {
  name: string;
  value: number;
}

interface ChartProps {
  chartData: ChartData[] | undefined;
  title: string;
}
const COLORS = [
  "#8B5CF6",
  "#EC4899",
  "#6DB1A4",
  "#10B981",
  "#F59E0B",
  "#6366F1",
  "#B1B1B1",
];
const Chart: React.FC<ChartProps> = ({ chartData, title }) => {
  return (
    <>
      {chartData ? (
        <motion.div
          className="p-6 bg-opacity-50 border shadow-lg section-start-card backdrop-blur-md rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-4 text-lg font-medium text-gray-100">{title}</h2>
          <div className="h-80">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx={"50%"}
                  cy={"50%"}
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(31, 41, 55, 0.8)",
                    borderColor: "#4B5563",
                  }}
                  itemStyle={{ color: "#E5E7EB" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      ) : (
        <Loading color="red" padding={0} size={20} />
      )}
    </>
  );
};
export default Chart;
