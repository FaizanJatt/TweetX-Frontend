import { DateTime } from "luxon";
import { PostType } from "../api";

interface PostProps {
  data: PostType;
}

function Post({ data }: PostProps) {
  // Convert createdAt to a Luxon DateTime object
  const createdAt = DateTime.fromISO(data.createdAt);

  // Get the current time
  const now = DateTime.now();

  // Calculate the difference in relative time
  const relativeTime = createdAt.toRelative(now);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex justify-between items-start relative overflow-hidden">
      <div className="flex items-start">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
          {data.user.profileImageUrl ? (
            <img
              src={data.user.profileImageUrl}
              alt={`${data.user.name}'s profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300"></div>
          )}
        </div>
        <div className="ml-4 lg:min-w-96 md:w-40">
          <div className="text-gray-500 font-semibold">{data.user.name}</div>
          <div className="text-gray-400 text-sm">{data.content}</div>
        </div>
      </div>
      <div className="text-gray-300 text-sm mt-1 mr-2">{relativeTime}</div>
      <div className="w-12 h-12 absolute -right-[1.5rem] bg-red-300 rounded-full"></div>
    </div>
  );
}

export default Post;
