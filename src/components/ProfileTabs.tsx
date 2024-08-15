import { Dispatch, SetStateAction } from "react";
type ProfileTabStateList = "Post" | "Followers" | "Following";

interface ProfileTabsProps {
  state: ProfileTabStateList;
  setState: Dispatch<SetStateAction<ProfileTabStateList>>;
}

const profileTabNavList = ["Post", "Followers", "Following"];
export default function ProfileTabs({ state, setState }: ProfileTabsProps) {
  const navigationHandler = (e: any) => {
    setState(e.target.innerHTML);
  };
  return (
    <div className="flex justify-around border-b border-gray-200 mb-8">
      {profileTabNavList.map((e) => {
        return (
          <button
            key={e}
            onClick={navigationHandler}
            className={`text-gray-900 font-semibold pb-2  ${
              state === e && "border-pink-500 border-b-4"
            }`}
          >
            {e}
          </button>
        );
      })}
    </div>
  );
}
