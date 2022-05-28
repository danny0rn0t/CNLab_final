import { useEffect, useRef } from "react";
import { Doughnut } from "../utils/chart";
const ProgressDoughnut = ({ data, title }) => {
  const chartRef = useRef();
  useEffect(() => {
    const chart = chartRef.current;
    console.log(chart.data);
    if (chart) chart.update();
  }, []);
  return (
    <div style={{ width: "200px", height: "70%" }}>
      <Doughnut
        ref={chartRef}
        data={{
          datasets: [
            {
              label: title,
              backgroundColor: ["rgb(68, 136, 0)", "e9e9e9"],
              data: [data, 100 - data],
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: "90%",
          rotation: 180,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              filter: (tooltipItem) => tooltipItem.dataIndex === 0,
            },
          },
        }}
        plugins={[
          {
            beforeDraw: (chart) => {
              var width = chart.chartArea.width,
                height = chart.chartArea.height,
                ctx = chart.ctx;
              ctx.restore();
              var fontSize = (height / 150).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.fillStyle = "#9b9b9b";
              ctx.textBaseline = "middle";
              var text = chart.data.datasets[0].percent + "%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
              ctx.fillText(text, textX, textY);
              ctx.save();
            },
          },
        ]}
      />
    </div>
  );
};
export default ProgressDoughnut;
