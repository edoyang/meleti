import { Link } from "react-router";

const UniversityConnect = () => {
  return (
    <div>
      <h1>University Connect</h1>
      <div className="list-university">
        <Link to="/university-connect/unsw">University of New South Wales</Link>
        <Link to="/university-connect/usyd">University of Sydney</Link>
        <Link to="/university-connect/uow">University of Wollongong</Link>
      </div>
    </div>
  );
};

export default UniversityConnect;
