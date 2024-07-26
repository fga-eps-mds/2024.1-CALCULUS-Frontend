"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";

interface User {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Usuário logando com: ", user);
  };

  return (
    <Box className="h-screen w-full flex justify-center items-center bg-[#fffafa] box-border">
      <Box className=" flex flex-col text-center box-border p-4">
        <Box className="flex flex-col justify-around mb-2">
          <Image
            className="self-center"
            src="/images/login.png"
            alt="Logo"
            width={120}
            height={120}
          />
          <Typography className="text-[2rem]" variant="h2">
            Login
          </Typography>
        </Box>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          className="mt-2 mb-2"
        >
          <Grid item>
            <Button className="h-12 shadow-lg bg-[#f8f6f6] border-2  rounded-3xl">
              <Image
                src="/images/google.svg"
                width={25}
                height={25}
                alt="Google"
              />
            </Button>
          </Grid>
          <Grid item>
            <Button className="h-12 shadow-lg bg-[#f8f6f6] border-2 rounded-3xl" >
              <Image
                src="/images/microsoft.svg"
                width={25}
                height={25}
                alt="Microsoft"
              />
            </Button>
          </Grid>
          <Grid item>
            <Button className="h-12 shadow-lg bg-[#f8f6f6] border-2 rounded-3xl">
              <Image
                src="/images/apple.svg"
                width={25}
                height={25}
                alt="Apple"
              />
            </Button>
          </Grid>
        </Grid>

        <Box
          component="form"
          onSubmit={handleLogin}
          className="flex flex-col items-center m-2"
        >
          <TextField
            type="email"
            name="email"
            placeholder="Email"
            required
            fullWidth
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className=""
          />
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            required
            fullWidth
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className=""
          />
          <Link href="#" className="block m-3">
            Recuperar senha
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="w-full h-12 p-1 text-white text-base cursor-pointer mb-5"
          >
            Log in
          </Button>
        </Box>

        <Typography variant="body1" textAlign="center">
          Novo Usuário?{" "}
          <Link href="#" className="text-indigo-700 block">
            Cadadastre-se
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
