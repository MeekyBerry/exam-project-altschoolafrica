import { useState } from "react";
// import { useParams } from "react-router-dom";
import useForm from "../hooks/useForm";

const Users = () => {
  const [githubUser, setGithubUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { inputs, updateForm, resetForm } = useForm({
    github: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://api.github.com/users/${inputs.github}/repos`)
      .then((response) => response.json())
      .then((data) => {
        setGithubUser(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    resetForm();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>No repos Found</p>;

  return (
    <div className="searchUser">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="github"
          value={inputs.github}
          onChange={updateForm}
          placeholder="Enter Github username"
        />
        <button type="submit">Search</button>
      </form>
      <div className="searchUser--container">
        {githubUser.map((user) => {
          const { id, name, description } = user;
          return (
            <div key={id} className="searchUser--container__card">
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );

//       .then((response) => response.json())
//       .then((data) => {
//         setGithubUser(data);
//         setLoading(false);
//         console.log(data);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//     resetForm();
//   };

//   const handleChange = (e) => {
//     updateForm(e);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error.message === "Not Found"}</p>;

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           id="github"
//           type="text"
//           name="github"
//           value={inputs.github}
//           onChange={handleChange}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <div>
//         <h2>{githubUser.name}</h2>
//         {/* <img src={githubUser.avatar_url} alt={githubUser.name} /> */}
//         <p>{githubUser.bio}</p>
//         {/* <p>{<a href={`https://twitter.com/${githubUser.twitter_username}`}></a>}</p> */}
//       </div>
//       <div>
//         {/* <button>View user Repositories</button> */}
//         {/* <DisplayUserRepo /> */}
//       </div>
//     </div>
//   );
// };

export default Users;

// export const DisplayUserRepo = () => {
//   const [repo, setRepo] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const { inputs } = useForm({
//     github: "",
//   });

//   const userRepo = () => {
//     setLoading(true);
//     fetch(`https://api.github.com/users/${inputs.github}/repos`)
//       .then((response) => response.json())
//       .then((data) => {
//         setLoading(false);
//         setRepo(data)
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   }

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error.message === "Not Found"}</p>;

//   const {
//     name,
//     description,
//   } = repo || {};

//   return (
//     <div>
//       <button onClick={userRepo}>View user Repositories</button>
//       <div>
//         <h2>{name}</h2>
//         <p>{description}</p>
//       </div>
//       {/* <div>
//         {repo.map((repo) => (
//           <div key={repo.id}>
//             <h3>{repo.name}</h3>
//             <p>{repo.description}</p>
//             <p>{repo.language}</p>
//             <p>{repo.updated_at}</p>
//           </div>
//         ))}
//       </div> */}
//     </div>
//   );
// };