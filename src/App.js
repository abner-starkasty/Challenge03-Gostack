import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [count, setCount] = useState(4)
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafios ${count} - GoStack`,
      url: `https://github.com/abner-starkasty/Challenge${count}-Gostack`,
      techs: ["JS"]
    })

    const newRepository = response.data
    const newCount = count + 1

    setRepositories([...repositories, newRepository])
    setCount(newCount)
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    
    if (response.status === 204) {
      const repositoriesFiltered = repositories.filter(repo => repo.id !== id)

      setRepositories(repositoriesFiltered)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
