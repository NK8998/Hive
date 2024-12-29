import { useParams } from "../../AppRouter/components/Provider";
import Link from "../../AppRouter/components/Link";
import OutLet from "../../AppRouter/components/Outlet";
import "./channel.css";

export default function Channel() {
  const params = useParams();

  return (
    <>
      <Link to='/'>Home</Link>
      <h1>{params?.channelName}</h1>
      <h3>{params?.subRoute}</h3>
      <div className='route-handler'>
        <Link to={`/${params?.channelName}/featured`}>featured</Link>
        <Link to={`/${params?.channelName}/videos`}>videos</Link>
        <Link to={`/${params?.channelName}/videos/inner`}>videos inner</Link>
        <Link to={`/${params?.channelName}/videos/inner/someId`}>
          videos inner2
        </Link>
      </div>
      <div className='route-renderer'>
        <OutLet />
      </div>
    </>
  );
}
