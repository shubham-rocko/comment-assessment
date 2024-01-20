import './App.css';
import Home from './Pages/Home';
import ErrorBoundary from './error-boundary';

function App() {
  
  return (
    <ErrorBoundary>
      <div className='app-wrapper'>
        <Home />
      </div>
    </ErrorBoundary>
  )
}

export default App
