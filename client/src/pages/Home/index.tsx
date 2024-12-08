import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home = () => {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <div>
      <p>Welcome, {username}!</p>
    </div>
  );
};

export default Home;
