import React from 'react';

const NotFoundPage: React.FC = () => {
  console.log("url: ", location.href)
  return <h1>NOT FOUND</h1>;
};

export default NotFoundPage;
