import React, { useEffect, useState, useCallback } from "react";
import Card from "@/components/Card";
import styles from "../styles/home.module.css";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { editFavorites, getUserDataWatcher } from "@/services/firebase";

export default function Home() {
  const [breeds, setBreeds] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState({});
  const [filter, setFilter] = useState(false);
  const [allBreeds, setAllBreeds] = useState([]);
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

      setAllBreeds(dataWithImage);
      setBreeds(allBreeds);
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
    const sucessCb = (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setFavorites(data.favorite_ids);
      } else {
        setFavorites([]);
      }
    };

    const errorCb = (error) => {
      console.log("Error updating userData in watcher", error);
    };

    await getUserDataWatcher(user.uid, sucessCb, errorCb);
  }, [user]);

  useEffect(() => {
    getFavorites();

    return getFavorites;
  }, [getFavorites, user]);

  const addCatToFavorites = (catId) => {
    const newFavorites = [...favorites, catId];
    editFavorites(user.uid, newFavorites);
  };

  const removeCatFromFavorites = (catId) => {
    const newFavorites = favorites.filter((cat) => cat !== catId);
    editFavorites(user.uid, newFavorites);
  };

  const toggleFavorites = () => {
    filter
      ? setBreeds(allBreeds)
      : setBreeds(breeds.filter((breed) => favorites.includes(breed.id)));
    setFilter(!filter);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="home">
      <header>
        <h2>Welcome, {user.displayName}</h2>
        <button onClick={toggleFavorites}>
          {filter ? "Show All Breeds" : "Show favorite Breeds"}
        </button>
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
                addCatToFavorites={addCatToFavorites}
                removeCatFromFavorites={removeCatFromFavorites}
              />
            );
          })}
      </div>
    </div>
  );
}
