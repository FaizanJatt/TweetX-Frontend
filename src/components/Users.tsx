import { useEffect, useState } from "react";
import UserItem from "./UserItem";
import { getAllUsersStatus, followUser } from "../api.ts";

type UserType = {
  _id: string;
  name: string;
  followingCount: number;
  isFollowing: boolean;
  profileImageUrl?: string;
  followersList: string[];
};
interface User {
  name: string;
  email: string;
  id: string;
}

function Users() {
  const [users, setUsers] = useState<UserType[] | []>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const fetchUsers = async (id: string) => {
      try {
        const res = await getAllUsersStatus(id);

        console.log(res, "RES");
        setUsers(res);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (storedToken) {
      const storedUserInfo = localStorage.getItem("user");
      if (storedUserInfo) {
        // setCurrentUser(JSON.parse(storedUserInfo));
        const userInfo = JSON.parse(storedUserInfo);
        setCurrentUser(userInfo);
        console.log(userInfo);
        fetchUsers(userInfo.id);
      }
    }
  }, []);

  const handleToggleFollow = async (toFollowId: string) => {
    console.log(currentUser, toFollowId);
    if (currentUser) {
      const result = await followUser(currentUser?.id, toFollowId);
      console.log(result);
      if (result.message === "User followed successfully") {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === toFollowId
              ? { ...user, isFollowing: !user.isFollowing }
              : user
          )
        );
      } else if (result.message === "User unfollowed successfully") {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === toFollowId
              ? { ...user, isFollowing: !user.isFollowing }
              : user
          )
        );
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      {users.map((user) => (
        <UserItem
          key={user._id}
          user={user}
          onToggleFollow={handleToggleFollow}
        />
      ))}
    </div>
  );
}

export default Users;
