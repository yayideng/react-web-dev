import { LOGIN_STATUS, CLIENT, ACTIONS, MESSAGES } from "./constants";

export const initialState = {
  error: "",
  username: "",
  darkTheme: false,
  loginStatus: LOGIN_STATUS.PENDING,
  isPostsPending: false,
  posts: {},
  likedPosts: {},
  userPosts: {},
  currentPage: 1,
  nextPage: 1,
  lastPage: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        error: "",
        username: action.username,
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: "",
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        username: "",
      };

    case ACTIONS.TOGGLE_MODE:
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    
    case ACTIONS.POSTS_PENDING:
      return{
        ...state,
        isPostsPending: true,
      }

    case ACTIONS.REPLACE_POSTS:
      return {
        ...state,
        isPostsPending: false,
        posts: action.recipes,
      };

    case ACTIONS.GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.userPosts,
      };

    case ACTIONS.PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
        nextPage: action.next,
        lastPage: action.lastPage,
      };

    case ACTIONS.ADD_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.returnedContent.id]: action.returnedContent,
        },
      };

    case ACTIONS.ADD_LIKED_POSTS:
      return {
        ...state,
        likedPosts: action.returnedContent,
      };

    case ACTIONS.GET_LIKED_POSTS:
      return {
        ...state,
        likedPosts: action.likedPosts,
      };

    case ACTIONS.REMOVE_LIKED_POST:
      const savedPostsCopy = { ...state.likedPosts };
      delete savedPostsCopy[action.removedPostId];
      return {
        ...state,
        likedPosts: savedPostsCopy,
      };

    case ACTIONS.REMOVE_USER_POST:
      const userPostCopy = { ...state.userPosts };
      delete userPostCopy[action.re];
      return {
        ...state,
        userPosts: userPostCopy,
      };

    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: MESSAGES[action.error] || "ERROR",
      };

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action });
  }
}

export default reducer;
