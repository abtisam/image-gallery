
export class helper {
    static getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    //return a promise that resolves with a File instance
    static async urltoFile(url, filename) {
        return (fetch(url)
            .then(
                function (res) {
                    return res.arrayBuffer();
                })
            .then(
                function (buf) {
                    return new File([buf], filename);
                })
        );
    }
}
export default helper;

