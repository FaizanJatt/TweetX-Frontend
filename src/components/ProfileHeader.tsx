interface UserProfile {
  name: string;
  email: string;
  id: string;
  followersCount: number;
  postsCount: number;
  followingCount: number;
  profileImageUrl?: string;
}
interface ProfileHeaderProps {
  user: UserProfile | null;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex items-center mb-8">
      <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt={`${user.name}'s profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300"></div>
        )}
      </div>
      <div className="ml-8">
        <div className="text-2xl font-semibold text-gray-500">{user?.name}</div>
        <div className="flex space-x-4 mt-2 text-gray-300">
          <span>Posts: {user?.postsCount}</span>
          <span>Followers: {user?.followersCount}</span>
          <span>Following: {user?.followingCount}</span>
        </div>
      </div>
    </div>
  );
}
