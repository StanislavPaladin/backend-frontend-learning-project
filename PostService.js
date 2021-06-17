import Post from "./post.js"

class PostService {
    async create(post, picture) {
        const createdPost = await Post.create(post) //создание поста на основе schema, с использованием полученных в запросе данных
        return createdPost;
    }

    async getAll() {
        const posts = await Post.find();
        return posts
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await Post.findById(id)
        return post;
    }

    async update(post) {
        if (!post._id) {
            throw new Error('не указан ID')
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
            new: true
        })
        return updatedPost;
    }

    async delete(id) {
        if (!id) {
            throw new Error('id не указан')
        }
        const post = await Post.findByIdAndDelete(id)
        return post
    }
}
export default new PostService;