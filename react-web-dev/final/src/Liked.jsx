import "./Liked.css";

const Liked = ({ likedPosts, onRemoveLikedPost }) => {
  const clickHandler = (id) => {
    onRemoveLikedPost(id);
  };

  return (
    <div>
    <h2 className="little-header" >My Liked Recipes</h2>
    <div className="liked">
      
      {Object.values(likedPosts).length > 0?  (
        Object.values(likedPosts).map((c, index) => (
          <div className="card" key={index}>
            <div className="recipe">
              <h3 className="dishname">{c.dishname}</h3>
              <div className="dish-ingredient">
                <h4>Ingredients: </h4>
                {c.ingredients}
              </div>
              <div className="dish-method">
                <h4> Method:</h4>
                {c.content}
              </div>
            </div>
            <div className="recipe-footer">
              <button className="save-btn" onClick={() => clickHandler(c.id)}>
                Unlike
              </button>
              <span className="creator">{c.username}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="no-content">No Recipes Liked</div>
      )}
    </div>
    </div>
  );
};

export default Liked;
