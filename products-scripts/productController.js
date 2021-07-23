import Product from "./product.js"
import ProductService from "./productService.js"
import sharp from "sharp"
import * as uuid from 'uuid';
import * as path from 'path';



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

    async getLastPost(req, res) {
        try {
            const posts = await ProductService.getlastPost();
            return res.json(posts)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getSomePosts(req, res) {
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

        if (!req.files) {
            const {
                icon,
                content,
                description,
                title,
                _id,
            } = req.body;
            try {
                const newProduct = {
                    title: title,
                    description: description,
                    content: content,
                    _id: _id,
                }
                if (icon !== undefined) {
                    newProduct.icon = icon
                }
                const updatedPost = await ProductService.update(newProduct)
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
                icon,
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
                        const newProduct = {
                            title: title,
                            description: description,
                            content: content,
                            _id: _id,

                        }
                        if (icon !== undefined) {
                            newProduct.icon = icon
                        }
                        if (filename !== undefined) {
                            newProduct.picture = filename
                        }
                        if (headerImg !== undefined) {
                            newProduct.headerImage = headerImg
                        }
                        const updatedPost = await ProductService.update(newProduct)
                       
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
                        const newProduct = {
                            title: title,
                            description: description,
                            content: content,
                            _id: _id,

                        }
                        if (icon !== undefined) {
                            newProduct.icon = icon
                        }
                        sharp(req.files.headerImage[0].data)
                            .resize({
                                width: 1800,
                                height: 600 //настройка sharp. пока поставил просто рандомные значения для теста функционала
                            })
                            .toFile(headerImgPath)
                            .then(async data => {
                                const newProduct = {
                                    title: title,
                                    description: description,
                                    content: content,
                                    _id: _id,

                                }
                                if (icon !== undefined) {
                                    newProduct.icon = icon
                                }
                                if (headerImg !== undefined) {
                                    newProduct.headerImage = headerImg
                                }
                                const updatedPost = await ProductService.update(newProduct)
                                // 
                            }).catch(err => {
                                console.log("err: ", err);
                            });
                        if (headerImg !== undefined) {
                            newProduct.headerImage = headerImg
                        }
                        const updatedPost = await ProductService.update(newProduct)
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
                        const newProduct = {
                            title: title,
                            description: description,
                            content: content,
                            _id: _id,

                        }
                        if (icon !== undefined) {
                            newProduct.icon = icon
                        }
                        if (filename !== undefined) {
                            newProduct.picture = filename
                        }
                        const updatedPost = await ProductService.update(newProduct)
                    }).catch(err => {
                        console.log("err: ", err);
                    });
            }
            return res.status(200).json({
                message: 'Успешно изменено'
            })
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