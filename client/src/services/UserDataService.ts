import axios from 'axios';

export const signupWithAuth0 = async (token:string) => {
    const res=await axios.post(
        "http://localhost:8001/api/v1/user/auth0/signup",
        {}, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  return res.data;
};

export const fetchUserDetails = async (token: string, username: string) => {
    try {
      const res = await axios.get(`http://localhost:8001/api/v1/user/profile/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      return res.data; // or res.data.data depending on your ApiResponse shape
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };
  