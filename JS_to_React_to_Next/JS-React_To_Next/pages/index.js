import { useState } from 'react';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
  const [likes, setLikes] = useState(0);

  function handleClick() {
    if (likes >= 0) setLikes(likes + 1);
  }

  function handleDisLike() {
    if (likes > 0) setLikes(likes - 1);
  }

  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick} style={{ marginRight: '10px' }}>
        Like ({likes})
      </button>

      <button disabled={likes === 0} onClick={handleDisLike}>
        Dislike
      </button>
    </div>
  );
}
