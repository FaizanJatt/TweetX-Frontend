type UserType = {
  _id: string;
  name: string;
  followingCount: number;
  isFollowing: boolean;
  profileImageUrl?: string;
};
interface UserItemProps {
  user: UserType;
  onToggleFollow: (id: string) => void;
}

export default function UserItem({ user, onToggleFollow }: UserItemProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt={`${user.name}'s profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300"></div>
          )}
        </div>
        <div className="ml-4">
          <div className="text-gray-900 font-semibold">{user.name}</div>
          <div className="text-gray-500 text-sm">
            Following: {user.followingCount}
          </div>
        </div>
      </div>
      <button
        onClick={() => onToggleFollow(user._id)}
        className={`px-4 py-2 rounded-full font-semibold ${
          user.isFollowing
            ? "bg-gray-100 text-gray-500"
            : "bg-pink-500 text-white"
        }`}
      >
        {user.isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}
