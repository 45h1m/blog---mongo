import { Schema, model, models } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 100,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    authorDP: {
        type: String,
        required: true,
        trim: true,
    },
    tags: [
        {
            type: String,
            trim: true,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    published: {
        type: Boolean,
        default: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
    }
});

blogSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const BlogModel = models.blog || model("blog", blogSchema);

export default BlogModel;
