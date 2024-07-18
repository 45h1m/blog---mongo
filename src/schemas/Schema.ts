import { Schema, model, models } from "mongoose";

const storySchema = new Schema({
    title: { type: String, required: true, maxlength: 100, unique: true },
    author: { type: String, required: true, maxlength: 100 },
    authorDP: { type: String, required: false },
    cover: {
        audio: { type: String, required: false, maxlength: 100 },
        image: { type: String, required: true, maxlength: 100 },
    },
    slug: { type: String, required: true, maxlength: 100, unique: true },
    pages: [
        {
            type: {
                image: { type: String, required: true, maxlength: 100 },
                title: { type: String, required: true, maxlength: 100 },
                description: { type: String, required: true, maxlength: 500 },
                audio: { type: String, required: false, maxlength: 100 },
                video: { type: String, required: false, maxlength: 100 },
                href: { type: String, required: true, maxlength: 100 },
            },
        },
    ],
    nexthref: { type: String, required: true, maxlength: 100 },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const commentSchema = new Schema({
    name: { type: String, required: true, maxlength: 30 },
    email: { type: String, required: true, maxlength: 30 },
    createdAt: { type: Date, default: Date.now },
    content: { type: String, required: true, maxlength: 200 },
    dp: { type: String, required: true, maxlength: 30 },
});

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 100,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 300,
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
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
    },
    comments: [commentSchema],
});

blogSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

export const BlogModel = models.blog || model("blog", blogSchema);
export const CommentModel = models.comment || model("comment", commentSchema);
export const StoryModel = models.story || model("story", storySchema);
