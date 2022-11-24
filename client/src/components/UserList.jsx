import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function UserList({ users, editUser, getUsers }) {
  const deleteUser = (user) => {
    axios
      .delete(`http://localhost:3000/user/${user._id}`)
      .then(() => getUsers());
  };

  return (
    <div className="space-y-4">
      <h2 className="lg:text-4xl font-semibold">User List</h2>

      {users.map((user) => (
        <div
          className="flex space-x-4 justify-start items-center"
          key={user._id}
        >
          <h4 className="lg:text-2xl">{user.name}</h4>
          <p className="lg:text-1xl">{user.email}</p>
          <small className="lg:text-sm">{user.age}</small>
          <div className="space-x-4 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faPencil}
              className="cursor-pointer"
              onClick={() => editUser(user)}
            />
            <FontAwesomeIcon icon={faTrash} className="cursor-pointer" onClick={() => deleteUser(user)}/>
          </div>
        </div>
      ))}
    </div>
  );
}
