import "./MyPosts.css";

const MyPosts = ({ userPosts, onRemoveUserPost }) => {
  const clickHandler = (id) => {
    onRemoveUserPost(id);
  };
  return (
    <div>
    <h2 className="little-header">My Posts</h2>
    <div className="my-posts">
      
      {Object.values(userPosts).length > 0 ? (
        Object.values(userPosts).map((c, index) => (
          <div className="card" key={index}>
             <div className="recipe">
                
                <h3 className="dishname">{c.dishname}</h3>
                <div className="dish-ingredient"><h4>Ingredients: </h4>{c.ingredients}</div>
                <div className="dish-method">
                <h4> Method:</h4>{c.content}
                  </div>
             
            </div>
            <div className="recipe-footer">
              <button className="save-btn" onClick={() => clickHandler(c.id)}>
                Delete
              </button>
              <span className="creator">{c.username}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="no-content">No Recipes Created</div>
      )}
    </div>
    </div>
  );
};

export default MyPosts;
