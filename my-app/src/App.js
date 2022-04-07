import './App.css';
import AppIndex from './pages/AppIndex.js';
import GameContainer from './containers/GameContainer.js';
import AppInfo from './pages/AppInfo.js';
import { Routes, Route } from "react-router-dom";
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';


const store = configureStore();

function App() {
  return (
    <Provider store={store}>
        <div className="app">
          <Routes>
            <Route path="/" element={<AppIndex />} />
            <Route path="/info" element={<AppInfo />} />
            <Route path="/game/:type" element={<GameContainer />} />
          </Routes>
        </div>
    </Provider>
  );
}

export default App;
