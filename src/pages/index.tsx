import { useState } from 'react';

import type { NextPage } from 'next';
import type { FormEvent } from 'react';

import Head from 'next/head';

import Button from '@element/Button';
import Input from '@element/Input';
import Title from '@element/Title';
import PasswordInput from '@element/PasswordInput';

const Home: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    // TODO : Make the handle submit computations.
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Head>
        <title>Connection</title>
      </Head>

      <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-4">
          <Title>Se connecter</Title>

          <Title level={3}>
            Veuillez renseigner votre nom d&apos;utilisateur et votre mot de passe.
          </Title>
        </div>

        <Input
          name="username"
          value={username}
          setValue={setUsername}
          label="Nom d'utilisateur"
          placeholder="jdoe"
          className="w-full"
          maxLength={20}
          required
        />

        <PasswordInput
          name="password"
          value={password}
          setValue={setPassword}
          label="Mot de passe"
          placeholder="*****"
          htmlType="password"
          className="w-full"
        />

        <Button htmlType="submit" className="mt-2">
          Se connecter
        </Button>
      </form>
    </div>
  );
};

export default Home;
