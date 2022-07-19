import { Navigate } from 'react-router-dom';
import './App.css'
import { useAuth } from './auth'
import { OnlineUsers } from './socket-io/components';

function App() {
  const { isLoggedIn, logout, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div className="App">
      <div>
        I am {user.email}
      </div>
      <div>
        <OnlineUsers />
      </div>
      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  )
}

export default App
