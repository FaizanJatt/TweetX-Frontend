import { Dispatch, SetStateAction } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
type ProfileTabStateList = "Post" | "Followers" | "Following";
interface ProfileTabsProps {
  state: ProfileTabStateList;
  setState: Dispatch<SetStateAction<ProfileTabStateList>>;
}

const profileTabNavList: ProfileTabStateList[] = [
  "Post",
  "Followers",
  "Following",
];
export default function ProfileTabs({ state, setState }: ProfileTabsProps) {
  const navigationHandler = (e: ProfileTabStateList) => {
    setState(e);
  };
  return (
    <div className="flex justify-around border-t border-gray-200 mb-8 ">
      {profileTabNavList.map((e: ProfileTabStateList) => {
        return (
          <button
            key={e}
            onClick={() => navigationHandler(e)}
            className={` font-semibold pt-4 pb-2 flex justify-center items-center gap-2 min-w-max w-32 ${
              state === e && "border-gray-600 border-t-2 text-gray-500"
            } ${state !== e && "text-gray-400"}`}
          >
            <p>{e}</p>
            <div>
              <FontAwesomeIcon icon={faComments} size="lg" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
