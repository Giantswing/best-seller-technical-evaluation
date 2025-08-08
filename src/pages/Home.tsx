import { useEffect, useRef, useMemo } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Icon } from "@iconify/react";
import SearchPostsBar from "@/components/SearchPostsBar";
import useStore from "@/store";
import { Link } from "react-router-dom";

const Home = () => {
  const { posts, fetchPosts, loadingPosts, textSearch, selectedCategory, totalPages, currentPage, fetchUsers, users } =
    useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    if (scrollContainerRef.current) {
      autoAnimate(scrollContainerRef.current, {
        duration: 100,
      });
    }
  }, []);

  const filteredPosts = useMemo(() => {
    let result = posts;
    result = result.filter((post) => post.title.includes(textSearch) || post.body.includes(textSearch));
    result = result.filter((post) => post.category === selectedCategory || selectedCategory === "all");
    return result;
  }, [posts, textSearch, selectedCategory]);

  return (
    <div
      className="m-8 flex flex-col min-h-[90dvh] max-h-[90dvh] overflow-y-auto gap-4 pr-4 overflow-x-hidden"
      ref={scrollContainerRef}
    >
      <SearchPostsBar />

      <div
        className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none transition-opacity duration-200 bg-gradient-to-b from-white from-80% to-transparent"
        style={{ opacity: loadingPosts ? 0.7 : 0 }}
      >
        <Icon className="animate-spin text-4xl" icon="mdi:loading" />
      </div>

      {filteredPosts.length > 0 ? (
        <table className="min-w-full border border-gray-200 overflow-y-auto relative table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left sticky top-12 z-10 bg-gray-100 w-[20%]">Title</th>
              <th className="px-4 py-2 text-left sticky top-12 z-10 bg-gray-100 w-[20%]">Author</th>
              <th className="px-4 py-2 text-left sticky top-12 z-10 bg-gray-100 w-[20%]">Category</th>
              <th className="px-4 py-2 text-left sticky top-12 z-10 bg-gray-100 w-[40%]">Body</th>
              <th className="px-4 py-2 text-left sticky top-12 z-10 bg-gray-100 w-[10%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-4 py-2 font-bold">{post.title}</td>
                <td className="px-4 py-2">{users.find((user) => user.id === post.userId)?.name || "Unknown"}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-gray-700 text-white px-2 rounded-full text-sm hover:bg-gray-500 hover:translate-y-[-1px] transition-all font-semibold"
                    onClick={() => {
                      if (selectedCategory === post.category) {
                        useStore.setState({ selectedCategory: "all" });
                      } else {
                        useStore.setState({ selectedCategory: post.category });
                      }
                    }}
                  >
                    {post.category}
                  </button>
                </td>
                <td className="px-4 py-2">{post.body}</td>
                <td className="px-4 py-3 flex justify-center items-center">
                  <Link
                    prefetch="intent"
                    to={`/post/${post.id}`}
                    className="bg-blue-400 p-2 rounded hover:bg-blue-600 transition-colors duration-200 inline-flex items-center justify-center text-white"
                  >
                    <Icon icon="mdi:eye" className="text-xl" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loadingPosts &&
        filteredPosts.length === 0 && (
          <div className="flex justify-center items-center flex-1">
            <p>No posts found</p>
          </div>
        )
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 sticky bottom-0 bg-white py-4 border-t border-gray-200 rounded-t-md">
          <button
            className="group"
            onClick={() => {
              if (currentPage === 1) return;
              useStore.setState({ currentPage: currentPage - 1 });
              scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
              fetchPosts();
            }}
            style={{
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            <Icon
              icon="mdi:arrow-left"
              className="text-xl group-hover:translate-x-[-3px] transition-all duration-200"
            />
          </button>

          <span>
            {currentPage} / {totalPages}
          </span>

          <button
            className="group"
            onClick={() => {
              if (currentPage === totalPages) return;
              useStore.setState({ currentPage: currentPage + 1 });
              scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
              fetchPosts();
            }}
            style={{
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            <Icon
              icon="mdi:arrow-right"
              className="text-xl group-hover:translate-x-[3px] transition-all duration-200"
            />
          </button>
        </div>
      )}
      <p className="sticky bottom-0 text-right">
        Made by Alejandro Pino for <span className="font-bold">BESTSELLER</span>
      </p>
    </div>
  );
};

export default Home;
