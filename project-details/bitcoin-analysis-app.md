# Bitcoin Analysis Web Application

A web-based Bitcoin data analysis and prediction tool built using Django and Python data science libraries. This project analyzes historical Bitcoin prices and provides users with statistical summaries, visualizations, and linear regression-based predictions.

## Project Overview

This system allows users to:

- Upload and analyze historical Bitcoin CSV datasets.
- View descriptive statistics such as mean, median, standard deviation, and max/min values.
- Visualize daily price trends (Open, High, Low, Close, Volume, Weighted Price).
- Predict future values for specific dates using trained linear regression models.
- Compare Python-based analysis with Weka for model validation.

## Objectives

- Analyze Bitcoin price data from 2019–2021 using descriptive and predictive analytics.
- Visualize price movements and correlations using line graphs and correlation matrices.
- Train and use linear regression models to forecast price metrics.
- Support decision-making for traders and investors through insights on price trends, volatility, and trading volume.

## Dataset

- **Source:** [Kaggle - Bitcoin Linear Regression](https://www.kaggle.com/code/mohamedelnahry/bitcoin-linear-regression)
- **Period Covered:** January 2012 – December 2021
- **Focus Years:** 2019–2021 (due to size limitations)
- **Features:**
  - Timestamp (Unix)
  - Open, High, Low, Close
  - Volume (BTC & Currency)
  - Weighted Price

## Features and Functionality

### Descriptive Statistics
- Mean, Median, Mode
- Standard Deviation
- Max/Min Values and Dates
- Range and Row Count

### Visualization Page
- Line graphs per column using Chart.js
- Daily aggregation of prices for performance
- Supports monthly trend visualizations

### Prediction Page
- Input date field
- Converts input to Unix timestamp
- Loads pre-trained models per column
- Displays prediction results

### Data Management
- File upload and parsing
- In-memory variable storage
- Clear button to reset UI (not persistent on file system)

## Technology Stack

| Layer        | Tools & Libraries                          |
|--------------|--------------------------------------------|
| Framework    | Django (MVT Architecture)                  |
| Backend      | Python, Pandas, Scikit-learn, Matplotlib   |
| Frontend     | HTML, CSS, Bootstrap, JavaScript, Chart.js |
| Data Source  | CSV (uploaded by user)                     |
| Model Output | Joblib-serialized regression models        |

## Data Processing Pipeline

1. **Upload CSV** from UI.
2. **Clean data** by removing null rows and duplicates and converting timestamps to readable dates.
3. **Slice and aggregate** data to daily for performance, separating per year or month as needed.
4. **Generate analytics** including descriptive stats and correlation matrices.
5. **Modeling & Prediction** using linear regression models loaded from disk to forecast price metrics.

## Analysis Highlights

- **High Correlation** between price-related metrics (Open, High, Low, Close, Weighted Price).
- **Volatility** is evident with wide standard deviations.
- **Price prediction** shows potential for future forecasting (2021+).
- **Volume trends** help evaluate investor interest and liquidity.

## Interface Pages

- `/` - Home Page (Descriptive Statistics)
- `/about` - Dataset and project context
- `/visualization` - Interactive visual analysis (charts)
- `/prediction` - Date-based prediction input and result

## Future Enhancements

- Improve prediction accuracy with advanced models (e.g., LSTM).
- Expand mobile responsiveness.
- Add more visualization types (candlestick, boxplots).
- Integrate crypto API for live data comparison.
- Add feature to upload and compare multiple datasets.

## Developer

**Seanne Cañete**  
Mindanao State University – General Santos City  
📧 seannecanete32@gmail.com

## References

- Kaggle: [Bitcoin Linear Regression](https://www.kaggle.com/code/mohamedelnahry/bitcoin-linear-regression)
