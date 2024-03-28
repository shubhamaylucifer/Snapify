import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import moment from "moment/moment";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  //display posts

  const showPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("localhost:3000/api/posts/show");
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    showPosts();
  }, []);

  // let uiPosts = postAddLike.length > 0 ? postAddLike : postRemoveLike.length > 0 ? postRemoveLike : posts;
  console.log("posts", posts);
  return (
    <div>
      <Navbar />

      <div class="container">
        <div class="row mt-n5">
          {posts.length > 0 ?
            posts.map((post, index) => (
              <div
              key={post.id}
                class="col-md-6 col-lg-4 mt-5 wow fadeInUp"
                data-wow-delay=".2s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.2s",
                  animationName: "fadeInUp",
                }}
              >
                 <Link to={`/singlepost/?id=${post._id}`}>
                <div class="blog-grid">
                  <div class="blog-grid-img position-relative">
                    <img alt="img" src={post.imageUrl ?? post.image.url} />{" "}
                  </div>
                  <div class="blog-grid-text p-4">
                    <h3 class="h5 mb-3">
                      {post.title}
                    </h3>
                    <p class="display-30">
                      <span
                        component="span"
                    
                        dangerouslySetInnerHTML={{
                          __html:
                            post.content.split(" ").slice(0, 10).join(" ") +
                            "...",
                        }}
                      ></span>
                    </p>
                    <div class="meta meta-style2">
                      <ul>
                        <li>
                          <span>Posted On - </span>
                          <a href="#!">
                            {moment(post.createdAt).format("MMMM DD, YYYY")}
                          </a>
                        </li>
                        <li>
                          
                        <span>Likes - </span>
                          
                          <a href="#!">
                            <i class="fas fa-like"></i> {post.likes.length}
                          </a>
                        </li>
                        <li>
                        <span>Comments - </span>
                          
                          <a href="#!">
                            <i class="fas fa-comments"></i>{" "}
                            {post.comments.length}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                </Link>
              </div>
            )) : (<Loader />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
