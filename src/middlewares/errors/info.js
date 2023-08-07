export const generateProductInfo = (product) => {
    return `
        One or more properties were incomplete or not valid. 
        List of requiered properties: 
        * Title: needs to be a string, recived ${product.title}
        * Description: needs to be a string, recived ${product.description}
        * Code: needs to be a string, recived ${product.code}
        * Price: needs to be a string, recived ${product.price}
        * Stocl: needs to be a string, recived ${product.stock}
        * Category: needs to be a string, recived ${product.category}
        * Thumbnails: needs to be a string, recived ${product.thumbnails}
        * Stataus: needs to be a string, recived ${product.status}
    `;
};