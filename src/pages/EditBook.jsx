import React from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import Spinner from "../components/spinner/Spinner";
import { useGetBookQuery } from "../features/api/apiSlice";

const EditBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useGetBookQuery(id);

  let content = null;

  if (isLoading) content = <Spinner />;

  if (!isLoading && isError) {
    content = <div>Error Occured</div>;
  }
  if (!isLoading && !isError && book?.id) {
    content = <Form book={book} />;
  }

  return (
    <>
      <main className="py-6 2xl:px-6">
        <div className="container">
          <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
            <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
            {content}
          </div>
        </div>
      </main>
    </>
  );
};

export default EditBook;
