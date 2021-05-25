import React from 'react'
import styles from './CreateCommunity.module.css'

export default () => {
  const CreateRegion = () => {
    const CreateSectionHeader = ({ title, desc }) => (
      <div className={styles.createSectionHeader}>
        <h3 className={styles.createSectionTitle}>{title}</h3>
        <p className={styles.createSectionDesc}>{desc}</p>
      </div>
    )

    const CreateName = () => (
      <div className={styles.createSection}>
        <CreateSectionHeader title="Name" desc="Community names including capitalization cannot be changed."/>
        <div className={styles.createInputContainer}>
          <input type="text" className={styles.communityNameInput}></input>
        </div>
      </div>
    )

    const CreateDesc = () => (
      <div className={styles.createSection}>
        <CreateSectionHeader title="Description" desc="This is how new members come to understand your community."/>
        <div className={styles.createInputContainer}>
          <textarea maxlength="500" rows="2" className={styles.communityDescInput}></textarea>
        </div>
      </div>
    )

    const SubmitRegion = () => (
      <div className={styles.submitRegion}>
        <button className={styles.themeButton}>Create Community</button>
      </div>
    )

    return (
      <div className={styles.createRegionContainer}>
          <div>
            <h1 className={styles.createHeader}>Create a community</h1>
            <CreateName />
            <CreateDesc />
            <SubmitRegion />
          </div>
      </div>
    )
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.art}></div>
        <CreateRegion />
      </div>
    </div>
  )
}
