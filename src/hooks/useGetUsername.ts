import { ANIMALS, USERNAME_STORAGE_KEY } from "@/app/util/consts";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const generateUsername = () => {
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const id = nanoid(5);
  return `anonymous-${animal}-${id}`;
};

export const useGetUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const initUsername = async () => {
      let username = localStorage.getItem(USERNAME_STORAGE_KEY);

      if (!username) {
        username = generateUsername();
        localStorage.setItem(USERNAME_STORAGE_KEY, username);
      }

      setUsername(username.toLocaleLowerCase().trim());
    };

    initUsername();
  }, []);
  return { username };
};
