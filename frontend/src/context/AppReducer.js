export default (state, action) => {
	switch (action.type) {
		case "GET_POSTS":
			return {
				...state,
				posts: action.payload,
			}
		case "ADD_POST":
			return {
				...state,
				posts: [...state.posts, action.payload],
			}
		case "DELETE_POST":
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload),
			}
		case "POST_ERROR":
			return {
				...state,
				error: action.payload,
			}
		default:
			return state;
	}
}