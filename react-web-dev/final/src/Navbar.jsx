import "./Navbar.css";
import { PAGES } from "./constants";

const Navbar = ({ username, onChangeMode, darkTheme, onNavigate, onLogout }) => {
  return (
    <nav className="navbar" onClick={onNavigate}>
      <div className="sub-navbar">
        <ul className="navbar-options">
          <li className="navbar-option" data-page={PAGES.HOME}>
          Feed
          </li>
          <li className="navbar-option" data-page={PAGES.POST}>
            Post
          </li>
          <li className="navbar-option" data-page={PAGES.LIKED}>
            Liked
          </li>
          <li className="navbar-option" data-page={PAGES.USER_POSTS}>
            My Posts
          </li>
          <li className="navbar-option" data-page={PAGES.PRIVACY}>
            Privacy
          </li>
        </ul>
        <ul className="navbar-extra">
          <li className="navbar-user">Welcome, {username}</li>
          <li className="navbar-mode">
            <label>
              <input
                type="checkbox"
                onChange={onChangeMode}
                checked={darkTheme}
                className="mode-selector"
              />
              <span className="check"></span>
            </label>
          </li>
          <li className="navbar-btn">
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
