import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repos, setRepo] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepo(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New Repo ${Date.now()}`,
      url: "http://byteshouse.com",
      techs: "Javascript"
    })
    const new_repo = response.data;
    setRepo([...repos, new_repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepo(repos.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo=> (
            <li key={repo.id}> 
              {repo.title} 
              <button type="button" onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
