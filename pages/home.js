import React, { useEffect, useState, useCallback } from "react";
import Card from "@/components/Card";
import styles from "../styles/home.module.css";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { getUserData, addToUserFavorites } from "@/services/firebase";

export default function Home() {
  const [breeds, setBreeds] = useState([]);
  const [username, setUsername] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState({});

  const auth = getAuth();
  const API_KEY = process.env.API_KEY;
  const router = useRouter();

  const fetchBreeds = async () => {
    try {
      const data = await fetch(
        `https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`
      );
      const jsonData = await data.json();

      // Add image to breed object

      const dataWithImage = jsonData.map((breed) => {
        return {
          ...breed,
          imageUrl: `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`,
        };
      });

      setBreeds(dataWithImage);
    } catch (error) {
      console.log("Error fetching API DATA", error);
    }
  };

  useEffect(() => {
    fetchBreeds();
    authMonitor();

    return () => {
      authMonitor();
    };
  }, []);

  const authMonitor = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });
  };

  const getFavorites = useCallback(async () => {
    const userFavorites = await getUserData(user.uid);
    setFavorites(userFavorites);
  }, [user]);

  useEffect(() => {
    setUsername(user.displayName);
    getFavorites();
  }, [getFavorites, user]);

  const addCatToFavorites = (catId) => {
    const newFavorites = [...favorites, catId];
    addToUserFavorites(user.uid, newFavorites);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="home">
      <header>
        <h2>Welcome, {username}</h2>
        <button onClick={logout}>Logout</button>
      </header>

      <div className={styles.cards_container}>
        {breeds.length !== 0 &&
          breeds.map((breed) => {
            return (
              <Card
                key={breed.id}
                id={breed.id}
                name={breed.name}
                imageUrl={breed.imageUrl}
                temperament={breed.temperament.split(", ")}
                description={breed.description}
                lifespan={breed.life_span}
                origin={breed.origin}
                favorite={favorites.includes(breed.id)}
                handleHeartClick={addCatToFavorites}
              />
            );
          })}
      </div>
    </div>
  );
}
