// src/App.jsx
import UploadForm from './components/Admin/UploadForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import VideoList from './components/VideoList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/upload" element={<UploadForm />} />
      </Routes>
    </Router>
  );
}

export default App;
