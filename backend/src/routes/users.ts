import express, { Request, Response, Router } from 'express';
import User, { IUser } from '../models/User';

const router = Router(); // ✅ This ensures TypeScript knows it's a Router

// ✅ Get user profile by Clerk ID
router.get('/:clerkId', async (req: Request<{ clerkId: string }>, res: Response) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Update user profile
router.put('/:clerkId', async (req: Request<{ clerkId: string }, {}, Partial<IUser>>, res: Response) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: req.params.clerkId },
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Create a new user (if not exists)
router.post('/', async (req: Request<{}, {}, IUser>, res: Response) => {
  try {
    const { clerkId, name, email } = req.body;
    const existingUser = await User.findOne({ clerkId });

    if (existingUser) return res.json(existingUser);

    const newUser = new User({ clerkId, name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
