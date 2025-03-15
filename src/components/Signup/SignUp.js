import axios from 'axios';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            try {
                await axios.post('http://localhost:4000/users', {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    role: 'employee'
                });
                history.push('/login');
            } catch (error) {
                console.error('Error signing up:', error);
            }
        }
    });

    const handleSignUp = formik.handleSubmit;

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <label>
                    Name:
                    <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} required />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;