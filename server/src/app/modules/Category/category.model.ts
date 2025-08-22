// category model
import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    isNested: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual population

categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

categorySchema.virtual("productCount", {
  ref: "Product",
  localField: "_id",
  foreignField: "categoryIds",
  count: true,
});

// Add pre-save hook for slug generation

// categorySchema.pre("save", function (next) {

//   this.slug = slugify(this.title, { lower: true, strict: true });
//   next();
// });

// Updates parent's isNested status

categorySchema.post("save", async function (doc) {
  if (doc.parent) {
    await Category.findByIdAndUpdate(
      doc.parent,
      { $set: { isNested: true } },
      { new: true }
    );
  }
});

const Category = model<TCategory>("Category", categorySchema);

export default Category;
