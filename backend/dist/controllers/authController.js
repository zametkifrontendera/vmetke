import authService from '../services/authService.js';
// const register = async (req: Request, res: Response) => {
//   const { name, email, password } = req.body
//   const { user, token } = await authService.register({ name, email, password })
//   res.json({ user, token })
// }
const register = async (req, res) => {
    try {
        console.log('📩 Register request body:', req.body);
        const { name, email, password } = req.body;
        const { user, token } = await authService.register({ name, email, password });
        res.json({ user, token });
    }
    catch (err) {
        console.error('❌ Register error:', err);
        res.status(500).json({ error: err.message });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login({ email, password });
        res.json({ user, token });
    }
    catch (err) {
        const message = err?.message || 'Login failed';
        const isInvalidCreds = message.toLowerCase().includes('invalid');
        console.error('❌ Login error:', err);
        res.status(isInvalidCreds ? 401 : 500).json({ error: message });
    }
};
export default { register, login };
