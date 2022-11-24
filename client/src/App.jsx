import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import UserList from "./components/UserList";
import axios from "axios";
import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  }, [users]);

  const getUsers = () => {
    axios
      .get("http://localhost:3000/user")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  };

  const editUser = (user) => {
    setSelectedUser(user);
  };

  const deselectedUser = () => {
    setSelectedUser(null);
  };

  const openModal = () => {
    const ModalUserForm = lazy(() => import("./components/UserFormModal"));
    const modalDiv = document.createElement("div");
    modalDiv.id = "modalUserForm";
    document.body.appendChild(modalDiv);

    const root = createRoot(modalDiv);
    root.render(
      <Suspense fallback={<div>...Loading</div>}>
        <ModalUserForm
          getUsers={getUsers}
          selectedUser={selectedUser}
          deselectedUser={deselectedUser}
        />
        ;
      </Suspense>
    );
  };

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <div className="App flex justify-center items-center space-x-48">
      <button
        onClick={handleOpenModal}
        className="font-medium bg-slate-400 py-1 px-4 rounded-md"
      >
        Registrate New User
      </button>
      <UserList users={users} editUser={editUser} getUsers={getUsers} />
    </div>
  );
}

export default App;
