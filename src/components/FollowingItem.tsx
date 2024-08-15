interface FollowingItemProps {
  followingUser: FollowingType;
  toggleFollow: (id: string) => void;
}

type FollowingType = {
  _id: string;
  name: string;
  email: string;
  followingCount: number;
  profileImageUrl?: string;
};

export default function FollowingItem({
  followingUser,
  toggleFollow,
}: FollowingItemProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {followingUser.profileImageUrl ? (
            <img
              src={followingUser.profileImageUrl}
              alt={`${followingUser.name}'s profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300"></div>
          )}
        </div>
        <div className="ml-4">
          <div className="text-gray-900 font-semibold">
            {followingUser.name}
          </div>
          <div className="text-gray-500 text-sm">
            Following: {followingUser.followingCount}
          </div>
        </div>
      </div>
      <button
        onClick={() => toggleFollow(followingUser._id)}
        className="text-gray-500 font-semibold"
      >
        Following
      </button>
    </div>
  );
}
