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
		case "UPDATE_POST":
			return {
				...state,
				posts: [...state.posts.filter(post => post._id !== action.payload._id), action.payload],
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
			
		case "GET_COMMUNITIES":
			return {
				...state,
				communities: action.payload,
			}
		case "ADD_COMMUNITY":
			return {
				...state,
				communities: [...state.communities, action.payload],
			}
		case "UPDATE_COMMUNITY":
			return {
				...state,
				communities: [...state.communities.filter(community => community._id !== action.payload._id), action.payload],
			}
		case "COMMUNITY_ERROR":
			return {
				...state,
				error: action.payload,
			}
			
		case "GET_COMMENTS":
			return {
				...state,
				comments: action.payload,
			}
		case "ADD_COMMENT":
			return {
				...state,
				comments: [...state.comments, action.payload],
			}
		case "UPDATE_COMMENT":
			return {
				...state,
				comments: [...state.comments.filter(comment => comment._id !== action.payload._id), action.payload],
			}
		case "COMMENT_ERROR":
			return {
				...state,
				error: action.payload,
			}
			
		case "GET_USERS":
			return {
				...state,
				users: action.payload,
			}
		case "UPDATE_USER":
			return {
				...state,
				users: [...state.users.filter(user => user._id !== action.payload._id), action.payload],
			}
		case "USER_ERROR":
			return {
				...state,
				error: action.payload,
			}

		case "USER_UPDATED":
		case "USER_LOADED":
			return {
				...state,
				current_user: {
					...state.current_user,
					isAuthenticated: true,
					user: action.payload,
				}
			}
		case "LOGIN_SUCCESS":
		case "REGISTER_SUCCESS":
			localStorage.setItem("token", action.payload.token)
			return {
				...state,
				current_user: {
					...state.current_user,
					...action.payload,
					isAuthenticated: true,
				}
			}
		case "AUTH_ERROR":
		case "LOGIN_FAIL":
		case "LOGOUT_SUCCESS":
		case "REGISTER_FAIL":
			localStorage.removeItem("token")
			return {
				...state,
				current_user: {
					...state.current_user,
					isAuthenticated: null,
					user: null,
					token: null
				}
			}

		default:
			return state;
	}
}