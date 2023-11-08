export default function StartUp({ handleStartUp }) {
  return (
    <div className="startup">
      <button className="button" onClick={handleStartUp}>
        Start Game
      </button>
    </div>
  );
}
