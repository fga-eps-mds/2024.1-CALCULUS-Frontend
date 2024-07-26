'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import Head from 'next/head'

import SignUpButton from '../components/Button/SignUpButton';
import Button from '../components/Button/Button';
import cadastro1 from './cadastro1.module.css';
import mao_cerebro from '/src/public/mao_cerebro.png';

export default function SignUp() {
  const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleClick = (source: String) => {
    alert(`Botão clicado: ${source}`);
  };

  return (
    <body>
        <Head>
        <title>My page title</title>
        </Head>
        <div className={cadastro1.outerBox}>
            <Image
                src={mao_cerebro}
                width={368}
                height={368}
                alt='A picture'
            />
            <div className={cadastro1.container}>
                <p>Cadastre-se gratuitamente e descubra sua jornada de aprendizado.</p>
                <div className={cadastro1.buttonsContainer}>
                    <Button
                        label="Google"
                        onClick={() => handleClick('google')}
                        backgroundColor='#FFFAFA'
                        textColor='black'
                        shadowColor='#E0E0E0'
                    />
                    <Button
                        label="Microsoft"
                        onClick={() => handleClick('microsoft')}
                        backgroundColor='#FFFAFA'
                        textColor='black'
                        shadowColor='#E0E0E0'
                    />
                    <Button
                        label="Apple"
                        onClick={() => handleClick('apple')}
                        backgroundColor='#FFFAFA'
                        textColor='black'
                        shadowColor='#E0E0E0'
                    />

                </div>
                
                <form className={cadastro1.form} onSubmit={() => alert('Submitting!')}>
                    <input type='email' placeholder='Email' />
                    <br/>
                    <SignUpButton
                        label="Sign Up"
                        className={cadastro1.sign}
                    />
                </form>
                
                <Link className={cadastro1.link} href='https://www.google.com' title='Log In'>Já possui cadastro?Log in</Link>
            </div>
        </div>
    </body>
  );
}