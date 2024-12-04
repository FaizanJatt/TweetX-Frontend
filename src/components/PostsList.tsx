import Post from "./Post";
import { PostType } from "../api";

interface PostsListProps {
  posts: PostType[];
}

function PostsList({ posts }: PostsListProps) {
  return (
    <div className="flex justify-center items-center flex-col">
      {posts.map((post, index) => (
        <Post key={index} data={post} />
      ))}
    </div>
  );
}

export default PostsList;
