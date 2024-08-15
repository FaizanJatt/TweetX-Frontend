import { DateTime } from "luxon";
import { PostType } from "../api";

interface PostProps {
  data: PostType;
}

function Post({ data }: PostProps) {
  console.log("data", data);
  // Convert createdAt to a Luxon DateTime object
  const createdAt = DateTime.fromISO(data.createdAt);

  // Get the current time
  const now = DateTime.now();

  // Calculate the difference in relative time
  const relativeTime = createdAt.toRelative(now);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex justify-between items-start">
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
        <div className="ml-4 min-w-96">
          <div className="text-gray-900 font-semibold">{data.user.name}</div>
          <div className="text-gray-600 text-sm">{data.content}</div>
        </div>
      </div>
      <div className="text-gray-500 text-sm mt-1">{relativeTime}</div>
    </div>
  );
}

export default Post;
