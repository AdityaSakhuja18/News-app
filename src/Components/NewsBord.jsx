import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const validCategories = [
    "top",
    "technology",
    "business",
    "health",
    "sports",
    "entertainment",
  ];

  const fetchNewsWithRetry = async (url, retries = 3, delay = 2000) => {
    try {
      const res = await fetch(url);

      if (res.status === 429 && retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchNewsWithRetry(url, retries - 1, delay);
      }

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;

    if (!apiKey) {
      setError("API key missing! Please add it to your .env file.");
      return;
    }

    const chosenCategory = validCategories.includes(category)
      ? category
      : "top";

    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=us&language=en&category=${chosenCategory}`;

    setError(null);
    setArticles([]);

    fetchNewsWithRetry(url)
      .then((data) => {
        const results = data?.results;
        if (Array.isArray(results) && results.length > 0) {
          setArticles(results);
        } else {
          setError("No news articles found.");
        }
      })
      .catch((err) => {
        setError(err.message || "Error fetching news.");
      });
  }, [category]);

  return (
    <div className="news-board container">
      <h2 className="text-center mb-4">
        Latest <span className="badge bg-danger">News</span>
      </h2>

      {error ? (
        <p className="text-center text-danger">{error}</p>
      ) : articles.length > 0 ? (
        <div className="row">
          {articles.map((news, index) => (
            <div className="col-md-3 d-flex align-items-stretch" key={index}>
              <NewsItem
                title={news.title}
                description={news.description}
                src={
                  news.image_url && news.image_url.startsWith("http")
                    ? news.image_url
                    : "https://placehold.co/300x150?text=No+Image"
                }
                url={news.link}
              />
            </div>
          ))}
        </div>
      ) : (
        !error && <p className="text-center">No articles available.</p>
      )}
    </div>
  );
};

export default NewsBoard;


