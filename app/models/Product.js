import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: {type: String, require: true},
});

// Check if the model already exists to avoid redefining it
export default mongoose.models.Product || mongoose.model('Product', productSchema);