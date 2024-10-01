import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-200">
    <h1 className="text-4xl text-primary mb-4">
      <i className="fas fa-exclamation-triangle text-5xl mr-2" /> Page Not Found
    </h1>
    <p className="text-lg text-gray-700">Sorry, this page does not exist</p>
    <Link to="/" className="mt-4 px-4 py-2 bg-red text-white rounded-md hover:bg-primary-dark transition duration-300">
      Go Back Home
    </Link>
  </section>
  );
};

export default NotFound;
