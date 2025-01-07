import Link from "../../AppRouter/components/Link";
import { HvdLogo } from "../../assets/icons";
import GuideBtn from "../guide/components/guide_btn";
import "./masthead.css";

export default function Masthead() {
  return (
    <div className='masthead'>
      <GuideBtn />
      <Link to='/'>
        <HvdLogo />
      </Link>
    </div>
  );
}
