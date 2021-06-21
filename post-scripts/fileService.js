import * as uuid from 'uuid';
import * as path from 'path';
import sharp from 'sharp'


class FileService {
    async saveFile(file) {
        try {
            const filename = uuid.v4() + '.png';
            const filepath = path.resolve('static', filename);
            await file.mv(filepath);
        } catch (e) {
            console.log('ERROR', e);
        }

    }
}
export default new FileService();