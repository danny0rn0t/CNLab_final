import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
// pink, blue, orange, dark green
const colors = [
  "#FF6384",
  "#35A2EB",
  "#FF8C00",
  "#356300",
  "#356364",
  "#596364",
  "#C8C864",
  "#FF00FF",
  "#844200",
  "#FFAF60",
  "#336666",
  "#B3D9D9",
  "#949449",
  "#B87070",
];
export { Doughnut, colors };
