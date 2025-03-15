import axios from 'axios';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const history = useHistory();
    const { login } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            const email = values.email;
            const password = values.password;
            try {
                const response = await axios.get(`http://localhost:4000/users?email=${email}&password=${password}`);
                if (response.data.length > 0) {
                    const user = response.data[0];
                    login(user);
                    if (user.role === 'admin') {
                        history.push('/');
                    } else {
                        history.push('/profiles');
                    }
                } else {
                    alert('Invalid email or password');
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        }
    });

    const handleLogin = formik.handleSubmit;

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} required />
                </label>
                <button type="submit">Login</button>
            </form>
            <button onClick={() => history.push('/signup')}>Sign Up</button>
        </div>
    );
};

export default Login;