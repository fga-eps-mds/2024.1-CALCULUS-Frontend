'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const CalculusHeader: React.FC = () => {
    const { data: session } = useSession();
  return (
    <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}
          >
            <Link href={session ? '/home' : '/'}>
            Calculus
            </Link>
          </Typography>
  );
};

export default CalculusHeader;

