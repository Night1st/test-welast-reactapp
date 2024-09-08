import React, {useState, useEffect} from "react";
import axios from "axios"
import { Repository } from "./repository";

const RepositoryList = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([])
  const [languages, setLanguages] = useState<string[]>([])

  useEffect(() => {
    // Fetch the repository data
    const fetchData = async () => {
      try {
        const res = await axios.get<Repository[]>('http://localhost:3000/repos')
        const sortedRepos = res.data.sort(
          (a: Repository, b: Repository) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
        );

        const uniqueLanguage = (repos: Repository[]): string[] => {
          const languages: string[] = repos.map(repo => repo.language)
          const uniqueLanguages: string[] = [];
          languages.forEach(language => {
            if (language && !uniqueLanguages.includes(language)) {
                uniqueLanguages.push(language);
            }
          });
          return uniqueLanguages
        }

        setRepos(sortedRepos)
        setFilteredRepos(sortedRepos)
        setLanguages(uniqueLanguage(sortedRepos))
      }
      catch(error) {
          console.error('Error fetching data:', error);
      }
    }
    fetchData()  
  }, []);

  const handleFilterByLanguage = (language: string) => {
    setFilteredRepos(repos.filter(repo => repo.language === language))
  }
  
  return (
      <div>
      <h1>GitHub Repositories</h1>
      <div>
        {languages.map(language => (
          <button key={language} onClick={() => handleFilterByLanguage(language)}>
              {language}
          </button>
        ))}
      </div>
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