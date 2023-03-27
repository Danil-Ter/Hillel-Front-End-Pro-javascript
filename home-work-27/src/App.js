import Header from "./componets/Header";
import Content from "./componets/Content";
import Footer from "./componets/Footer";
import Navigation from "./componets/Navigation"; 


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Navigation />
        <Content />
      </main>
      <Footer />
    </div>
  );
}

export default App;
