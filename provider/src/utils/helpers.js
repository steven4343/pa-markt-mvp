export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (time) => {
  return time;
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return '#FFA500';
    case 'confirmed':
      return '#2196F3';
    case 'completed':
      return '#4CAF50';
    case 'cancelled':
      return '#F44336';
    default:
      return '#666';
  }
};

export const getServiceTypeLabel = (type) => {
  const types = {
    plumbing: 'Plumbing',
    electrical: 'Electrical',
    cleaning: 'Cleaning',
    hvac: 'HVAC',
    carpentry: 'Carpentry',
    mechanic: 'Mechanic'
  };
  return types[type] || type;
};
