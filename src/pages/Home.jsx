import React, { useState } from "react";
import { useSelector } from "react-redux";
import BookCard from "../components/BookCard";
import Spinner from "../components/spinner/Spinner";
import { useGetBooksQuery } from "../features/api/apiSlice";

const Home = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const { searchInput } = useSelector((state) => state.filter);
  const [status, setStatus] = useState("All");

  const filterByStatus = (item) => {
    if (status === "Featured") {
      return item.featured;
    } else {
      return item;
    }
  };

  const filterByInput = (item) => {
    return item?.name?.toLowerCase().includes(searchInput.toLowerCase());
  };

  //   decide what to render

  let content;

  if (isLoading) {
    content = <Spinner />;
  }

  if (!isLoading && isError) {
    content = <div>Error</div>;
  }
  if (!isLoading && !isError && books.length === 0) {
    content = <div>No Books Found</div>;
  }
  if (!isLoading && !isError && books.length > 0) {
    content = books
      ?.filter(filterByStatus)
      ?.filter(filterByInput)
      ?.map((item) => <BookCard key={item.id} item={item} />);
  }

  return (
    <main className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          <h4 className="mt-2 text-xl font-bold">Book List</h4>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setStatus("All")}
              className={`lws-filter-btn ${
                status === "All" && "active-filter"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatus("Featured")}
              className={`lws-filter-btn ${
                status === "Featured" && "active-filter"
              }`}
            >
              Featured
            </button>
          </div>
        </div>
        <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {content}
        </div>
      </div>
    </main>
  );
};

export default Home;
