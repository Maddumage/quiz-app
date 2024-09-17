import axiosInstance from "./axiosInstance";

const quizService = {
  getAllQuizzes: async () => {
    try {
      const response = await axiosInstance.get("/quizzes");
      console.log("response ==> ", response);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getQuizById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/quizzes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createQuiz: async (quizData: any) => {
    try {
      const response = await axiosInstance.post("/quizzes", quizData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateQuiz: async (id: string, quizData: any) => {
    try {
      const response = await axiosInstance.put(`/quizzes/${id}`, quizData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteQuiz: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/quizzes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default quizService;
