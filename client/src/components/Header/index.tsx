import { Link } from "react-router";

const Header = () => {
  return (
    <header>
      <div className="menu-list">
        <Link to="/">Home</Link>
        <Link to="/pomodoro">Pomodoro</Link>
        <Link to="/university-connect">University Connect</Link>
      </div>
    </header>
  );
};

export default Header;
