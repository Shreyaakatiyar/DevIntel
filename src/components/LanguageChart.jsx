import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageChart = ({ repos }) => {
  const languageCount = {};
  repos?.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });

  const generateColor = (index, total) => {
    const hue = (index * 360) / total;
    return `hsl(${hue}, 70%, 55%)`;
  };

  const labels = Object.keys(languageCount);
  const values = Object.values(languageCount);
  const total = values.reduce((a, b) => a + b, 0);
  const colors = labels.map((_, i) => generateColor(i, labels.length));

  const data = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: colors,
      borderColor: "#1b1b1b",
      borderWidth: 3,
    }]
  };

  const options = {
    cutout: "65%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const pct = Math.round((ctx.parsed / total) * 100);
            return `${ctx.label}: ${pct}%`;
          }
        },
        backgroundColor: "#202020",
        borderColor: "rgba(59,130,246,0.2)",
        borderWidth: 1,
        titleColor: "#fff",
        bodyColor: "#9ca3af",
        padding: 10,
      }
    }
  };

  const languageWithPercent = labels.map((name, i) => ({
    name,
    percent: Math.round((values[i] / total) * 100),
    color: colors[i],
  })).sort((a, b) => b.percent - a.percent);

  if (!repos || repos.length === 0) {
    return (
      <div className="bg-[#1b1b1b] rounded-xl p-8">
        <h3 className="text-lg font-bold text-white mb-4">Language Usage</h3>
        <p className="text-gray-400 text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1b1b1b] rounded-xl p-5 md:p-8 h-full">
      <h3 className="text-base md:text-lg font-bold text-white mb-6 md:mb-8">
        Language Usage
      </h3>

      <div className="w-36 h-36 md:w-48 md:h-48 mx-auto mb-4 md:mb-6">
        <Doughnut data={data} options={options} />
      </div>

      <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
        {languageWithPercent.map((lang, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full shrink-0"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-gray-300 text-xs md:text-sm">{lang.name}</span>
            </div>
            <span className="text-gray-400 text-xs md:text-sm">{lang.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageChart;