import Product from "./product.js"
import ProductService from "./productService.js"
import sharp from "sharp"


class ProductController {
    async create(req, res) {
        try {
            console.log(req.files);
            const post = await ProductService.create(req.body, req.files.picture, req.files.headerImage) //создание поста на основе schema, с использованием полученных в запросе данных
            res.json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await ProductService.getAll();
            return res.json(posts)
            
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getLastPost (req, res) {
        try {
            const posts = await ProductService.getlastPost();
            return res.json(posts)
            
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getSomePosts (req, res) {
        try {
            const posts = await ProductService.getSomePosts();
            return res.json(posts)
            
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getOne(req, res) {
        try {
            const post = await ProductService.getOne(req.params.id)
            return res.json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await ProductService.update(req.body)
            return res.json(updatedPost)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const post = await ProductService.delete(req.params.id)
            return res.json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new ProductController();