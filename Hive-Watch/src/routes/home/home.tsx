import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='route-inner'>
      <h1>This is the home page😍</h1>
      <Link to={"/history"}>History</Link>
      <Link to={"/watch?v=IxYUIN85K"}>AceVideo</Link>
    </div>
  );
}
