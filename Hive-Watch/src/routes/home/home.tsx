import Link from "../../AppRouter/components/Link";

export default function Home() {
  return (
    <div className='home-page browser'>
      <h1>Home Page</h1>
      <Link to={"/watch"}>Watch page</Link>
      <Link to='/history'>history</Link>
    </div>
  );
}
