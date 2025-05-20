import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '70vh',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '8rem', margin: 0, color: '#4CAF50' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ maxWidth: '500px', textAlign: 'center', margin: '1.5rem 0' }}>
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;