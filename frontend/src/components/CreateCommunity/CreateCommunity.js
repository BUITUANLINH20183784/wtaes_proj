import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { GlobalContext } from "../../context/GlobalState";
import styles from "./CreateCommunity.module.css";

export default () => {
  const { current_user, addCommunity } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeDesc = (e) => {
    setDesc(e.target.value);
  };
  const onSubmit = () => {
    addCommunity({
      name,
      desc,
    });
  };

  const CreateRegion = ({ data }) => {
    const { name, desc, onChangeName, onChangeDesc, onSubmit } = data;
    const CreateSectionHeader = ({ title, desc }) => (
      <div className={styles.createSectionHeader}>
        <h3 className={styles.createSectionTitle}>{title}</h3>
        <p className={styles.createSectionDesc}>{desc}</p>
      </div>
    );

    const CreateName = ({ name, onChangeName }) => (
      <div className={styles.createSection}>
        <CreateSectionHeader
          title="Name"
          desc="Community names including capitalization cannot be changed."
        />
        <div className={styles.createInputContainer}>
          <input
            key={1}
            type="text"
            className={styles.communityNameInput}
            value={name}
            onChange={onChangeName}
          ></input>
        </div>
      </div>
    );

    const CreateDesc = ({ desc, onChangeDesc }) => (
      <div className={styles.createSection}>
        <CreateSectionHeader
          title="Description"
          desc="This is how new members come to understand your community."
        />
        <div className={styles.createInputContainer}>
          <textarea
            key={2}
            maxLength="500"
            rows="2"
            className={styles.communityDescInput}
            value={desc}
            onChange={onChangeDesc}
          ></textarea>
        </div>
      </div>
    );

    const SubmitRegion = ({ onSubmit }) => (
      <div className={styles.submitRegion}>
        <button className={styles.themeButton} onClick={onSubmit}>
          Create Community
        </button>
      </div>
    );

    return (
      <div className={styles.createRegionContainer}>
        <div>
          <h1 className={styles.createHeader}>Create a community</h1>
          <CreateName name={name} onChangeName={onChangeName}/>
          <CreateDesc desc={desc} onChangeDesc={onChangeDesc}/>
          <SubmitRegion onSubmit={onSubmit}/>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.mainContainer}>
      {current_user.isAuthenticated ? null : <Redirect to="/login" />}
      <div className={styles.subContainer}>
        <div className={styles.art}></div>
        <CreateRegion data={{ name, desc, onChangeName, onChangeDesc, onSubmit }}/>
      </div>
    </div>
  );
};
