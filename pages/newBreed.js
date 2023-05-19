import { useState } from "react";
import { allTemperaments } from "@/services/temperaments";
import Tag from "@/components/Tag";
import styles from "../styles/tag.module.css";
import formStyles from "../styles/newBreed.module.css";

const NewBreed = () => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [id, setId] = useState("");
  const [lifeSpan, setLifeSpan] = useState("");
  const [temperaments, setTemperaments] = useState([]);
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const nameHandler = (evt) => {
    setName(evt.target.value);
  };

  const originHandler = (evt) => {
    setOrigin(evt.target.value);
  };

  const idHandler = (evt) => {
    setId(evt.target.value);
  };

  const lifeSpanHandler = (evt) => {
    setLifeSpan(evt.target.value);
  };

  const descriptionHandler = (evt) => {
    setDescription(evt.target.value);
  };

  const temperamentsHandler = (tag) => {
    const newTemperaments = temperaments;
    if (!newTemperaments.includes(tag)) {
      setTemperaments([...newTemperaments, tag]);
    }
  };

  const createHandler = async () => {
    // const auth = getAuth();
    // try {
    //   await createUserWithoriginAndid(auth, origin, id);
    //   await updateProfile(auth.currentUser, {
    //     displayName: name,
    //   });
    //   console.log(auth.currentUser);
    // } catch (error) {
    //   console.log(error.message);
    //   setLifeSpan(error.message);
    // }
  };

  return (
    <div className="main">
      <form className={formStyles.form}>
        <label htmlFor="name">name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter the new breed's name"
          onChange={nameHandler}
        />

        <label htmlFor="origin">origin:</label>
        <input
          type="text"
          id="origin"
          name="origin"
          placeholder="Enter the breed's origin"
          onChange={originHandler}
        />

        <label htmlFor="id">id:</label>
        <input
          type="id"
          placeholder="Enter breed id"
          onChange={idHandler}
        ></input>

        <label htmlFor="id">lifespan:</label>
        <input
          type="id"
          placeholder="Enter breed lifespan"
          onChange={lifeSpanHandler}
        ></input>

        <label htmlFor="description">description:</label>
        <input
          type="id"
          placeholder="Enter breed description"
          onChange={descriptionHandler}
        ></input>

        <label>Select temperament Traits:</label>
        <div className={styles.tags_container}>
          {allTemperaments.map((tag) => {
            return <Tag key={tag} tag={tag} onClick={temperamentsHandler} />;
          })}
        </div>

        <div className="buttons-container">
          <button type="button" onClick={createHandler}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBreed;
