# SEO Recommender Using OpenAI API

This project leverages OpenAI's API to provide SEO recommendations based on the analysis of a given webpage's content. The recommender extracts key information from the webpage and generates suggestions to improve its SEO performance.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Extracts key information from a webpage including title, description, keywords, headings, images, links, paragraphs, and scripts.
- Calculates the word count and BM25 score for the webpage content.
- Sends the extracted information to OpenAI's API to generate SEO recommendations.
- Provides recommendations in a brief format (50-75 words).

## Setup

To set up and run the project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/seo-recommender.git
    cd seo-recommender
    ```

2. **Install dependencies**:

    Ensure you have [Node.js](https://nodejs.org/) and npm installed. Then, run:

    ```bash
    npm install
    ```

3. **Set up OpenAI API key**:

    Create a `.env` file in the root directory and add your OpenAI API key:

    ```env
    OPENAI_API_KEY=your_openai_api_key
    ```

## Usage

1. **Run the server**:

    ```bash
    node server.js
    ```

2. **Open the web interface**:

    Open your web browser and navigate to `http://localhost:3000` or whatever is the output at your terminal.

3. **Analyze a webpage**:

    - Enter the URL of the webpage you want to analyze.
    - Choose the AI difficulty level for the recommendations.
    - Click the "Analyze" button to get SEO recommendations.

## Project Structure

- `server.js`: The main server file that handles the API requests and responses.
- `scrape.js`: Contains functions to scrape webpage content and calculate BM25 scores.
- `manualSEOAnalysis.js`: Contains the function to send the extracted data to OpenAI's API and get SEO recommendations.
- `public/`: Contains the HTML, CSS, and client-side JavaScript files for the web interface.
- `.env`: Environment file to store the OpenAI API key.
- `package.json`: Contains the project metadata and dependencies.

## Contributing
Contributions are welcome! If you have any suggestions or find any bugs, please open an issue or create a pull request.

## License
This project is licensed under the MIT License.

