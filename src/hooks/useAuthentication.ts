import { useEffect, useState } from 'react';

import cookie from 'js-cookie';
import { gql, useMutation } from '@apollo/client';

type Payload = {
  token: string;
  username: string;
  firstName: string;
  lastName: string;
  role: {
    name: string;
    slug: string;
    id: number;
  };
};

interface IReturnProperties {
  login: (payload: Payload) => Promise<void>;
  logout: () => Promise<void>;

  loggedIn: boolean;
  loading: boolean;

  firstName: string;
  lastName: string;
  username: string;
  role: string;
  token: string;
}

const VALIDATE_TOKEN = gql`
  mutation ValidateToken($input: ValidateTokenInput!) {
    validateToken(input: $input) {
      token
      username
      firstName
      lastName
      role {
        name
        slug
      }
    }
  }
`;

const useAuthentication = (
  cb: (token: string) => Promise<void> = () => new Promise((r) => r()),
): IReturnProperties => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [checkTokenMutation] = useMutation(VALIDATE_TOKEN);

  useEffect(() => {
    (async () => {
      const tokenCookie = cookie.get('token');

      if (tokenCookie) {
        try {
          const { data } = await checkTokenMutation({
            variables: {
              input: {
                token: tokenCookie,
              },
            },
          });

          const {
            username: fetchedUsername,
            firstName: fetchedFirstName,
            lastName: fetchedLastName,
            role: fetchedRole,
          } = data.validateToken;

          setLoggedIn(true);

          setToken(tokenCookie);
          setUsername(fetchedUsername);
          setFirstName(fetchedFirstName);
          setLastName(fetchedLastName);
          setRole(fetchedRole.slug);

          await cb(tokenCookie);
        } catch (_) {
          setLoggedIn(false);
        }
      }

      setLoading(false);
    })();
  }, []);

  const login = async (payload: Payload) => {
    const {
      token: fetchedToken,
      username: fetchedUsername,
      role: fetchedRole,
      firstName: fetchedFirstName,
      lastName: fetchedLastName,
    } = payload;

    cookie.set('token', fetchedToken, { sameSite: 'strict' });

    setUsername(fetchedUsername);
    setRole(fetchedRole.slug);
    setFirstName(fetchedFirstName);
    setLastName(fetchedLastName);

    setLoggedIn(true);
  };

  const logout = async () => {
    cookie.remove('token');
    setLoggedIn(false);
  };

  return { login, logout, loading, loggedIn, username, role, firstName, lastName, token };
};

export default useAuthentication;
