import Link from "../../AppRouter/components/Link";

export default function Home() {
  return (
    <div className='home-page'>
      <h1>Home Page</h1>
      <Link to={"/watch"}>Watch page</Link>
    </div>
  );
}
