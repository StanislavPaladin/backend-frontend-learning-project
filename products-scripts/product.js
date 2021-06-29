import mongoose from 'mongoose';

const Product = new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    link: {type: String},
    icon: {type: String},
    paragraph1:{type: String},
    paragraph2:{type: String},
    paragraph3:{type: String},
    pSubtitle1:{type: String},
    pSubtitle2:{type: String},
    pSubtitle3:{type: String},
    picture1:{type: String},
    picture2:{type: String},
    picture3:{type: String},
    /*  насколько я понял - для некоторых продуктов предусмотрена загрузка нескольких изображений, а так-же текстовых абзацев*/
})

export default mongoose.model("Product", Product)