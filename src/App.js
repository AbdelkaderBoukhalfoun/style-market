import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

import './App.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/topics')}>Topics</button>
      <h1>Home Page</h1>
      <Link to="/topics">Go to Topics</Link>
    </div>
  );
};

const TopicsList = () => (
  <div>
    <h1>Topics List</h1>
  </div>
);

const TopicDetail = () => (
  <div>
    <h1>Topic Detail</h1>
  </div>
);

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics" element={<TopicsList />} />
        <Route path="/topics/:topicId" element={<TopicDetail />} />
      </Routes>
    </div>
  );
}

export default App;
