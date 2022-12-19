
import './App.css';

const App = () => {
  return (
    <div className="App">
      <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse">
        <div className="list-group list-group-flush">
          <a href="#" className="list-group-item textbg_color" >
            <i className="textbg_color"></i><span> Dashboard</span>
          </a>
        </div>
      </nav>
      <div class="container box-shadow">
        <div class="row">
          <div class="col">
            graph
          </div>
          <div class="col">
            new registration
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col">
            total No OF ppl
          </div>
          <div class="col">
            Locations
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
