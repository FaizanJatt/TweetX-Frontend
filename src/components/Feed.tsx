import { useEffect, useState } from "react";
import Post from "./Post";
import Modal from "./Modal"; // Import the modal component
import { createPost, getUserFeed } from "../api";

type PostDataType = {
  _id: string;
  user: {
    _id: string;
    name: string;
    profileImageUrl?: string;
  };
  content: string;
  createdAt: string;
};

interface User {
  name: string;
  email: string;
  id: string;
  followersCount: number;
  postsCount: number;
  followingCount: number;
  profileImageUrl?: string;
  followersList: FollowingType[];
  followingList: FollowingType[];
  postsList: object[];
}

type FollowingType = {
  _id: string;
  name: string;
  email: string;
  followingCount: number;
  profileImageUrl?: string;
};

function Feed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [feedPosts, setFeedPosts] = useState<PostDataType[]>([]); // State for storing data from getUserFeed

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const storedUserInfo = localStorage.getItem("user");
      if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        setCurrentUser(userInfo);

        // Call getUserFeed here and set the state
        const fetchFeed = async () => {
          try {
            const feed = await getUserFeed(userInfo.id);
            setFeedPosts(feed);
          } catch (error) {
            console.error("Error fetching user feed:", error);
          }
        };

        fetchFeed();
      }
    }
  }, []);

  const postHandler = async (content: string) => {
    if (currentUser && currentUser.id) {
      const result = await createPost(currentUser.id, content);
      console.log(result);

      // Optionally, refetch the feed after creating a post to update the feed
      const updatedFeed = await getUserFeed(currentUser.id);
      setFeedPosts(updatedFeed);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <button
        onClick={openModal}
        className="bg-red-400 px-6 py-2 text-sm text-white font-medium rounded-md mt-8"
      >
        Write
      </button>

      <div className="mt-12 flex flex-col gap-y-9">
        {feedPosts.length > 0 ? (
          feedPosts.map((data) => <Post key={data._id} data={data} />)
        ) : (
          <div>
            <p>No Posts have been made by any of the users you follow</p>
          </div>
        )}
      </div>

      {isModalOpen && <Modal postHandler={postHandler} onClose={closeModal} />}
    </div>
  );
}

export default Feed;
