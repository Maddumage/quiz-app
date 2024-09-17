"use client";
import quizService from "@/services/quizService";
import { useEffect, useState } from "react";

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // const fetchQuizzes = async () => {
  //   const url = "http://localhost:5000/api/quizzes";
  //   try {
  //     const response = await fetch(url);
  //     const result = await response.json();
  //     setQuizzes(result.data);
  //     console.log("Success:", result);
  //   } catch (error: any) {
  //     console.error(error.message);
  //   }
  // };

  const fetchQuizzes = async () => {
    try {
      const data = await quizService.getAllQuizzes();
      setQuizzes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  return (
    <div className="container mt-5 ml-5">
      <div className="text-center">
        <h1 className="text-success mtb-1 ">GeekForGeeks</h1>
        <h3 className="mb-4">Quiz App</h3>
      </div>

      <div>
        {quizzes.map((quiz: any) => (
          <div>
            <h1 className="text-success mtb-1 ">{quiz.title}</h1>
            <h3 className="mb-4">{quiz.description}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
