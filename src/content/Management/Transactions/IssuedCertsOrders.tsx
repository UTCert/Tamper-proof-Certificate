import { Card } from '@mui/material';
import IssuedCertsOrdersTable from './IssuedCertsOrdersTable';
import { useState, useEffect  } from 'react';
import axios from 'axios';
import GetCookie from '@/hooks/getCookie';
import { API_URL } from '@/constants/appConstants';

function IssuedCertsOrders() {
  const [issuedCert, setIssuedCert] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = API_URL+ '/Certificate/certificate-issued';
        // const payload = '"146d28b014f87920fa81c3b91007606d03ce0376c365befb5a3df1f7"';
        const payload = GetCookie("stakeId");
        const headers = {
          Accept: '*/*',
          'Content-Type': 'application/json'
        };

        const response = await axios.post(url, payload, { headers });
        setIssuedCert(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  });
  return (
    <Card>
      <IssuedCertsOrdersTable certificates={issuedCert} />
    </Card>
  );
}

export default IssuedCertsOrders;
