
const validator = require('validator');

const normalization = (obj) => {
    const {description, title, images} = obj;
    let newObj = {...obj};
    newObj.description = description.trim() ? description.trim() : null;
    newObj.title = title.trim() ? title.trim() : null;
    newObj.images = [];
    if(Array.isArray(images)){
        images.forEach(img => {
            validator.isURL(img) ? newObj.images.push(img) : null;
        });
    }else {
        const imgArr = images.split(',');
        if(imgArr.length >= 1) {
            imgArr.forEach(img => {
                validator.isURL(img) ? newObj.images.push(img) : null;
            });
        }
    }
    return newObj;
};

module.exports = {normalization};