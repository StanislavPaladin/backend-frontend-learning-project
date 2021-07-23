import * as uuid from 'uuid';
import * as path from 'path';
import sharp from 'sharp'


class FileService {
    saveFile(file) {
        try {
            const filename = uuid.v4() + '.jpg';
            const filepath = path.resolve('static', filename);
            file[0].mv(filepath);
            return filename;
        } catch (e) {
            console.log('ERROR', e);
        }

    }
}
export default new FileService();