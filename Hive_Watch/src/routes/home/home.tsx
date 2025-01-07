import Link from "../../AppRouter/components/Link";
import "./home.css";

export default function Home() {
  return (
    <>
      <div className='filter-chip-bar'></div>

      <h1>Home Page</h1>
      <Link to={"/watch?v=Od7PbjTYPJi"}>Watch page</Link>
      <Link to='/history'>history</Link>
      <Link to='/WebDevSimplified'>WebDev</Link>
    </>
  );
}
