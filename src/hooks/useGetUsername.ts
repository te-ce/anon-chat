import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
const ANIMALS = [
  "Lion",
  "Tiger",
  "Elephant",
  "Giraffe",
  "Zebra",
  "Monkey",
  "Chimpanzee",
  "Gorilla",
  "Panda",
  "Koala",
  "Kangaroo",
  "Wolf",
  "Fox",
  "Bear",
  "Deer",
  "Moose",
  "Bison",
  "Rhino",
  "Hippo",
  "Cheetah",
  "Leopard",
  "Coyote",
  "Raccoon",
  "Squirrel",
  "Rabbit",
  "Hedgehog",
  "Badger",
  "Otter",
  "Seal",
  "Dolphin",
  "Whale",
  "Shark",
  "Octopus",
  "Penguin",
  "Eagle",
  "Falcon",
  "Owl",
  "Parrot",
  "Flamingo",
  "Peacock",
  "Crocodile",
  "Alligator",
  "Snake",
  "Turtle",
  "Frog",
  "Lizard",
  "Snail",
  "Worm",
  "Ant",
  "Bee",
];
const STORAGE_KEY = "vapor-chat-username";

const generateUsername = () => {
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const id = nanoid(5);
  return `anonymous-${animal}-${id}`;
};

export const useUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const initUsername = async () => {
      let username = localStorage.getItem(STORAGE_KEY);

      if (!username) {
        username = generateUsername();
        localStorage.setItem(STORAGE_KEY, username);
      }

      setUsername(username.toLocaleLowerCase().trim());
    };

    initUsername();
  }, []);
  return { username };
};
