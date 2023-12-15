import { useState } from "react";
import "./Post.css";

const Post = ({onPostContent}) => {
  const [posts, setPosts] = useState({
    dishname:"",
    ingredients:"",
    content:""
  });
  const [btnDisabled, setBtnDisabled] = useState(true);

  const changeHandler = (e) => {
    setBtnDisabled(false);
    setPosts( { ...posts, [e.target.name]: e.target.value });
  };

  const clickHandler = () => {
    onPostContent(posts);
  }
  return (
    <div className="post">
      <h2>Post your Recipe</h2>
      <div className="post-card">
        <label className="post_label">
        Dishname:
        <input
          type="text"
          name="dishname"
          className="post_input"
          value={posts.dishname}
          onChange={changeHandler}
        />
        </label>
        <label className="post_label">
          Ingredients:
        <input
          type="text"
          name="ingredients"
          className="post_input "
          value={posts.ingredients}
          onChange={changeHandler}
        />
        </label>
        <label className="post_label">
          Method:
        <input
          type="text"
          name="content"
          className="post_input"
          value={posts.content}
          onChange={changeHandler}
        />
        </label>
      </div>
      <div className="create-button-wrapper">
          <button className="create-btn" onClick={clickHandler} disabled={btnDisabled}>Create</button>
      </div>
    </div>
  );
};

export default Post;
