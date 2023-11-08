export default function MenuButton({ buttonText, onClick }) {
  return (
    <div className={buttonText.toLowerCase()}>
      <button className="button" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}
