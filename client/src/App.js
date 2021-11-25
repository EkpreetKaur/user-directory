import logo from './logo.svg';
import { Provider } from 'react-redux';
import store from './redux/store';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainPage/>
      </Router>
     
    </Provider>
    
  );
}

export default App;
