import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/features/blogs/blogsSlice";
import Card from "./Card";
const PostCard = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, error } = useSelector(
    (state) => state.blogs
  );

  const { tags, search } = useSelector((state) => state.filter)
  console.log(tags,search)

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  const startIndex = ((currentPage - 1) * blogsPerPage)
  const endIndex = currentPage * blogsPerPage
  const paginatedBlogs = blogs.slice(startIndex,endIndex)

  const handlePageChange = (nexPage) => {
    setCurrentPage(nexPage)
  }
  useEffect(() => {
    dispatch(fetchBlogs({tags,search}));
  }, [dispatch,search,tags]);

  console.log(blogs);

  return (
    <div className="w-full lg:w-2/3">
      {!isError && !isLoading && blogs?.length > 0 ? (
        <div>
          {paginatedBlogs?.map((blog, index) => (
            <Card blog={blog} key={index} />
          ))}
          <div className="space-x-2">
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="px-2 bg-red-500 text-white rounded cursor-pointer">Previous</button>
            <span>{currentPage}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} className="px-2 bg-blue-500 text-white rounded cursor-pointer">Next</button>
          </div>
        </div>
      ) : (
        <div>No blogs found</div>
      )}
    </div>
  );
};

export default PostCard;
