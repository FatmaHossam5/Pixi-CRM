import React, { useContext, useState } from 'react'
import './Login.css'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/admin/AuthContext';

const schema = yup.object().shape({
  identifier: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'At least 6 characters').required('Password is required'),
});
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    
    setLoading(true);
    const success = await login(data.identifier, data.password);
    setLoading(false);
    if (success) {
      navigate('/contact');
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Sign in</h2>
        <p>Please Sign in with your account</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="email" placeholder="Email" className="login-input"   {...register('identifier')} />
          {errors.identifier && <p className="error-msg">{errors.identifier.message}</p>}
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
              className="login-input"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              👁️
            </span>
          </div>
          {errors.password && <p className="error-msg">{errors.password.message}</p>}

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#">Forgot your password?</a>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
             {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
