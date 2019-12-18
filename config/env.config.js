module.exports = {
    "port": process.env.PORT || 3000,
    "environment": "dev",
    "mongoDbUri": process.env.MONGODB_URI || "mongodb://localhost/github-consumer",
    "githubEndpoint": "https://api.github.com/graphql",
    "githubAccessToken": process.env.GITHUB_ACCESS_TOKEN || "6fc20d916685695fa33eb68eb5e632121d9b195f",
    "netlifyEndpoint": process.env.NETLIFY_BUILD_HOOK || "https://api.netlify.com/build_hooks/5df9a398d9cbaf38acea6775"
};
