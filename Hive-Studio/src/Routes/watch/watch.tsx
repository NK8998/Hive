import Link from "../../AppRouter/components/Link";
import { useLocation } from "../../AppRouter/components/Provider";

export default function Watch() {
  const { search } = useLocation();

  return (
    <div className='watch-page'>
      <h1>Watch Page</h1>
      <p>{search}</p>
      <Link to={"/WebdevSimplified"}>Webdev</Link>
    </div>
  );
}
