import {PieChart, Pie, Tooltip, ResponsiveContainer} from "recharts";

const LanguageChart = ({repos}) => {

    const languageCount = {};

    if (repos) {
      repos.forEach((repo) => {
        if (repo.language) {
          languageCount[repo.language] =
            (languageCount[repo.language] || 0) + 1;
        }
      });
    }

    const generateColor = (index, total) => {
      const hue = (index * 360) / total; // spread evenly
      return `hsl(${hue}, 70%, 55%)`;
    };

    const languageData = Object.entries(languageCount).map(
      ([name, value], index, arr) => ({
        name,
        value,
        fill: generateColor(index, arr.length),
      }),
    );

    const totalLanguages = languageData.reduce(
      (sum, lang) => sum + lang.value,
      0,
    );

    const languageWithPercent = languageData.map((lang) => ({
      ...lang,
      percent:
        totalLanguages > 0
          ? Math.round((lang.value / totalLanguages) * 100)
          : 0,
    }));

    return (
        <div className="bg-[#1b1b1b] rounded-xl p-8">
          <h3 className="text-lg font-bold text-primary mb-8">
            Language Usage
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={languageData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1b1b1b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value, name) => {
                  const percent = Math.round((value / totalLanguages) * 100);
                  return [`${percent}%`, name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-3">
            {languageWithPercent.map((lang, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.fill }}
                  ></span>

                  <span className="text-gray-300 text-sm">{lang.name}</span>
                </div>

                <span className="text-gray-400 text-sm">{lang.percent}%</span>
              </div>
            ))}
          </div>
        </div>
    );
}

export default LanguageChart