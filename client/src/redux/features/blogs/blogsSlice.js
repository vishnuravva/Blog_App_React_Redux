import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlogs } from "./blogsAPI";

const initialState = {
    blogs: [],
    isLoading:false,
    isError:false,
    error:""
  }

  // async thunk
//  It simplifies the process of handling asynchronous operations, such as API requests, 
// by providing a structured way to define actions for different phases of the asynchronous operation (pending, fulfilled, and rejected).
  export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs",async({tags,search}) => {
    const blogs = await getBlogs(tags,search)
    return blogs
  })

const blogsSlice = createSlice({
    name:"blogs",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchBlogs.pending,(state) => {
            state.isError = false,
             state.isLoading = true,
            state.blogs = []

        }).addCase(fetchBlogs.fulfilled,(state,action) => {
            state.isLoading = false,
            state.blogs = action.payload
        }).addCase(fetchBlogs.rejected,(state,action) => {
            state.isLoading = false,
            state.blogs = [],
            state.isError = true,
            state.error = action.error?.message
        })
    }
})
export default blogsSlice.reducer