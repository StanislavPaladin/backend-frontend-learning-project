import Post from "./post.js"
import PostService from "./PostService.js"
import sharp from "sharp"
import * as uuid from 'uuid';
import * as path from 'path';

class PostController {
    async create(req, res) {
        
        const filename = uuid.v4() + '.jpg';
        const headerImage = uuid.v4() + '.jpg';
        const filepath = path.resolve('static', filename);
        const headerImgPath = path.resolve('static', headerImage);
        try {
            sharp(req.files.picture.data)
                .resize({
                    width: 900,    
                    height: 900  //настройка sharp. пока поставил просто рандомные значения для теста функционала
                })
                .toFile(filepath)
                
                sharp(req.files.headerImage.data)
                .resize({
                    width: 1800,    
                    height: 600  //настройка sharp. пока поставил просто рандомные значения для теста функционала
                })
                .toFile(headerImgPath)
                .then(async data => {
                    
                    console.log("data: ", data);
                    const post = await PostService.create(req.body, filename, headerImage) //создание поста на основе schema, с использованием полученных в запросе данных
                    res.json(post)
                }).catch(err => {
                    console.log("err: ", err);
                });
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await PostService.getAll();
            return res.json(posts)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getLastPost(req, res) {
        try {
            const posts = await PostService.getlastPost();
            return res.json(posts)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getSomePosts(req, res) {
        try {
            const posts = await PostService.getSomePosts();
            return res.json(posts)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getOne(req, res) {
        try {
            const post = await PostService.getOne(req.params.id)
            return res.json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await PostService.update(req.body)
            return res.json(updatedPost)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id)
            return res.json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new PostController();