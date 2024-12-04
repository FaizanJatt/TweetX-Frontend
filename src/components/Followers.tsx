import FollowerItem from "./FollowerItem";

type FollowerType = {
  _id: string;
  name: string;
  email: string;
  followingCount: number;
  isFollowing?: boolean;
  profileImageUrl?: string;
};

interface ProfileHeaderProps {
  followersList: FollowerType[];
  followingList: FollowerType[];
  toggleFollow: (id: string) => void;
}

function Followers({
  followersList,
  followingList,
  toggleFollow,
}: ProfileHeaderProps) {
  return (
    <div className="max-w-md mx-auto mt-10  flex flex-col gap-y-4">
      {followersList.map((follower) => (
        <FollowerItem
          isFollowed={followingList.map((e) => e._id).includes(follower._id)}
          key={follower._id}
          follower={follower}
          toggleFollow={toggleFollow}
        />
      ))}
    </div>
  );
}

export default Followers;
