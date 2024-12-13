import { Link } from "react-router-dom";

export default function History() {
  return (
    <div className='route-inner'>
      <h1>History</h1>
      <Link to={"/@WedDevSimplified"}>to channel</Link>
    </div>
  );
}
