import { Box, Button, Container, Grid, Typography, styled } from '@mui/material';

import Link from 'src/components/Link';
import { useState } from 'react';
import type { NextPage } from 'next';
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import SetCookie from '@/hooks/setCookie';
import Sign from '@/mesh/sign';
import GetCookie from '@/hooks/getCookie';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const NextJsAvatar = styled(Box)(
  ({ theme }) => `
  width: ${theme.spacing(8)};
  height: ${theme.spacing(8)};
  border-radius: ${theme.general.borderRadius};
  background-color: #dfebf6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      const stakeId = await wallet.getRewardAddresses();
      const myWallet = await wallet.getUsedAddresses();
      SetCookie('stakeId', stakeId);
      setAssets(_assets);
      setLoading(false);

      fetch('http://tamperproofcerts.somee.com/api/v1/Home', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(GetCookie('stakeId'))
      })
        .then(response => response.json())
        .then(data => {
          // Xử lý dữ liệu trả về từ API
          alert(data.username)
          if (data.username != undefined) {
            window.location.href = '/dashboards/crypto'
          }
          else {
            window.location.href = '/login-register/register'
          }
        })
        .catch(error => {
          // Xử lý lỗi nếu có
          console.error(error);
        });
    }
  }
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        justifyContent="center"
        alignItems="center"
        container
      >
        <div>
          <h1>LOGIN</h1>
          <CardanoWallet />
          {connected && (
            <>
              {assets ? (
                <pre>

                </pre>
              ) : (
                <Button
                  onClick={() => getAssets()}
                  disabled={loading}
                  style={{
                    marginTop: '20px',
                  }}
                >
                  CONFIRM
                </Button>
              )}
            </>
          )}

        </div>
      </Grid>
    </Container>
  );
}

export default Hero;
