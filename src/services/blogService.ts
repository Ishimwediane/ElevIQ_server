import Blog from '../models/blog';
import User from '../models/user'; 

export class BlogService {
  async getAll(): Promise<Blog[]> {
    return await Blog.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });
  }

  async getById(id: number): Promise<Blog | null> {
    return await Blog.findByPk(id, {
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });
  }

  async create(data: { title: string; content: string; userId: number }): Promise<Blog> {
    return await Blog.create({
      title: data.title,
      content: data.content,
      userId: data.userId,
    });
  }

  async update(id: number, data: { title?: string; content?: string }): Promise<Blog | null> {
    const blog = await Blog.findByPk(id);
    if (!blog) return null;

    await blog.update(data);
    return blog;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await Blog.destroy({ where: { id } });
    return deleted > 0;
  }
}

