import { Provider } from 'react-redux';
import { store } from './store/store';
import SkipSelection from './components/SkipSelection';

function App() {
  return (
    <Provider store={store}>
      <SkipSelection />
    </Provider>
  );
}

export default App;