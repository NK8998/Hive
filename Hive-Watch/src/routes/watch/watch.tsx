import { Link } from "react-router-dom";

export default function Watch() {
  return (
    <div className='route-inner'>
      <h1>Watch page😁</h1>
      <Link to={"/webdev"}>WedDevSimplified</Link>
      <Link to={"/"}>Home</Link>
    </div>
  );
}
