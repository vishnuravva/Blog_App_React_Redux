import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlog } from "./blogAPI";

const initialState = {
    blog: {},
    isLoading:false,
    isError:false,
    error:""
  }

  // async thunk
//  It simplifies the process of handling asynchronous operations, such as API requests, 
// by providing a structured way to define actions for different phases of the asynchronous operation (pending, fulfilled, and rejected).
  export const fetchBlog = createAsyncThunk("blog/fetchBlog",async(id) => {
    const blog = await getBlog(id)
    return blog
  })

const blogSlice = createSlice({
    name:"blog",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchBlog.pending,(state) => {
            state.isError = false,
            state.isLoading = true,
            state.blog = {}

        }).addCase(fetchBlog.fulfilled,(state,action) => {
            state.isLoading = false,
            state.blog = action.payload
        }).addCase(fetchBlog.rejected,(state,action) => {
            state.isLoading = false,
            state.blog = {},
            state.isError = true,
            state.error = action.error?.message
        })
    }
})
export default blogSlice.reducer