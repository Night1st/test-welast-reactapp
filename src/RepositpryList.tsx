import React, {useState, useEffect} from "react";
import axios from "axios"
import { Repository } from "./repository";

const RepositoryList = () => {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [filteredRepos, setFilteredRepos] = useState<Repository[]>([])

    useEffect(() => {
      // Fetch the repository data
      const fetchData = async () => {
        try {
          const res = await axios.get<Repository[]>('http://localhost:3000/repos')
          const sortedRepos = res.data.sort(
            (a: Repository, b: Repository) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
          );

          setRepos(sortedRepos)
          setFilteredRepos(sortedRepos)
        }
        catch(error) {
            console.error('Error fetching data:', error);
        }
      }
      fetchData()  
    }, []);
    return (
        <div>
        <h1>GitHub Repositories</h1>
        <ul>
          {filteredRepos.map(repo => (
            <li key={repo.id}>
              <h2>Name: {repo.name}</h2>
              <p>Description: {repo.description}</p>
              <p>Language: {repo.language}</p>
              <p>Forks: {repo.forks_count}</p>
            </li>
          ))}
        </ul>
      </div>
    )
}

export default RepositoryList