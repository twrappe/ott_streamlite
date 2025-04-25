import { useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      login(res.data);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} className="input" />
      <input name="email" placeholder="Email" onChange={handleChange} className="input" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
      <button type="submit" className="btn">Register</button>
    </form>
  );
}
