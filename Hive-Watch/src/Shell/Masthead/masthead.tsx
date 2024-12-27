import { toggleGuideVisibility } from "../../store/app/slice";
import { useAppDispatch } from "../../store/hooks/hooks";

export default function Masthead() {
  const dispatch = useAppDispatch();
  return (
    <div className='masthead'>
      <button onClick={() => dispatch(toggleGuideVisibility(null))}>Click me</button>
    </div>
  );
}
