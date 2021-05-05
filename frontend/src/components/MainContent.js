import React from 'react'
import PostList from './PostList'
import TopicList from './TopicList'

var style = {
	alignSelf: "center", 
	// backgroundColor: "grey", 
	margin: "20px 10%", 
	// boxShadow: "0 10px 10px rgba(0, 0, 0, 0.2)",
	// borderRadius: "12px",
	display: "flex"
}

export const MainContent = () => {
	return (
		<div style={style}>
			<div style={{flex: "3"}}>
				<PostList />
			</div>
			<div style={{flex: "1"}}>
				<TopicList />
			</div>
		</div>
	)
}
