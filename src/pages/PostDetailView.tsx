import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import useStore from "@/store";

const PostDetailView = () => {
  const { id } = useParams();
  const { posts, users } = useStore();
  const post = posts.find((post) => post.id === Number(id));

  if (!post) {
    return (
      <div className="m-8 flex flex-col min-h-[90dvh] gap-4 shadow-lg p-4 px-8 rounded-lg justify-center items-center">
        <Icon icon="solar:sad-circle-bold-duotone" className="text-6xl text-gray-500" />
        <span className="text-gray-800 text-4xl">Ups...</span>
        <span className="text-gray-500 text-2xl">Post not found</span>
        <Link
          to="/"
          className="text-gray-500 flex items-center gap-2 group text-blue-500 hover:text-blue-600 transition-all duration-200"
        >
          <Icon icon="mdi:arrow-left" className="text-2xl" />
          <span className="text-2xl px-0 group-hover:px-4 transition-all duration-200">Go back to home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="m-8 flex flex-col min-h-[90dvh] gap-4 shadow-lg p-4 px-8 rounded-lg">
      <div className="sticky top-0 bg-white z-10 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-all duration-200 mb-2 w-fit"
        >
          <Icon icon="mdi:arrow-left" className="text-xl" />
          <span>Go back</span>
        </Link>

        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{post?.title}</h1>
            <h2 className="text-gray-500">{users.find((user) => user.id === post?.userId)?.name || "Unknown"}</h2>
          </div>
          <h2 className="bg-gray-700 text-white px-2 rounded-full text-sm hover:bg-gray-500 hover:px-3 transition-all">
            {post?.category}
          </h2>
        </div>
      </div>

      {[...Array(50)].map((_, i) => (
        <p className="text-gray-800" key={i}>
          {post?.body}
        </p>
      ))}
    </div>
  );
};

export default PostDetailView;
