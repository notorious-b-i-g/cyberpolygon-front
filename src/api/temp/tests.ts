import axiosInstance from './axiosInstance';

interface Test {
  id: number;
  title: string;
  description: string;
  questions_count: number;
}

interface Question {
  id: number;
  text: string;
  is_multiple_choice: boolean;
  answers: {
    id: number;
    text: string;
  }[];
}

interface TestDetail extends Test {
  questions: Question[];
}

interface TestSubmission {
  question_id: number;
  selected_answers: number[];
}

interface TestResult {
  score: number;
  max_score: number;
  percentage: number;
  correct_answers: number;
  partial_answers: number;
  total_questions: number;
}

const testsApi = {
  // Получение списка всех тестов
  list: async (): Promise<Test[]> => {
    const response = await axiosInstance.get('/tests/');
    return response.data;
  },
  
  // Получение детальной информации о тесте по id или названию
  get: async (idOrTitle: number | string): Promise<TestDetail> => {
    if (typeof idOrTitle === 'string' && isNaN(Number(idOrTitle))) {
      // Если строка и не число, то это название
      const response = await axiosInstance.post('/tests/', { title: idOrTitle });
      return response.data;
    } else {
      // Иначе это id
      const response = await axiosInstance.get(`/tests/${idOrTitle}/`);
      return response.data;
    }
  },
  
  // Отправка ответов пользователя для проверки
  submit: async (idOrTitle: number | string, answers: Record<string, string> | TestSubmission[]): Promise<TestResult> => {
    if (typeof idOrTitle === 'string' && isNaN(Number(idOrTitle))) {
      // Если строка и не число, то это название
      const response = await axiosInstance.post('/tests/check/', {
        title: idOrTitle,
        questions: answers
      });
      return response.data;
    } else {
      // Иначе это id
      const response = await axiosInstance.post(`/tests/${idOrTitle}/submit/`, { answers });
      return response.data;
    }
  }
};

export default testsApi; 