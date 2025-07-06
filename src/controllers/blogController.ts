import { Response } from 'express';
import { BlogService } from '../services/blogService';
import { AuthRequest } from '../middleware/authMiddleware';

const blogService = new BlogService();

export const getAll = async (req: AuthRequest, res: Response): Promise<void> => {
  const blogs = await blogService.getAll();
  res.json(blogs);
};

export const getById = async (req: AuthRequest, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const blog = await blogService.getById(id);
  if (!blog) {
    res.status(404).json({ message: 'Blog not found' });
    return;
  }
  res.json(blog);
};

export const create = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, content } = req.body;
  const user = req.user!;
  
  if (user.role !== 'admin') {
    res.status(403).json({ message: 'Only admins can create blogs' });
    return;
  }

  const blog = await blogService.create({
    title,
    content,
    userId: user.id,
  });

  res.status(201).json(blog);
};

export const update = async (req: AuthRequest, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const user = req.user!;

  if (user.role !== 'admin') {
    res.status(403).json({ message: 'Only admins can update blogs' });
    return;
  }

  const updated = await blogService.update(id, { title, content });
  if (!updated) {
    res.status(404).json({ message: 'Blog not found' });
    return;
  }

  res.json(updated);
};

export const deleteblog = async (req: AuthRequest, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const user = req.user!;

  if (user.role !== 'admin') {
    res.status(403).json({ message: 'Only admins can delete blogs' });
    return;
  }

  const deleted = await blogService.delete(id);
  if (!deleted) {
    res.status(404).json({ message: 'Blog not found' });
    return;
  }

  res.json({ message: 'Blog deleted successfully' });
};
