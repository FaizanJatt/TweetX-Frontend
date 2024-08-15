type FollowerType = {
  _id: string;
  name: string;
  email: string;
  followingCount: number;
  isFollowing?: boolean;
  profileImageUrl?: string;
};
interface FollowerItemProps {
  follower: FollowerType;
  isFollowed: boolean;
  toggleFollow: (id: string) => void;
}

export default function FollowerItem({
  follower,
  toggleFollow,
  isFollowed,
}: FollowerItemProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {follower.profileImageUrl ? (
            <img
              src={follower.profileImageUrl}
              alt={`${follower.name}'s profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300"></div>
          )}
        </div>
        <div className="ml-4">
          <div className="text-gray-500 font-semibold text-lg">
            {follower.name}
          </div>
          <div className="text-gray-400 text-[12px]">
            Following: {follower.followingCount}
          </div>
        </div>
      </div>
      <button
        onClick={() => toggleFollow(follower._id)}
        className={`px-4 py-2 rounded-full font-semibold ${
          isFollowed ? "bg-gray-100 text-gray-500" : "bg-pink-500 text-white"
        }`}
      >
        {isFollowed ? "Following" : "Follow"}
      </button>
    </div>
  );
}
