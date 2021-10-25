import "./style.css";

type BackdropProps = {
  click: React.MouseEventHandler<HTMLDivElement>,
  show: boolean
}

const Backdrop = ({ click, show }: BackdropProps) => {
  if (!show) return <span></span>;

  return <div className="backdrop" onClick={click}></div>;
};

export default Backdrop;
