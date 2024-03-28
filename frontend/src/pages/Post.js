import React, { useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import CommentList from "../components/CommetList";
import { TextareaAutosize } from "@mui/material";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Post = () => {
 
  const search = useLocation().search;
const postId =new URLSearchParams(search).get("id");
console.log("postId",postId);//12345
const navigate = useNavigate();
   
 // const id = "65fc8b587b587f6acdf9729b";
  //console.log("id", id);
  const { userInfo } = useSelector((state) => state.signIn);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [totalComents, setTotalComents] = useState("");
  const [totalLikes, setTotalLikes] = useState("");
  const [error, setError] = useState("");


  //fetch single post
  const displaySinglePost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `localhost:3000/api/post/${postId}`
      );
      console.log(data);
      setTitle(data.posts.title);
      setContent(data.posts.content);
      setImage(data.posts.imageUrl ?? data.posts.image.url);
      setCreatedAt(data.posts.createdAt);
      setLoading(false);
      setComments(data.posts.comments);
      setTotalComents(data.posts.comments.length);
      setTotalLikes(data.posts.likes.length);
    } catch (error) {
      console.log("error", error);
      setError(error.message);
      navigate("/notFound");
    }
  };

  // add comment
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `localhost:3000/api/comment/post/${postId}`,
        { comment },
        {
          headers: {
            token: userInfo.token,
          },
        }
      );
      if (data.success === true) {
        setComment("");
        toast.success("comment added");
        displaySinglePost();
        // socket.emit('comment', data.post.comments);
      }
      //console.log("comment post", data.post)
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    displaySinglePost();
  }, []);

  return (
    <div>
      <Navbar />

      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="post-content">
              <img src={image} alt="post" class="img-responsive post-image" />
              <div class="post-container">
                <div class="post-detail">
                  <div class="user-info">
                    <h2 class="text-muted">{title}</h2>
                  </div>
                  <div class="post-text">
                    {moment(createdAt).format("MMMM DD, YYYY")}
                  </div>
                  <div>
                    <a class="btn text-green" >
                      <i class="fa fa-thumbs-up"></i>Comments {totalComents}
                    </a>
                    <a class="btn text-red">
                      <i class="fa fa-thumbs-down"></i>Likes {totalLikes}
                    </a>
                  </div>
                  <div style={{textAlign: "justify"}}>
                    <p class="text-muted">{content}</p>
                  </div>
                  <div class="line-divider"></div>

                  <div class="line-divider"></div>
                  <div>
                    {/* add coment list */}
                    {comments.length === 0 ? "" : <h5 style={{ textAlign: "left"}}>Comments:</h5>}

                    {comments.map((comment) => (
                      <CommentList
                        key={comment._id}
                        name={comment.postedBy.name}
                        text={comment.text}
                      />
                    ))}
                    {userInfo ? (
                      <>
                        <div style={{ bgcolor: "#fafafa" }}>
                          <h2>Add your comment here!</h2>
                          <form onSubmit={addComment}>
                            <TextareaAutosize
                              onChange={(e) => setComment(e.target.value)}
                              value={comment}
                              aria-label="minimum height"
                              minRows={3}
                              placeholder="Add a comment..."
                              style={{ width: 500, padding: "5px" }}
                            />
                            <div>
                              <button type="submit" variant="contained">
                                Comment
                              </button>
                            </div>
                          </form>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/login"> Log In to add a comment</Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  );
};

export default Post;
