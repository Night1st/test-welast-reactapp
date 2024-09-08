import React, {useState, useEffect} from "react";
import axios from "axios"
import { Repository } from "./repository";

const RepositoryList = () => {
    const [repos, setRepos] = useState<Repository[]>([]);

    useEffect(() => {
        // Fetch the repository data
        axios.get<Repository[]>('https://api.github.com/users/freeCodeCamp/repos')
          .then(response => {
            setRepos(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
    return (
        <div>
        <h1>GitHub Repositories</h1>
        <ul>
          {repos.map(repo => (
            <li key={repo.id}>
              <h2>{repo.name}</h2>
              <p>{repo.description}</p>
              <p>Language: {repo.language}</p>
              <p>Forks: {repo.forks_count}</p>
            </li>
          ))}
        </ul>
      </div>
    )
}

export default RepositoryList