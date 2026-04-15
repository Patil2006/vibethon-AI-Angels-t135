import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-hero">
      <h1>Welcome to the <span>AI Playground</span></h1>
      <p>
        Learn machine learning concepts through interactive lessons, mini games,
        and quizzes — no prior experience needed. Just curiosity.
      </p>
      <Link to="/learn" className="btn-primary">Get Started</Link>
    </div>
  );
}

export default Home;
