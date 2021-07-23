import Product from "./product.js"
import fileService from "./fileService.js";
import sharp from "sharp";
import  { transliterate, slugify } from "transliteration";



class ProductService {
    async create(post, picture, headerImage) {
        let titleTranslit = slugify(post.title, {
            separator: '_',
            unknown: '-'
          })
        const filename = fileService.saveFile(picture)
        const headerImg = fileService.saveFile(headerImage)
        const createdPost = await Product.create({
            ...post,
            alias: titleTranslit,
            createdAt: new Date(),
            picture: filename,
            headerImage: headerImg,

        })
        console.log('пост создан');
        return createdPost;
    }

    async getAll() {
        const posts = await Product.find();
        return posts
    }

    async getSomePosts() {
        const posts = await Product.find().sort({createdAt:-1}).limit(3)
        return posts
    }

    async getlastPost() {
        const posts = await Product.find().sort({createdAt:-1}).limit(1)
        return posts
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const product = await Product.findOne(id)
        return post;
    }

    async update(post) {
        if (!post._id) {
            throw new Error('не указан ID')
        }
         let titleTranslit = slugify(post.title, {
            separator: '_',
            unknown: '-'
          })
          console.log(post);
        const updatedPost = await Product.findByIdAndUpdate(post._id, post, {
            alias: titleTranslit,
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