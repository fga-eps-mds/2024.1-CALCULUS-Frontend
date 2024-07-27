"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface User {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Usuário logando com: ", user);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Box className="h-screen w-screen flex justify-center items-center bg-[#F8F3F3] box-border gap-0">
      <Box className="flex flex-col text-center box-border gap-3 max-h-[900px] justify-self-center">
        <Box className="flex flex-col justify-around mb-2">
          <Image
            className="self-center"
            src="/images/login.png"
            alt="Logo"
            width={120}
            height={120}
          />
          <p className="text-[32px] font-bold">Login</p>
        </Box>

        <Grid
          container
          spacing={1}
          justifyContent="center"
          className="mt-2 mb-2"
        >
          <Grid item>
            <button className="w-[115px] h-[50px] shadow-[0_6px_0px_0px_rgba(0,0,0,0.1)] bg-[##FFFAFA] border-2  border-[#E0E0E0] rounded-[50px] text-center">
              <Image
                src="/images/google.svg"
                width={0}
                height={0}
                alt="Google"
                className="w-full h-[25px]"
              />
            </button>
          </Grid>
          <Grid item>
            <button className="w-[115px] h-[50px] shadow-[0_6px_0px_0px_rgba(0,0,0,0.1)]  bg-[##FFFAFA] border-2  border-[#E0E0E0] rounded-[50px] text-center">
              <Image
                src="/images/microsoft.svg"
                width={0}
                height={0}
                alt="Microsoft"
                className="w-full h-[25px]"
              />
            </button>
          </Grid>
          <Grid item>
            <button className="w-[115px] h-[50px] shadow-[0_6px_0px_0px_rgba(0,0,0,0.1)]  bg-[##FFFAFA] border-2  border-[#E0E0E0] rounded-[50px] text-center">
              <Image
                src="/images/apple.svg"
                width={0}
                height={0}
                alt="Apple"
                className="w-full h-[25px]"
              />
            </button>
          </Grid>
        </Grid>

        <Box
          component="form"
          onSubmit={handleLogin}
          className="grid gap-4 justify-center m-3"
        >
          <TextField
            type="email"
            name="email"
            placeholder="Email"
            label="Email"
            required
            sx={{ width: "380px" }}
            value={user.email}
            margin="dense"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="justify-self-center"
          />

          <TextField
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            label="Password"
            value={user.password}
            sx={{ width: "380px" }}
            margin="dense"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="justify-self-center"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Link href="#" className="block m-2">
            <p className="text-[18px] font-medium">Recuperar a senha</p>
          </Link>
          <Button
            type="submit"
            className="w-[380px] h-[56px] shadow-lg bg-[#1f1f1f] border-2 rounded-3xl hover:bg-[#1f1f1f] mb-7 justify-self-center"
          >
            <p className="font-bold text-white">Login</p>
          </Button>
        </Box>

        <p className="text-[18px] font-medium">
          Novo Usuário?
          <Link href="#" className="text-indigo-700 block">
            Cadastre-se
          </Link>
        </p>
      </Box>
    </Box>
  );
};

export default LoginForm;
