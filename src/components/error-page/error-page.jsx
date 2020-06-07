import React from 'react';
import { Link } from 'react-router-dom';
import './error-page.scss';

function ErrorPage() {
  return (
    <div className='error-page'>
      <div>Something went wrong</div>
      <Link to='/'>Choose pokemon</Link>
    </div>
  );
}

export default ErrorPage;
