const createPostElement = (data) => {
  const post = document.createElement("div");
  post.className = "post";

  const header = document.createElement("h2");
  header.textContent = data["title"];
  post.appendChild(header);

  const content = document.createElement("p");
  content.textContent = data["content"];
  post.appendChild(content);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.id = 'delete';
  post.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', async () => {
    const options = {
      headers: {
        Authorization: localStorage.getItem('token') },
        method: 'DELETE'};

    const response = await fetch( `http://localhost:3000/posts/${data['id']}`, options);

    if (response.status === 204) {
      window.location.reload();
    } else {
      const res = await response.json();
      alert(res.error);
    }
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.id = 'edit';
  post.appendChild(editBtn);

  return post;
};

document.getElementById('post-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const options = {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token'),
      Accept: 'application/json',
              'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: form.get('title'),
      content: form.get('content')
    })
  };

  const response = await fetch('http://localhost:3000/posts', options);
  const data = await response.json();

  if (response.status === 201) {
    window.location.reload();
  } else {
    alert(data.error);
  }
});

const loadPosts = async () => {
  const options = {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  };
  const response = await fetch('http://localhost:3000/posts', options);

  if (response.status === 200) {
    const posts = await response.json();

    const container = document.getElementById('posts');

    posts.forEach((p) => {
      const elem = createPostElement(p);
      container.appendChild(elem);
    });
  } else {
    window.location.assign('./index.html');
  }
};

document.getElementById('logout').addEventListener('click', async () => {
  const options = {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  };
  const response = await fetch('http://localhost:3000/users/logout', options);
  const data = await response.json();

  if (response.status === 200) {
    localStorage.removeItem('token');
    window.location.assign('./index.html');
  } else {
    alert(data.error);
  }
});

loadPosts();
