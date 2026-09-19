import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { openDb } from '../config/db';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;
    console.log(`[Register] Attempt to register user: ${email}`);

    if (!email || !password || !fullName) {
      console.warn(`[Register] Missing fields for ${email || 'unknown user'}`);
      return res
        .status(400)
        .json({ message: 'Please provide email, password, and full name.' });
    }

    const db = await openDb();

    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    if (existingUser) {
      console.warn(`[Register] Email already registered: ${email}`);
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.run(
      'INSERT INTO users (email, password, fullName) VALUES (?, ?, ?)',
      [email, hashedPassword, fullName],
    );

    res.status(201).json({ message: 'User registered successfully!' });
    console.log(`[Register] User ${email} registered successfully.`);
  } catch (error) {
    console.error(`[Register] Error registering ${email}:`, error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(`[Login] Attempt to login user: ${email}`);

    if (!email || !password) {
      console.warn(
        `[Login] Missing credentials for ${email || 'unknown user'}`,
      );
      return res
        .status(400)
        .json({ message: 'Please provide email and password.' });
    }

    const db = await openDb();
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      console.warn(`[Login] User not found: ${email}`);
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn(`[Login] Password mismatch for user: ${email}`);
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Set expiry to 8 hours (8 * 60 * 60 * 1000 ms)
    const expiresIn = '8h';
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn },
    );

    // Calculate expiry date for DB
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 8);

    // Save token to DB for revocation
    await db.run(
      'INSERT INTO tokens (userId, token, expiresAt) VALUES (?, ?, ?)',
      [user.id, token, expiresAt.toISOString()],
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });
    console.log(`[Login] User ${email} logged in successfully.`);
  } catch (error) {
    console.error(`[Login] Error logging in ${email}:`, error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.warn('[Logout] No token provided in headers');
      return res.status(400).json({ message: 'No token provided.' });
    }

    const db = await openDb();
    await db.run('DELETE FROM tokens WHERE token = ?', [token]);

    res.status(200).json({ message: 'Logged out successfully!' });
    console.log(
      `[Logout] Token ${token?.substring(0, 10)}... revoked successfully.`,
    );
  } catch (error) {
    console.error('[Logout] Error during logout:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
