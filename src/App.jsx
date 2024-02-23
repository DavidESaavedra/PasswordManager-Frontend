import Body from "./Body";
import Nav from "./Nav";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.page}>
      <Nav />
      <Body />
    </div>
  );
}

export default App;
