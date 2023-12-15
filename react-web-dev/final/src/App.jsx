import { useReducer, useEffect, useState } from "react";
import reducer, { initialState } from "./reducer";
import { LOGIN_STATUS, CLIENT, SERVER, ACTIONS } from "./constants";

import {
  fetchLogin,
  fetchSession,
  fetchLogout,
  fetchAddPosts,
  fetchPosts,
  fetchAddLikedPosts,
  fetchRemoveLikedPosts,
  fetchRemoveUserPost,
} from "./services";

import Login from "./Login";
import Navbar from "./Navbar";
import Post from "./Post";
import Home from "./Home";
import Liked from "./Liked";
import MyPosts from "./MyPosts";
import Privacy from "./Privacy";
import Loader from "./Loader";
import Header from "./Header";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState("home");

  function onNavigate(e) {
    if (
      e.target.classList.value === "navbar-option" ||
      e.target.classList.value === "logo"
    ) {
      setPage(e.target.dataset.page);
    }
  }

  function checkForSession() {
    fetchSession()
      .then((session) => {
        const { username, likedPosts, userPosts } = session.userData;
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({ type: ACTIONS.POSTS_PENDING });
        dispatch({ type: ACTIONS.GET_LIKED_POSTS, likedPosts });
        dispatch({ type: ACTIONS.GET_USER_POSTS, userPosts });
        return fetchPosts();
      })
      .then((results) => {
        const { recipes, next, lastPage, currentPage } = results;
        dispatch({ type: ACTIONS.PAGE, next, currentPage, lastPage });
        dispatch({ type: ACTIONS.REPLACE_POSTS, recipes });
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      });
  }

  function onLogin(username) {
    fetchLogin(username)
      .then(() => {
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({ type: ACTIONS.POSTS_PENDING });
        return fetchPosts();
      })
      .then((results) => {
        const { recipes, next, lastPage, currentPage } = results;
        dispatch({ type: ACTIONS.PAGE, next, currentPage, lastPage });
        dispatch({ type: ACTIONS.REPLACE_POSTS, recipes });
        setPage("home");
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout().catch((err) => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
    });
    setPage("");
  }

  function onPostContent(postContent) {
    fetchAddPosts(postContent)
      .then((returnedContent) => {
        dispatch({ type: ACTIONS.ADD_POSTS, returnedContent });
        setPage("home");
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onLikedPost(id) {
    fetchAddLikedPosts(id)
      .then((returnedContent) => {
        dispatch({ type: ACTIONS.ADD_LIKED_POSTS, returnedContent });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onRemoveLikedPost(id) {
    fetchRemoveLikedPosts(id)
      .then((removedPostId) => {
        dispatch({ type: ACTIONS.REMOVE_LIKED_POST, removedPostId });
        checkForSession();
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onRemoveUserPost(id) {
    fetchRemoveUserPost(id)
      .then((removedPostId) => {
        dispatch({ type: ACTIONS.REMOVE_USER_POST, removedPostId });
        checkForSession();
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  const onChangeMode = () => {
    dispatch({ type: ACTIONS.TOGGLE_MODE });
  };

  const onPageChange = (e) => {
    if (e.target.classList.contains("pages")) {
      const current = e.target.dataset.page;

      fetchPosts(current)
        .then((results) => {
          const { recipes, next, currentPage, lastPage } = results;

          dispatch({ type: ACTIONS.PAGE, currentPage, next, lastPage });
          dispatch({ type: ACTIONS.REPLACE_POSTS, recipes });
        })
        .catch((err) => {
          if (err?.error === SERVER.AUTH_MISSING) {
            dispatch({ type: ACTIONS.LOG_OUT });
            return Promise.reject({ error: CLIENT.NO_SESSION });
          }
          return Promise.reject(err);
        });
    }
    if (e.target.dataset.move === "left") {
      const newPage = state.currentPage - 1;
      if (!newPage < 1) {
        fetchPosts(newPage)
          .then((results) => {
            const { recipes, next, currentPage, lastPage } = results;

            dispatch({ type: ACTIONS.PAGE, currentPage, next, lastPage });
            dispatch({ type: ACTIONS.REPLACE_POSTS, recipes });
          })
          .catch((err) => {
            if (err?.error === SERVER.AUTH_MISSING) {
              dispatch({ type: ACTIONS.LOG_OUT });
              return Promise.reject({ error: CLIENT.NO_SESSION });
            }
            return Promise.reject(err);
          });
      }
    }
    if (e.target.dataset.move === "right") {
      const newPage = state.currentPage + 1;
      if (newPage <= state.lastPage) {
        fetchPosts(newPage)
          .then((results) => {
            const { recipes, next, currentPage, lastPage } = results;

            dispatch({ type: ACTIONS.PAGE, currentPage, next, lastPage });
            dispatch({ type: ACTIONS.REPLACE_POSTS, recipes });
          })
          .catch((err) => {
            if (err?.error === SERVER.AUTH_MISSING) {
              dispatch({ type: ACTIONS.LOG_OUT });
              return Promise.reject({ error: CLIENT.NO_SESSION });
            }
            return Promise.reject(err);
          });
      }
    }
  };

  useEffect(() => {
    checkForSession();
  }, []);

  useEffect(() => {
    window.history.pushState({}, "", `/${page}`);
    checkForSession();
  }, [page]);

  return (
    <div className="app">
      {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
        <Login onLogin={onLogin} error={state.error} />
      )}
      {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <>
          <Header darkTheme = {state.darkTheme}/>
          <Navbar
            username={state.username}
            onChangeMode={onChangeMode}
            darkTheme={state.darkTheme}
            onNavigate={onNavigate}
            onLogout={onLogout}
          />
          <main className={`main-content ${state.darkTheme ? "dark" : ""}`}>
            {page === "home" && (
              <>
                {state.isPostsPending && <Loader />}
                <Home
                  allPosts={state.posts}
                  likedPosts={state.likedPosts}
                  onLikedPost={onLikedPost}
                  currentPage={state.currentPage}
                  lastPage={state.lastPage}
                  nextPage={state.nextPage}
                  onPageChange={onPageChange}
                />
              </>
            )}
            {page === "post" && (
              <Post onPostContent={onPostContent} />
            )}
            {page === "liked" && (
              <Liked
                likedPosts={state.likedPosts}
                onRemoveLikedPost={onRemoveLikedPost}
              />
            )}
            {page === "user-posts" && (
              <MyPosts
              userPosts={state.userPosts}
              onRemoveUserPost={onRemoveUserPost}
              />
            )}
            {page === "privacy" && <Privacy/>}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
