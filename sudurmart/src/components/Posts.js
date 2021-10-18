/** @format */
import { useEffect, useState, useRef } from "react";
import { fetchMiddle } from "./fetchMiddle";
import { Link } from "react-router-dom";

export default function Posts(params) {
  const [images, setImages] = useState([
    "https://parade.com/wp-content/uploads/2020/03/avengers-marvel.jpg",
    "https://cdn.britannica.com/62/182362-050-BD31B42D/Scarlett-Johansson-Black-Widow-Chris-Hemsworth-Thor.jpg",
    "https://www.gannett-cdn.com/presto/2021/01/07/USAT/0d87949b-7f95-4318-a7f7-72f2b6893d05-marvel-shows.png?crop=1593,896,x6,y0&width=1593&height=896&format=pjpg&auto=webp",
    "https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/48/1543418640-marvel.jpg?crop=1xw:0.7682851874615857xh;center,top&resize=1200:*",
    "https://images.immediate.co.uk/production/volatile/sites/3/2020/03/infinity-war-122ce1b.jpg?quality=90&resize=768,574",
    "https://media.wired.com/photos/5955ceabcbd9b77a41915cf6/191:100/w_1280,c_limit/marvel-characters.jpg",
    "https://ksr-ugc.imgix.net/assets/028/325/880/54bf78ece1c68263ef2e803445839141_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1583369884&auto=format&frame=1&q=92&s=cc6309343633cd34b300fb6dc22cf6e7",
    "https://www.denofgeek.com/wp-content/uploads/2019/02/mcu_large.jpg?resize=768%2C432",
    "https://cdn.akamai.steamstatic.com/steam/apps/997070/capsule_616x353.jpg?t=1630423045",
    "https://cdn.pixabay.com/photo/2015/03/11/01/33/hulk-667988__340.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoELXw8s_6ZAs9NeV9KUOKnEQ7D_syf7GCWA&usqp=CAU",
    "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/1EBBA3A80D21FD3A38E279661BE220AE4D6887E49D552A7D782ED05069676AE6/scale?width=1200&aspectRatio=1.78&format=jpeg",
    "https://www.mural-wallpaper.com/wp-content/uploads/2020/11/UN-DIS29.jpg",
  ]);

  const [posts, setPosts] = useState([]);

  const title =
    "Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.";

  const getPosts = async () => {
    const result = await fetchMiddle("http://127.0.0.1:8000/api/post-list");
    setPosts(result);
  };

  useEffect(() => {
    getPosts();
    return () => {};
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-cols-4 gap-4">
      {posts.map((post, index) => (
        <div className="card bordered h-fit" key={index}>
          <figure>
            <img src={post.coverImage} className="max-h-32 object-cover" />
          </figure>
          <div class="p-4">
            <label className="text-xs mb-2 opacity-60">
              {new Date(post.postDate).toDateString()}
            </label>
            <Link
              className="line-clamp-2 font-semibold hover:underline"
              to={"/dashboard/postdetail/" + post.id}
            >
              {post.postTitle}
            </Link>
            <div class="justify-end card-actions">
              <Link
                class="btn btn-primary"
                to={"/dashboard/editpost/" + post.id}
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
