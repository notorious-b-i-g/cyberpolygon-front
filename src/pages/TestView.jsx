import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTestById, submitTest } from '../api/tests';
import { Box, Button, Card, CardContent, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

export default function TestView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTest = async () => {
      try {
        setLoading(true);
        const data = await getTestById(id);
        setTest(data);
        setAnswers(data.questions.reduce((acc, q) => ({ ...acc, [q.id]: '' }), {}));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTest();
  }, [id]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await submitTest(id, answers);
      navigate('/tests');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!test) {
    return (
      <Box p={3}>
        <Typography>Тест не найден</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>{test.title}</Typography>
      <Typography color="textSecondary" gutterBottom>{test.description}</Typography>

      {test.questions.map((question, index) => (
        <Card key={question.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Вопрос {index + 1}
            </Typography>
            <Typography gutterBottom>{question.text}</Typography>
            
            <FormControl component="fieldset">
              <RadioGroup
                value={answers[question.id]}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              >
                {question.options.map(option => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.text}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      ))}

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Отправка...' : 'Завершить тест'}
        </Button>
      </Box>
    </Box>
  );
} 