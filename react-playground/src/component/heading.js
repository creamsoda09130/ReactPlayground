import './heading.css';

export default function Heading({ text = 'タイトル' }) {
  return (
    <h1 className="heading">{text}</h1>
  );
}
