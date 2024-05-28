import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import type { NextPage } from 'next';
import type { FormEvent } from 'react';

import Router from 'next/router';
import Head from 'next/head';

import PasswordInput from '@element/PasswordInput';
import Button from '@element/Button';
import Input from '@element/Input';
import Title from '@element/Title';

import useAuthentication from '@hook/useAuthentication';

import { getPathFromRole } from '@util/transcript.utils';

const LOGIN = gql`
  mutation Mutation($input: LoginInput!) {
    login(input: $input) {
      id
      username
      token
      firstName
      lastName
      role {
        id
        name
        slug
      }
    }
  }
`;

const Home: NextPage = () => {
  const { login, loggedIn, loading, role } = useAuthentication();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);

  const [loginMutation] = useMutation(LOGIN);

  useEffect(() => {
    setError(false);
  }, [username, password]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const variables = { input: { username, password } };

    try {
      const { data } = await loginMutation({ variables });
      if (!data.login) return;

      await login(data.login);

      Router.push(getPathFromRole(data.login.role.slug));
    } catch (err) {
      setError(true);
    }
  };

  if (loggedIn) {
    Router.push(getPathFromRole(role));
    return <div />;
  }

  if (loading) {
    return <div />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Head>
        <title>Connexion</title>
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
          valid={!error}
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
          valid={!error}
          required
        />

        <Button htmlType="submit" className="mt-2">
          Se connecter
        </Button>
      </form>
    </div>
  );
};

export default Home;
