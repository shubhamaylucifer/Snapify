import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const BASE_URL = String(process.env.BASEAPP_URL);
  const { userInfo } = useSelector((state) => state.signIn);
  const displayPost = async () => {
    try {
      const { data } = await axios.get(
        `localhost:3000/api/posts/show`
      );
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayPost();
  }, []);

  //delete post by Id
  const deletePostById = async (e, id) => {
    // console.log(id)
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const { data } = await axios.delete(
          `localhost:3000/api/delete/post/${id}`,
          {
            headers: {
              token: userInfo.token,
            },
          }
        );
        if (data.success === true) {
          toast.success(data.message);
          displayPost();
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  /*const thumbnailfunc = (imageUrl) => {
    if(!imageUrl) {
      return "";
    }else {
      return imageUrl.replace("statefarm-blog-images", "statefarm-blog-thumbnail");
    }
  }*/
  const columns = [
    {
      field: "_id",
      headerName: "Post ID",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "Post title",
      width: 150,
    },

    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => <img width="40%" src={params.row.imageUrl ?? params.row.image.url} />,
    },
    {
      field: "likes",
      headerName: "Likes",
      width: 150,
      renderCell: (params) => params.row.likes.length,
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 150,
      renderCell: (params) => params.row.comments.length,
    },
    {
      field: "postedBy",
      headerName: "Posted by",
      width: 150,
      valueGetter: (data) => "test",
    },
    {
      field: "createdAt",
      headerName: "Create At",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },

    {
      field: "Actions",
      width: 100,
      renderCell: (value) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          {/*(<Link to={`/admin/post/edit/${value.row._id}`}>
            <IconButton aria-label="edit">
              <EditIcon sx={{ color: "#1976d2" }} />
            </IconButton>
          </Link>*/}
          <IconButton
            aria-label="delete"
            onClick={(e) => deletePostById(e, value.row._id)}
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Navbar />

      <Box>
        <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
          Admin Dashboard
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <Button variant="contained" color="success" startIcon={<AddIcon />}>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/admin/create/post"
            >
              Create Post
            </Link>{" "}
          </Button>
        </Box>
        <Paper sx={{ bgcolor: "white" }}>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              sx={{
                "& .MuiTablePagination-displayedRows": {
                  color: "black",
                },
                color: "black",
                [`& .${gridClasses.row}`]: {
                  bgcolor: "white",
                },
              }}
              rows={posts}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[3]}
              
            />
          </Box>
        </Paper>
      </Box>
      <Footer />
    </div>
  );
};

export default Dashboard;
