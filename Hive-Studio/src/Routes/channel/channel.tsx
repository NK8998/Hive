import { ReactNode } from "react";
import { useParams } from "../../AppRouter/components/Provider";
import { RouteProps } from "../../AppRouter/components/Route";
import Link from "../../AppRouter/components/Link";

interface ChannelProps {
  children?: { props: RouteProps };
}

export default function Channel({ children }: ChannelProps) {
  const params = useParams();

  return (
    <div className='channel-page'>
      <h1>{params?.channelName}</h1>
      <h3>{params?.subRoute}</h3>
      <div className='route-handler'>
        <Link to={`/${params?.channelName}/featured`}>featured</Link>
        <Link to={`/${params?.channelName}/videos`}>videos</Link>
      </div>
      <div className='route-renderer'>{children?.props.component}</div>
    </div>
  );
}
