# Albany Airbnb Dashboard

An interactive data dashboard built using HTML, CSS, JavaScript, and data visualization libraries to analyze Airbnb listings in Albany, New York. This project was developed as a final requirement for **ITD112 - Data Analysis and Visualization**.

## Project Objectives

- Develop an interactive and insightful dashboard using the Albany Airbnb dataset.
- Visualize listing distribution with a heatmap and filterable clustered map.
- Display average metrics using summary cards.
- Compare individual listings to the overall dataset.
- Analyze sentiment, pricing, availability, and neighborhood trends.

## Dashboard Features

### Map Visualization
- **Clustered Map with Popups**
- **Interactive Icons & Legends**
- **Clickable Popups**

### Summary Cards
- Show average statistics such as price, bedrooms, bathrooms, and beds.
- Highlight the cheapest listing on the dashboard.

### Comparison Tools
- **Radar Chart**
- **Progress Bars & Tables**

### Calendar Analysis
- **Gantt & Line Charts** for availability trends.

### Location Analysis
- **Boxplots & Averages by Neighborhood** to understand price differences.

## Insights and Findings

- **Sentiment Analysis:** Guest reviews are overwhelmingly positive.
- **Price Distribution:** Most listings fall between \$51–\$150, with stable trends over time.
- **Neighborhood Price Trends:** Wards like the Fifteenth are more expensive, while the Fifth offers budget options.
- **Event Impact:** High booking demand during events like university graduations and Thanksgiving.

## Technologies Used

| Category        | Tools/Frameworks                                |
| --------------- | ----------------------------------------------- |
| Frontend        | HTML5, CSS3 (Custom + Bootstrap 4), JavaScript  |
| Visualization   | Chart.js, Google Charts, Plotly (if used)       |
| Animation/UX    | AOS (Animate On Scroll)                         |
| Data Processing | Pandas, Seaborn, Matplotlib (for preprocessing) |
| Fonts & Icons   | Google Fonts, Font Awesome                      |

## Folder Structure

```plaintext
albany-airbnb-dashboard/
├── index.html              # Main dashboard file
├── static/
│   ├── index.css           # Custom styles
│   ├── *.png / *.jpg       # Icons, charts, profile, and modal images
│   ├── *.pdf               # Resume or documentation files
├── js/
│   ├── image-modal.js      # Modal handling script
│   └── ...                 # (Optional) Other helper scripts
```
