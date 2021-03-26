import { useEffect, useState } from 'react';
import { getUser } from './api';

type API = { getUser: getUser };

const query = <Endpoint extends keyof API>(
  endpoint: Endpoint,
  ...args: Parameters<API[Endpoint]>
): ReturnType<API[Endpoint]> => {
  return fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ endpoint, arguments: args }),
  }).then((response) => response.json()) as any;
};

const IndexPage = () => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    query('getUser', 'user_12378192874').then(setUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
    </div>
  );
};

export default IndexPage;
