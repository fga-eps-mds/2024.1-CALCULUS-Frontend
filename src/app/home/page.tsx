import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Button } from '@mui/material';

export default async function HomePageLogged() {
  const session = await getServerSession(authOptions);
  console.log('Logandinho');
  console.log('Session: ', session);

  return <div className="position-relative">
    Loggado
    <Button href='/api/auth/signout'>Sair</Button>  
  </div>;
}
