import { Card } from '@mui/material';
import ReceivedCertsOrdersTable from './ReceivedCertsOrdersTable';
import { useState, useEffect  } from 'react';
import axios from 'axios';
import GetCookie from '@/hooks/getCookie';

function ReceivedCertsOrders() {
  const [receivedCerts, setReceivedCerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://tamperproofcerts.somee.com/api/v1/Certificate/certificate-received';
        const payload = GetCookie('stakeId');
        const headers = {
          Accept: '*/*',
          'Content-Type': 'application/json'
        };

        const response = await axios.post(url, payload, { headers });
        setReceivedCerts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  });
  
  return (
    <Card>
      <ReceivedCertsOrdersTable certificates={receivedCerts} />
    </Card>
  );
}

export default ReceivedCertsOrders;
