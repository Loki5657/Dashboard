
import './App.css';
import Dashboard from './components/shared/sidebar';

const App = () => {

  return (
    <div className="App">
      {/* <Dashboard /> */}
      <div className="container box-shadow">
        <div className="row">
          <div className="col">
            {/* <canvas id="lineChart">graph</canvas> */}
            graph
          </div>
          <div className="col">
            new registration
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            total No OF ppl
          </div>
          <div className="col">
            Locations
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
