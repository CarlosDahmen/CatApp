import { useEffect, useState } from "react";
import { allTemperaments } from "@/services/temperaments";
import Tag from "@/components/Tag";
import styles from "../styles/tag.module.css";
import formStyles from "../styles/newBreed.module.css";
import { createBreed } from "../services/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const NewBreed = () => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [id, setId] = useState("");
  const [lifeSpan, setLifeSpan] = useState("");
  const [temperaments, setTemperaments] = useState([]);
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [valid, setValid] = useState(false);

  const router = useRouter();

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

  const imgUrlHandler = (evt) => {
    setImgUrl(evt.target.value);
  };

  const temperamentsHandler = (tag) => {
    const newTemperaments = temperaments;
    if (!newTemperaments.includes(tag)) {
      setTemperaments([...newTemperaments, tag]);
    } else {
      setTemperaments(temperaments.filter((item) => item !== tag));
    }
  };

  useEffect(() => {
    if (
      name.length > 0 &&
      origin.length > 0 &&
      lifeSpan.length > 0 &&
      temperaments.length > 0 &&
      description.length > 0
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [name, origin, lifeSpan, temperaments, description, imgUrl]);

  const createHandler = async () => {
    try {
      const newBreedObject = {
        name,
        origin,
        lifeSpan,
        temperaments,
        description,
        imgUrl,
      };
      await createBreed(id, newBreedObject);
      toast.success("Breed Created Successfully!");
      setTimeout(() => {
        router.push("/home");
      }, 5000);
    } catch (error) {
      toast.error("Error updating the Database");
      console.log(error.message);
    }
  };

  return (
    <div className="main">
      {!valid && (
        <p className={formStyles.message}>
          The form must be filled out to submit
        </p>
      )}
      <form className={formStyles.form}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter the new breed's name"
          onChange={nameHandler}
          required
        />

        <label htmlFor="origin">Origin:</label>
        <input
          type="text"
          id="origin"
          name="origin"
          placeholder="Enter the breed's origin"
          onChange={originHandler}
          required
        />

        <label htmlFor="id">Id:</label>
        <input
          type="text"
          placeholder="Enter breed id"
          onChange={idHandler}
          required
        ></input>

        <label htmlFor="id">Lifespan:</label>
        <input
          type="text"
          placeholder="Enter breed lifespan"
          onChange={lifeSpanHandler}
          required
        ></input>

        <label htmlFor="imgUrl">Image Url: (optional)</label>
        <input
          type="text"
          placeholder="Enter image url"
          onChange={imgUrlHandler}
        ></input>

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          placeholder="Enter breed description"
          onChange={descriptionHandler}
          required
        ></input>

        <label>Select temperament Traits:</label>
        <div className={styles.tags_container}>
          {allTemperaments.map((tag) => {
            return (
              <Tag
                key={tag}
                tag={tag}
                onClick={temperamentsHandler}
                selected={temperaments.includes(tag)}
              />
            );
          })}
        </div>

        <div className="buttons-container">
          <button disabled={!valid} type="button" onClick={createHandler}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBreed;
