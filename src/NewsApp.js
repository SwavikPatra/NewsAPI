import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const NewsApp = () => {
  const [country, setCountry] = useState('in'); // Default to India
  const [topic, setTopic] = useState('general'); // Default topic
  const [articles, setArticles] = useState([]);
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

  useEffect(() => {
    fetchNews();
  }, []); // Empty dependency array ensures that this effect runs only once, when the component mounts

  const fetchNews = () => {
    axios
      .get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${topic}&apiKey=${apiKey}`)
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  return (
    <div className="container">
      <header>
        <h1>News App</h1>
      </header>
      <div className="select-group">
        <label htmlFor="country">Select Country:</label>
        <select id="country" value={country} onChange={handleCountryChange}>
          <option value="in">India</option>
          <option value="us">USA</option>
          {/* Add more countries as needed */}
        </select>
      </div>
      <div className="select-group">
        <label htmlFor="topic">Select Topic:</label>
        <select id="topic" value={topic} onChange={handleTopicChange}>
          <option value="general">General</option>
          <option value="business">Business</option>
          {/* Add more topics as needed */}
        </select>
      </div>
      <button onClick={fetchNews}>Fetch News</button>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsApp;
