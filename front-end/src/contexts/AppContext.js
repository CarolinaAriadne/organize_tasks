import React, { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from " react-router-dom";
import api from "../services/api";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const getUsers = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const { data } = await api.get("/users", {
        headers: { Authorization: user.token },
      });
      if (data) setUsers(data);
    } catch (error) {
      console.log(error);
      if (error.message.includes("404")) {
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  };

  const getTasks = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      try {
        const { data } = await api.get("/tasks", {
          headers: { Authorization: user.token },
        });
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const value = useMemo(
    () => ({
      users,
      setUsers,
      tasks,
      setTasks,
      getUsers,
      getTasks,
    }),
    [users, tasks]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
    children: PropTypes.object,
}.isRequired;
