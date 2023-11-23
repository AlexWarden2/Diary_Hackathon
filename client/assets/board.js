

function createPostElement (data) {
    const post = document.createElement("div");
    post.className = "post";

    const header = document.createElement("h2");
    header.textContent = data["title"];
    post.appendChild(header);

    const content = document.createElement("p");
    content.textContent = data["content"];
    post.appendChild(content);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    post.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    post.appendChild(editBtn);

    return post;
}

document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: form.get("title"),
            content: form.get("content")
        })
    }

    const result = await fetch("http://localhost:3000/posts", options);

    if (result.status == 201) {
        window.location.reload();
    }
})

async function loadPosts () {

    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch("http://localhost:3000/posts", options);

    if (response.status === 200) {
        const posts = await response.json();
    
        const container = document.getElementById("posts");

        posts.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        })
    } else {
        window.location.assign("./index.html");
    }

}

// removes token from local storage when user logs out 

// const logout = require('../../api/controllers/users')

document.getElementById('logout').addEventListener('click', async () => {

    const options = {
        headers: {
            Authorization : localStorage.getItem('token')
        }
    }

    const response = await fetch('http://localhost:3000/users/logout', options);
    const res = await response.json();

    if (response.status === 200) {
        localStorage.removeItem('token');
        window.location.assign('./index.html');
      } else {
        alert(res.error);
      }
})

loadPosts();
