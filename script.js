// Blog class to handle blog operations
class BlogManager {
    constructor() {
        this.blogs = this.loadBlogs();
        this.init();
    }

    init() {
        this.displayBlogs();
        document.getElementById('blogForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBlog();
        });
    }

    // Load blogs from localStorage
    loadBlogs() {
        const blogsJSON = localStorage.getItem('blogs');
        return blogsJSON ? JSON.parse(blogsJSON) : [];
    }

    // Save blogs to localStorage
    saveBlogs() {
        const blogsJSON = JSON.stringify(this.blogs);
        localStorage.setItem('blogs', blogsJSON);
    }

    // Add new blog
    addBlog() {
        const title = document.getElementById('blogTitle').value.trim();
        const content = document.getElementById('blogContent').value.trim();

        if (title && content) {
            const blog = {
                id: Date.now(),
                title: title,
                content: content,
                date: new Date().toLocaleString()
            };

            this.blogs.unshift(blog);
            this.saveBlogs();
            this.displayBlogs();
            
            // Clear form
            document.getElementById('blogForm').reset();
        }
    }

    // Delete blog
    deleteBlog(id) {
        this.blogs = this.blogs.filter(blog => blog.id !== id);
        this.saveBlogs();
        this.displayBlogs();
    }

    // Display all blogs
    displayBlogs() {
        const container = document.getElementById('blogsContainer');
        
        if (this.blogs.length === 0) {
            container.innerHTML = '<div class="empty-state">No blog posts yet. Create your first post!</div>';
            return;
        }

        container.innerHTML = this.blogs.map(blog => `
            <div class="blog-post">
                <h3>${this.escapeHtml(blog.title)}</h3>
                <div class="blog-meta">Posted on: ${blog.date}</div>
                <p>${this.escapeHtml(blog.content)}</p>
                <button class="btn-delete" onclick="blogManager.deleteBlog(${blog.id})">Delete</button>
            </div>
        `).join('');
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize blog manager
const blogManager = new BlogManager();
