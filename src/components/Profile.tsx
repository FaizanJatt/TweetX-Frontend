import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import PostsList from "./PostsList";
import Followers from "./Followers";
import Following from "./Following";
import {
  getUserFollowingData,
  followUser,
  getUserPosts,
  PostType,
} from "../api.ts";

type FollowingType = {
  _id: string;
  name: string;
  email: string;
  followingCount: number;
  profileImageUrl?: string;
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

type ProfileTabStateList = "Post" | "Followers" | "Following";

function Profile() {
  const [profileTabState, setProfileTabState] =
    useState<ProfileTabStateList>("Post");
  const [users, setUsers] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<PostType[] | []>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // localStorage.removeItem("token")
    const fetchUsers = async (id: string) => {
      try {
        const res = await getUserFollowingData(id);
        const posts = await getUserPosts(id);
        setUserPosts(posts);
        console.log(res, "RES");
        setUsers(res);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (storedToken) {
      const storedUserInfo = localStorage.getItem("user");
      if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        setCurrentUser(userInfo);
        fetchUsers(userInfo.id);
      }
    }
  }, []);

  const handleToggleFollow = async (toFollowId: string) => {
    console.log(currentUser, toFollowId);
    if (currentUser)
      try {
        const result = await followUser(currentUser?.id, toFollowId);
        console.log(result);

        if (result.message === "User followed successfully") {
          // Add the followed user to the followingList
          const followedUser = result.followedUser; // Assuming the API returns the followed user's data
          setUsers((prevState) => {
            if (!prevState) return null;
            return {
              ...prevState,
              followingList: [...prevState.followingList, followedUser],
              followingCount: prevState.followingCount + 1,
            };
          });
        } else if (result.message === "User unfollowed successfully") {
          // Remove the unfollowed user from the followingList
          setUsers((prevState) => {
            if (!prevState) return null;
            return {
              ...prevState,
              followingList: prevState.followingList.filter(
                (user) => user._id !== toFollowId
              ),
              followingCount: prevState.followingCount - 1,
            };
          });
        }
      } catch (error) {
        console.error("Error toggling follow status:", error);
      }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <ProfileHeader user={users} />
      <ProfileTabs state={profileTabState} setState={setProfileTabState} />
      {profileTabState === "Post" && userPosts.length > 0 && (
        <PostsList posts={userPosts} />
      )}
      {profileTabState === "Post" && userPosts.length === 0 && (
        <div className="flex justify-center items-center text-gray-500">
          No Posts have been created by this user
        </div>
      )}
      {profileTabState === "Followers" && users?.followersList && (
        <Followers
          followingList={users.followingList}
          followersList={users?.followersList}
          toggleFollow={handleToggleFollow}
        />
      )}
      {profileTabState === "Following" && users?.followingList && (
        <Following
          followingList={users?.followingList}
          toggleFollow={handleToggleFollow}
        />
      )}
    </div>
  );
}

export default Profile;
