const Header = ({darkTheme})=> {
    return (
        <div className={`header ${darkTheme ? "dark" : ""}`}>
           <h1> Foodie Community</h1>
        </div>
    )
}

export default Header;