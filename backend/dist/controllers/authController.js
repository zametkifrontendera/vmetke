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
    const { email, password } = req.body;
    const { user, token } = await authService.login({ email, password });
    res.json({ user, token });
};
export default { register, login };
