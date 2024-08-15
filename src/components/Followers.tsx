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
  console.log("following", followingList);
  console.log("follower", followersList);
  return (
    <div className="max-w-md mx-auto mt-10">
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
