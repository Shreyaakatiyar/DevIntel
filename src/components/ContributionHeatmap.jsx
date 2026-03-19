import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Bar } from "react-chartjs-2";
import { useState, useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const ContributionHeatmap = ({ heatmapData, contributions, selectedYear, setSelectedYear, repos, profile }) => {
  const currentYear = new Date().getFullYear();

  const joinYear = profile?.created_at
    ? new Date(profile.created_at).getFullYear()
    : currentYear - 4;
  const years = Array.from(
    { length: currentYear - joinYear + 1 },
    (_, i) => currentYear - i
  );

  // Max streak
  let maxStreak = 0;
  let currentStreak = 0;
  [...heatmapData]
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach(day => {
      if (day.count > 0) { currentStreak++; maxStreak = Math.max(maxStreak, currentStreak); }
      else currentStreak = 0;
    });

  // Most active day of week
  const dayTotals = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  heatmapData.forEach(day => {
    const d = new Date(day.date);
    dayTotals[dayNames[d.getDay()]] += day.count;
  });
  const mostActiveDay = Object.entries(dayTotals).sort((a, b) => b[1] - a[1])[0]?.[0];

  // Monthly data
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyData = monthNames.map(month => ({ month, contributions: 0 }));
  heatmapData.forEach(day => {
    const month = new Date(day.date).getMonth();
    monthlyData[month].contributions += day.count;
  });

  const scrollRef = useRef(null);

  const scrollYears = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -120 : 120,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#1b1b1b] rounded-xl p-5 md:p-8 flex flex-col gap-5 md:gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-base md:text-lg font-bold text-white shrink-0">
          Contribution Heatmap
        </h3>

        {/* Year selector with arrow buttons */}
        <div className="flex items-center gap-1">
          {/* Left arrow */}
          <button
            onClick={() => scrollYears("left")}
            className="p-1.5 text-gray-400 hover:text-white bg-[#252525] hover:bg-[#2f2f2f] rounded-lg transition cursor-pointer shrink-0"
          >
            <IoChevronBack className="text-sm" />
          </button>

          {/* Scrollable years */}
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide max-w-[200px] sm:max-w-xs"
          >
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm transition cursor-pointer shrink-0 ${
                  selectedYear === year
                    ? "bg-[#3b82f6] text-white"
                    : "bg-[#252525] text-gray-400 hover:bg-[#2f2f2f]"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollYears("right")}
            className="p-1.5 text-gray-400 hover:text-white bg-[#252525] hover:bg-[#2f2f2f] rounded-lg transition cursor-pointer shrink-0"
          >
            <IoChevronForward className="text-sm" />
          </button>
        </div>
      </div>

      {/* Heatmap */}
      <div className="heatmap-wrapper overflow-x-auto">
        <div className="min-w-125">
          <CalendarHeatmap
            startDate={new Date(`${selectedYear}-01-01`)}
            endDate={new Date(`${selectedYear}-12-31`)}
            values={heatmapData}
            classForValue={(value) => {
              if (!value || value.count === 0) return "color-empty";
              if (value.count >= 10) return "color-scale-4";
              if (value.count >= 5) return "color-scale-3";
              if (value.count >= 2) return "color-scale-2";
              return "color-scale-1";
            }}
            tooltipDataAttrs={(value) => ({
              "data-tooltip-id": "heatmap-tooltip",
              "data-tooltip-content": value?.date
                ? `${value.date} — ${value.count ?? 0} contributions`
                : "No data",
            })}
            showWeekdayLabels={true}
          />
          <ReactTooltip
            id="heatmap-tooltip"
            style={{
              backgroundColor: "#202020",
              color: "#fff",
              fontSize: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(59,130,246,0.2)",
              padding: "6px 10px",
            }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 text-xs text-gray-500 -mt-2 md:-mt-4">
        <span>Less</span>
        <span className="w-3 h-3 rounded-sm bg-[#2a2a2a]"></span>
        <span className="w-3 h-3 rounded-sm bg-[#3b82f6]/25"></span>
        <span className="w-3 h-3 rounded-sm bg-[#3b82f6]/50"></span>
        <span className="w-3 h-3 rounded-sm bg-[#3b82f6]/75"></span>
        <span className="w-3 h-3 rounded-sm bg-[#3b82f6]"></span>
        <span>More</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {[
          { label: "Max Streak", value: maxStreak, sub: "consecutive days" },
          {
            label: "Total Contributions",
            value: contributions.toLocaleString(),
            sub: `in ${selectedYear}`,
          },
          {
            label: "Most Active Day",
            value: mostActiveDay || "—",
            sub: "day of week",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#202020] border border-white/5 rounded-xl p-2 md:p-5"
          >
            <p className="text-[9px] md:text-xs text-[#3b82f6]/80 uppercase tracking-wide mb-1 md:mb-2 leading-tight">
              {stat.label}
            </p>
            <p className="text-lg md:text-3xl font-bold text-white truncate">
              {stat.value}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5 hidden sm:block">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Monthly activity */}
      <div className="bg-[#202020] border border-white/5 rounded-xl p-4 md:p-5">
        <p className="text-xs md:text-sm font-medium text-gray-300 mb-3 md:mb-4">
          Monthly Activity
        </p>
        <Bar
          data={{
            labels: monthlyData.map((d) => d.month),
            datasets: [
              {
                data: monthlyData.map((d) => d.contributions),
                backgroundColor: "rgba(59,130,246,0.85)",
                borderRadius: 4,
                borderSkipped: false,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#1b1b1b",
                borderColor: "rgba(59,130,246,0.2)",
                borderWidth: 1,
                titleColor: "#fff",
                bodyColor: "#9ca3af",
                callbacks: { label: (ctx) => `${ctx.parsed.y} contributions` },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: "#6b7280", font: { size: 9 } },
                border: { display: false },
              },
              y: { display: false },
            },
          }}
          height={80}
        />
      </div>
    </div>
  );
};

export default ContributionHeatmap;