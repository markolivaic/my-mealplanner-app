const Badge = ({ status }) => {
    const getStatusClass = () => {
      switch(status) {
        case 'approved':
          return 'badge-success';
        case 'pending':
          return 'badge-warning';
        case 'rejected':
          return 'badge-error';
        default:
          return '';
      }
    };
  
    const getStatusText = () => {
      switch(status) {
        case 'approved':
          return 'Approved';
        case 'pending':
          return 'Pending Approval';
        case 'rejected':
          return 'Rejected';
        default:
          return status;
      }
    };
  
    return (
      <span className={`badge ${getStatusClass()}`}>
        {getStatusText()}
      </span>
    );
  };
  
export { Badge };