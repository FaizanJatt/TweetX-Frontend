import axios, { AxiosError } from "axios";

const API_URL = "https://tweetbackend.netlify.app";

export interface UserType {
  _id: string;
  name: string;
  profileImageUrl?: string;
}

export interface PostType {
  _id: string;
  user: UserType;
  content: string;
  createdAt: string;
}

export interface UserData {
  email: string;
  password: string;
  name?: string;
}

export const registerUser = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw { message: "Network error" };
    }
  }
};

export const loginUser = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw { message: "Network error" };
    }
  }
};

export const getAllUsers = async (): Promise<UserType[]> => {
  try {
    const response = await axios.get<UserType[]>(`${API_URL}/users`);

    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw { message: "Network error" };
    }
  }
};

export const getAllUsersStatus = async (
  currentUserId: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_URL}/userStatus?q=${currentUserId}`
    );

    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw { message: "Network error" };
    }
  }
};

export const getUserFollowingData = async (
  currentUserId: string
): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/user/${currentUserId}`);

    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw { message: "Network error" };
    }
  }
};

export const followUser = async (
  userId: string,
  toFollowUserId: string
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/follow/${toFollowUserId}`, {
      userId,
    });

    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw { message: "Network error" };
    }
  }
};

export const createPost = async (
  userId: string,
  content: string
): Promise<PostType> => {
  try {
    const response = await axios.post<PostType>(`${API_URL}/posts`, {
      userId,
      content,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw { message: "Network error" };
    }
  }
};

export const getUserFeed = async (userId: string): Promise<PostType[]> => {
  try {
    const response = await axios.get<PostType[]>(
      `${API_URL}/user/${userId}/feed`
    );

    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw { message: "Network error" };
    }
  }
};

export const getUserPosts = async (userId: string): Promise<PostType[]> => {
  try {
    const response = await axios.get<PostType[]>(
      `${API_URL}/user/${userId}/posts`
    );

    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw { message: "Network error" };
    }
  }
};
