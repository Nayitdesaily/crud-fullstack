import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function UserFormModal({
  getUsers,
  selectedUser,
  deselectedUser,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setAge("");
  };

  useEffect(() => {
    if (selectedUser != null) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setAge(selectedUser.age);
    }
  }, [selectedUser]);

  const submit = (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      age: age,
    };

    if (selectedUser != null) {
      axios
        .patch(`http://localhost:3000/user/${selectedUser._id}`, newUser)
        .then(() => {
          getUsers(), reset(), deselectedUser();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3000/user", newUser)
        .then(() => {
          getUsers(), reset();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="h-[100vh] w-full bg-slate-800 absolute flex justify-center items-center">
      <form
        onSubmit={submit}
        className="space-y-6 border-2 h-[50vh] w-[30vw] flex flex-col items-center justify-center rounded-md bg-white"
      >
        <div className="space-x-5">
          <label htmlFor="name" className="lg:text-1xl font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Insert your name"
            className="lg:text-1xl text-center bor"
          />
        </div>
        <div className="space-x-5">
          <label htmlFor="email" className="lg:text-1xl font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Insert your email"
            className="lg:text-1xl text-center"
          />
        </div>
        <div className="space-x-5">
          <label htmlFor="age" className="lg:text-1xl font-semibold">
            Age:
          </label>
          <input
            type="number"
            id="age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            placeholder="Insert your age"
            className="lg:text-1xl text-center"
          />
        </div>

        <button
          type="submit"
          className="px-3 py-1 bg-yellow-400 font-medium rounded-lg"
        >
          {selectedUser == null ? "Create User" : "Update User"}
        </button>
      </form>
    </div>
  );
}
