# DevIntel

DevIntel is a developer analytics dashboard that transforms GitHub profiles into structured, actionable insights. It provides a clear and intuitive interface to evaluate developer activity, technical strengths, and contribution patterns.

---

## Overview

The application allows users to search for any GitHub username and explore detailed analytics, including repository metrics, language distribution, contribution activity, and AI-generated insights. It is designed to present complex data in a simple and interpretable format.

---

## Features

* **Developer Search**
  Search and analyze any public GitHub profile

* **Profile Overview**
  View key details such as bio, followers, location, and account information

* **Analytics Dashboard**

  * Total repositories
  * Total stars
  * Total forks
  * GitHub activity duration

* **Language Usage Visualization**
  Dynamic chart displaying language distribution with percentages

* **Contribution Heatmap**
  Yearly contribution activity visualized in a GitHub-style heatmap

* **Repository Explorer**
  Browse repositories with relevant details such as stars, forks, and technologies used

* **Compare Developers**
  Compare multiple GitHub profiles side-by-side based on activity and metrics

* **AI Insights**
  Generate structured insights including:

  * Primary focus
  * Core strengths
  * Contribution style

---

## Tech Stack

* React
* Tailwind CSS
* Recharts
* GitHub REST API
* GitHub GraphQL API
* AI Integration (Gemini / OpenAI)

---

## Functionality

DevIntel fetches data from GitHub APIs and processes it to generate meaningful insights. Repository data is aggregated to compute metrics such as stars, forks, and language distribution. Contribution data is retrieved via GraphQL and rendered as a heatmap. AI models are used to analyze developer data and generate high-level insights.


