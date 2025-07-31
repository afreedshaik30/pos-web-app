function ProductCard({ product, onDelete }) {
  return (
    <div className="border-2 border-sky-400 p-4 rounded shadow">
      <h3 className="font-bold text-2xl text-center">{product.name}</h3>
      <p>Size: {product.size}</p>
      <p>Price: ${product.price}</p>
      <p className="text-red-600">Stock: {product.stock}</p>
      {onDelete && (
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 text-white px-2 py-1 rounded mt-2"
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default ProductCard;
