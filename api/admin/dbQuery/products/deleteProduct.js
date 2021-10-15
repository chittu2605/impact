const DELETE_FRANCHISE_PRODUCT = (id) => {
  return `
    DELETE FROM tbl_product_franchise
    WHERE id = "${id}";
    `;
};

const DELETE_FRANCHISE_PRODUCT_QUANTITY_WITH_ID = (id) => {
  return `
    DELETE FROM tbl_product_franchise_quantity
    WHERE id = "${id}";
    `;
};

const DELETE_FRANCHISE_PRODUCT_QUANTITY = (productId) => {
  return `
    DELETE FROM tbl_product_franchise_quantity
    WHERE product_id = "${productId}";
    `;
};

module.exports.DELETE_FRANCHISE_PRODUCT = DELETE_FRANCHISE_PRODUCT;
module.exports.DELETE_FRANCHISE_PRODUCT_QUANTITY_WITH_ID =
  DELETE_FRANCHISE_PRODUCT_QUANTITY_WITH_ID;
module.exports.DELETE_FRANCHISE_PRODUCT_QUANTITY =
  DELETE_FRANCHISE_PRODUCT_QUANTITY;
