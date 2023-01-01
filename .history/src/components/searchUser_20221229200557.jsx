import { useState } from "react";
import useForm from "../hooks/useForm";

const Users = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(5);

  const { inputs, updateForm, resetForm } = useForm({
    github: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://api.github.com/users/${inputs.github}/repos`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    resetForm();
  };

  const indexOfLastUser = currentPage * reposPerPage;
  const indexOfFirstUser = indexOfLastUser - reposPerPage;
  const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(user.length / reposPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>No repos Found</p>;

  return (
    <div className="searchUser">
      <h1 className="searchUser--heading">Search User</h1>
      <form className="searchUser--form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="github"
          placeholder="Enter Github Username"
          value={inputs.github}
          onChange={updateForm}
        />
        <button type="submit">Search</button>
      </form>
      <div className="searchUser--results">
        <ul>
          {currentUsers.map((user) => {
            return (
              <li key={user.id} className="searchUser--list">
                <h2 className="searchUser--list__item">{user.name}</h2>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="searchUser--pagination">
        <Pagination
          usersPerPage={reposPerPage}
          totalUsers={user.length}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};

export default Users;
