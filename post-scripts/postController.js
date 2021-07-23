import Post from "./post.js"
import PostService from "./PostService.js"
import sharp from "sharp"
import * as uuid from 'uuid';
import * as path from 'path';

class PostController {
    async create(req, res) {
        console.log(req.body);
        const filename = uuid.v4() + '.jpg';
        const headerImage = uuid.v4() + '.jpg';
        const filepath = path.resolve('static', filename);
        const headerImgPath = path.resolve('static', headerImage);
        if(req.files) {
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
        } else {
            try {
                const post = await PostService.create(req.body) //создание поста на основе schema, с использованием полученных в запросе данных
                res.json(post)
            }
            catch (e) {
                res.status(500).json(e.message)
            }
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

        if (!req.files) {
            const {
                content,
                description,
                title,
                _id,
            } = req.body;
            try {
                const newPost = {
                    title: title,
                    description: description,
                    content: content,
                    _id: _id,
                }
                const updatedPost = await PostService.update(newPost)
                return res.status(200).json({
                    message: 'Успешно изменено'
                })
            } catch (e) {
                res.status(400).json({
                    message: 'change failed'
                })
            }
        } 
        else if (req.files) {
            const filename = uuid.v4() + '.jpg';
            const headerImg = uuid.v4() + '.jpg';
            const filepath = path.resolve('static', filename);
            const headerImgPath = path.resolve('static', headerImg);

            const {
                content,
                description,
                title,
                _id,
                picture,
                headerImage,
            } = req.body;
            //есть нужно заменить и фоновую картинку, и основную картику
            if (req.files.picture && req.files.headerImage) {
                sharp(req.files.picture[0].data)
                    .resize({
                        width: 900,
                        height: 900 //настройка sharp. пока поставил просто рандомные значения для теста функционала
                    })
                    .toFile(filepath)

                sharp(req.files.headerImage[0].data)
                    .resize({
                        width: 1800,
                        height: 600 //настройка sharp. пока поставил просто рандомные значения для теста функционала
                    })
                    .toFile(headerImgPath)
                    .then(async data => {
                        const newPost = {
                            title: title,
                            description: description,
                            content: content,
                            _id: _id,

                        }
                        if (filename !== undefined) {
                            newPost.picture = filename
                        }
                        if (headerImg !== undefined) {
                            newPost.headerImage = headerImg
                        }
                        const updatedPost = await PostService.update(newPost)
                       
                    }).catch(err => {
                        console.log("err: ", err);
                    });
                //случай, когда нужно поменять только фоновое
            } else if (!req.files.picture && req.files.headerImage) {
                sharp(req.files.headerImage[0].data)
                    .resize({
                        width: 1800,
                        height: 600 //настройка sharp. пока поставил просто рандомные значения для теста функционала
                    })
                    .toFile(headerImgPath)
                    .then(async data => {
                        const newPost = {
                            title: title,
                            description: description,
                            content: content,
                            _id: _id,

                        }
                        sharp(req.files.headerImage[0].data)
                            .resize({
                                width: 1800,
                                height: 600 //настройка sharp. пока поставил просто рандомные значения для теста функционала
                            })
                            .toFile(headerImgPath)
                            .then(async data => {
                                const newPost = {
                                    title: title,
                                    description: description,
                                    content: content,
                                    _id: _id,

                                }
                                if (headerImg !== undefined) {
                                    newPost.headerImage = headerImg
                                }
                                const updatedPost = await PostService.update(newPost)
                                // 
                            }).catch(err => {
                                console.log("err: ", err);
                            });
                        if (headerImg !== undefined) {
                            newPost.headerImage = headerImg
                        }
                        const updatedPost = await PostService.update(newPost)
                        return res.status(200).json({
                            message: 'Успешно изменено'
                        })
                    }).catch(err => {
                        console.log("err: ", err);
                    });
                //замена только основного изображения
            } else if (!req.files.headerImage && req.files.picture) {
                sharp(req.files.picture[0].data)
                    .resize({
                        width: 900,
                        height: 900 //настройка sharp. пока поставил просто рандомные значения для теста функционала
                    })
                    .toFile(filepath)
                    .then(async data => {
                        const newPost = {
                            title: title,
                            description: description,
                            content: content,
                            _id: _id,

                        }
                        if (filename !== undefined) {
                            newPost.picture = filename
                        }
                        const updatedPost = await PostService.update(newPost)
                    }).catch(err => {
                        console.log("err: ", err);
                    });
            }
            return res.status(200).json({
                message: 'Успешно изменено'
            })
        }


        // try {
        //     const updatedPost = await PostService.update(req.body)
        //     return res.json(updatedPost)
        // } catch (e) {
        //     res.status(500).json(e.message)
        // }
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