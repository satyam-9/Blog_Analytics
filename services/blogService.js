const axios = require("axios");
const asyncMemoize = require("../cache");

const getCachedStats = asyncMemoize(async () => {
    try {
        const response = await axios.get(
            "https://intent-kit-16.hasura.app/api/rest/blogs",
            {
                headers: {
                    "x-hasura-admin-secret":
                        "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
                },
            }
        );

        const blogData = response.data.blogs;
        // console.log(blogData)
        const totalBlogs = blogData.length;

        const longestTitleBlog = blogData.reduce((prev, current) => {
            return prev.title.length > current.title.length ? prev : current;
        });

        const blogsContainPrivacy = blogData.filter((blog) =>
            blog.title.toLowerCase().includes("privacy")
        );

        const uniqueTitles = [...new Set(blogData.map((blog) => blog.title))];

        return {
            totalBlogs,
            longestBlogTitle: longestTitleBlog.title,
            blogsContainPrivacy: blogsContainPrivacy.length,
            uniqueBlogTitles: uniqueTitles,
        };
    } catch (error) {
        throw error;
    }
});

const getCachedResults = asyncMemoize(async (query) => {
    try {
        // console.log("cache...");
        const response = await axios.get(
            "https://intent-kit-16.hasura.app/api/rest/blogs",
            {
                headers: {
                    "x-hasura-admin-secret":
                        "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
                },
            }
        );

        const blogData = response.data.blogs;

        const filteredBlogs = blogData.filter((blog) =>
            blog.title.toLowerCase().includes(query.toLowerCase())
        );

        return filteredBlogs;
    } catch (error) {
        throw error;
    }
});

module.exports = { getCachedStats, getCachedResults };
