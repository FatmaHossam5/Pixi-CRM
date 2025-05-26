export const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Business Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: row => row.startDate,
      sortable: true,
    },
  ];
  
  export const data = [
    { id: 1, name: 'Pixi Corp', startDate: '2024-01-15' },
    { id: 2, name: 'Innovent', startDate: '2024-03-12' },
    { id: 3, name: 'BetaWare', startDate: '2024-04-01' },
  ];
  
  export const fetchData = async () => {
    // Simulate API call
    console.log('[Business] Fetching data...');
    // Example: const response = await axios.get('/api/businesses');
    // return response.data;
  };