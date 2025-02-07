const { hashPassword, comparePasswords, generateJWT, findUserByUsername } = require('../integration/authIntegration');
const { Person } = require('../models');

async function register(req, res) {
    const { name, surname, pnr, email, username, password, role_id } = req.body;
    try {
        const existingUser = await findUserByUsername(username);
        if (existingUser) return res.status(400).json({ message: 'Username already taken' });

        const hashedPassword = await hashPassword(password);
        await Person.create({ name, surname, pnr, email, username, password: hashedPassword, role_id });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!user.password) return res.status(400).json({ message: 'Some fields are missing. Please create a password.' });

        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateJWT(user);
        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function setPassword(req, res) {
    const { username, newPassword } = req.body;
    try {
        const user = await findUserByUsername(username);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.password = await hashPassword(newPassword);
        await user.save();

        const token = generateJWT(user);
        res.json({ token, message: 'Password set successfully, you are now logged in' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { register, login, setPassword };
