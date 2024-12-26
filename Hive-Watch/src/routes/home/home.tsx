import Link from "../../AppRouter/components/Link";
import "./home.css";

export default function Home() {
  return (
    <div className='home-page browser'>
      <div className='filter-chip-bar'></div>

      <h1>Home Page</h1>
      <Link to={"/watch"}>Watch page</Link>
      <Link to='/history'>history</Link>
    </div>
  );
}
