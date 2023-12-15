export const LOGIN_STATUS = {
  PENDING: "pending",
  NOT_LOGGED_IN: "notLoggedIn",
  IS_LOGGED_IN: "loggedIn",
};

export const SERVER = {
  AUTH_MISSING: "auth-missing",
  AUTH_INSUFFICIENT: "auth-insufficient",
  REQUIRED_USERNAME: "required-username",
  REQUIRED_POSTS: "required-posts",
};

export const CLIENT = {
  NETWORK_ERROR: "networkError",
  NO_SESSION: "noSession",
  UNKNOWN_ACTION: "unknownAction",
};

export const PAGES = {
  HOME: "home",
  POST: "post",
  LIKED: "liked",
  PRIVACY: "privacy",
  USER_POSTS: "user-posts",
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]:
    "Trouble connecting to the network.  Please try again",
  [SERVER.AUTH_INSUFFICIENT]:
  'Sorry, DOGs are forbidden!',
  [SERVER.REQUIRED_USERNAME]:
  "Please make sure the username is not empty and only include letters and numbers.",
  [SERVER.REQUIRED_POSTS]: "Please enter the posts to add",
  default: "Something went wrong.  Please try again",
};

export const ACTIONS = {
  ADMIN_LOGIN: "adminLogin",
  LOG_IN: "logIn",
  LOG_OUT: "logOut",
  REPORT_ERROR: "reportError",
  POSTS_PENDING: "postsPending",
  ADD_POSTS: "addPosts",
  REPLACE_POSTS: "replacePosts",
  ADD_LIKED_POSTS: "addLikedPosts",
  GET_LIKED_POSTS: "getLikedPosts",
  GET_USER_POSTS: "getUserPosts",
  REMOVE_LIKED_POST: "deleteLikedPost",
  REMOVE_USER_POST: "removeUserPost",
  PAGE: "page",
  TOGGLE_MODE: "toggleMode",
};
