// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // Add loading state
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError('Please fill out all fields');
//       return;
//     }

//     setLoading(true); // Start loading spinner
//     setError(''); // Reset error state

//     try {
//       const response = await fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setError(errorData.message || 'Login failed');
//         setLoading(false);
//         return;
//       }

//       const data = await response.json(); // Assuming response contains user ID
//       console.log('Login successful:', data);

//       if (data.id) {
//         // Redirect to the profile page with the user ID
//         router.push(`/profile?id=${data.id}`);
//       } else {
//         setError('User ID missing in response.');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     } finally {
//       setLoading(false); // Stop loading spinner
//     }
//   };

//   return (
//     <div className="modern-bg d-flex justify-content-center align-items-center vh-100">
//       <div className="glass-card p-5">
//         <h2 className="text-center mb-4">Log In</h2>
//         {error && <div className="alert alert-danger text-center">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control modern-input"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               disabled={loading} // Disable input during loading
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control modern-input"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               disabled={loading} // Disable input during loading
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn modern-button w-100 mt-4"
//             disabled={loading} // Disable button during loading
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//         <p className="mt-4 text-center">
//           Don&apos;t have an account?{' '}
//           <a href="/auth/register" className="text-decoration-none">
//             Register
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill out all fields');
      return;
    }

    setLoading(true); // Start loading spinner
    setError(''); // Reset error state

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        setLoading(false);
        return;
      }

      // Parse the backend response
      const data = await response.json(); // { message, username, email, id }
      console.log('Login successful:', data);

      if (data.id) {
        // Redirect to the dynamic profile page with user ID
        router.push(`/profile/${data.id}`);
      } else {
        setError('User ID missing in response.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="modern-bg d-flex justify-content-center align-items-center vh-100">
      <div className="glass-card p-5">
        <h2 className="text-center mb-4">Log In</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control modern-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading} // Disable input during loading
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control modern-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading} // Disable input during loading
            />
          </div>
          <button
            type="submit"
            className="btn modern-button w-100 mt-4"
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don&apos;t have an account?{' '}
          <a href="/auth/register" className="text-decoration-none">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
