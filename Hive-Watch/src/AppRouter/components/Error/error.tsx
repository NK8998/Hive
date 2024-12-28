import "./error.css";

interface errorProps {
  error: string;
}
export default function ErrorComponent({ error }: errorProps) {
  return (
    <div className='error-txt'>
      <div className='error-inner'>
        <h1>Error!</h1>
        <p>An error occured when matching routes</p>
      </div>
    </div>
  );
}
