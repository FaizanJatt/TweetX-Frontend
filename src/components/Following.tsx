import FollowingItem from "./FollowingItem";

type FollowingType = {
  _id: string;
  name: string;
  email: string;
  followingCount: number;
  profileImageUrl?: string;
};

interface ProfileHeaderProps {
  followingList: FollowingType[];
  toggleFollow: (id: string) => void;
}

function Following({ followingList, toggleFollow }: ProfileHeaderProps) {
  return (
    <div className="max-w-md mx-auto mt-10">
      {followingList.map((followingUser) => (
        <FollowingItem
          toggleFollow={toggleFollow}
          key={followingUser._id}
          followingUser={followingUser}
        />
      ))}
    </div>
  );
}

export default Following;
