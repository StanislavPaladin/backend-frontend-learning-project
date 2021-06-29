import Product from "./product.js"
import fileService from "./fileService.js";
import sharp from "sharp";

class ProductService {
    async create(post, picture1, picture2, picture3) {
        const filename1 = fileService.saveFile(picture1)
        const filename2 = fileService.saveFile(picture2)
        const filename3 = fileService.saveFile(picture3)
        const createdPost = await Product.create({
            ...post,
            picture1: filename1,
            picture2: filename2,
            picture3: filename3,
        })
        console.log('пост создан');
        return createdPost;
    }

    async getAll() {
        const posts = await Product.find();
        return posts
    }

    async getSomePosts() {
        const posts = await Product.find().sort({date:-1}).limit(3)
        return posts
    }

    async getlastPost() {
        const posts = await Product.find().sort({date:-1}).limit(1)
        return posts
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await Product.findById(id)
        return post;
    }

    async update(post) {
        if (!post._id) {
            throw new Error('не указан ID')
        }
        const updatedPost = await Product.findByIdAndUpdate(post._id, post, {
            new: true
        })
        return updatedPost;
    }

    async delete(id) {
        if (!id) {
            throw new Error('id не указан')
        }
        const post = await Product.findByIdAndDelete(id)
        return post
    }
}
export default new ProductService;