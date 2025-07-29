import React from "react";

const NewsItem = ({ title, description, src, url }) => {
  return (
    <div className="card mb-4 w-100 bg-dark text-white">
      <img
        src={src}
        className="card-img-top"
        alt="News"
        style={{ height: "150px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title || "No Title"}</h5>
        <p className="card-text flex-grow-1">
          {description ? description.slice(0, 100) + "..." : "No description available."}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-light mt-auto"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;


