import ItemsList from "./components/ItemsList";

export default function App() {
  const items = ["Math", "JS", "Testing", "Design"];

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>React Homework 1</h1>
      <p>This is a class component rendering an arbitrary list of items:</p>
      <ItemsList items={items} />
    </div>
  );
}
