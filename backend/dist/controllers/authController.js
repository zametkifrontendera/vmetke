import authService from '../services/authService';
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const { user, token } = await authService.register({ name, email, password });
    res.json({ user, token });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await authService.login({ email, password });
    res.json({ user, token });
};
export default { register, login };
