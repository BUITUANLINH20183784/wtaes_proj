import React from 'react'
import styles from './CardList.module.css'

export default () => {
  return (
    <div className={styles.list}>
      <Card />
    </div>
  )
}

const Card = () => (
  <div className={styles.cardContainer}>
    <Title />
    <CommunityList />
  </div>
)

const Title = () => (
  <div className={styles.title}>
    <h2 className={styles.titleText}>Trending Communities</h2>
  </div>
)

const CommunityList = () => (
  <div className={styles.communityListContainer}>
    <Community />
  </div>
)

const Community = () => (
  <div className={styles.commmunityContainer}>
    <CommunityIcon />
    <CommunityInfor />
    <JoinButton />
  </div>
)

const CommunityIcon = () => {
  return (
    <div className={styles.communityIconContainer}>
      <img className={styles.communityIcon} src="https://styles.redditmedia.com/t5_2qoeg/styles/communityIcon_gkoq20osipi31.png"></img>
    </div>
  )
}

const CommunityInfor = () => {
  return (
    <div className={styles.communityInforContainer}>
      <a title="r/flyfishing" href="/r/flyfishing/">r/flyfishing</a>
      <div><p>108,857 members</p></div>
    </div>
  )
}

const JoinButton = () => {
  return (
    <div className={styles.joinButtonContainer}>
      <button className={styles.joinButton}>Join</button>
    </div>
  )
}

