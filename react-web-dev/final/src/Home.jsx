import "./Home.css";
import Pagination from "./Pagination";

const Home = ({
  allPosts,
  likedPosts,
  onLikedPost,
  currentPage,
  nextPage,
  lastPage,
  onPageChange
}) => {
  const clickHandler = (paletteId) => {
    onLikedPost(paletteId);
  };

  const comparePosts = (allPosts, likedPosts) => {
    for (let post of Object.values(allPosts)) {
      for (let likedPost of Object.values(likedPosts)) {
        if (post.id === likedPost.id) {
          post.liked = true;
        }
      }
    }
    return allPosts;
  };

  comparePosts(allPosts, likedPosts);

  return (
    <>
      <div className="home">
        {Object.values(allPosts).length > 0 ? (
          Object.values(allPosts).map((c, index) => (
            <div className="card" key={index}>
              <div className="recipe">
                  <h3 className="dishname">{c.dishname}</h3>
                  <div className="dish-ingredient"><h4>Ingredients: </h4>{c.ingredients}</div>
                  <div className="dish-method">
                  <h4> Method:</h4>{c.content}
              </div>        
            </div>
              <div className="recipe-footer">
                <button
                  className="save-btn"
                  onClick={() => clickHandler(c.id)}
                  disabled={c.liked}
                >
                  {c.liked === true ? "Liked" : "Like"}
                </button>
                <span className="creator">{c.username}</span>
              </div>
            </div>
          ))
        ) : (
          <div>No Recipes</div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        nextPage={nextPage}
        lastPage={lastPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default Home;
