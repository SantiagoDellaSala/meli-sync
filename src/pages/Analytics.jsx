import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getAnalyticsData } from '../services/analyticsService';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAnalyticsData();
        setData(result);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError('Debes iniciar sesión para ver tus analíticas.');
        } else {
          setError('Error al cargar las analíticas. Intenta más tarde.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="info" />
        <p className="mt-2">Cargando analíticas...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <Alert variant="danger" className="fw-semibold">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="fw-bold text-center mb-4" style={{ color: '#007096ff' }}>
        Panel de Analíticas
      </h2>

      {/* Tarjetas */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card
            className="shadow-sm border-0 text-center p-3"
            style={{ background: 'linear-gradient(135deg, #3ab0ff, #6fffe9)' }}
          >
            <h5 className="text-white fw-semibold">Ventas</h5>
            <h2 className="text-white fw-bold">{data.ventas.toLocaleString()}</h2>
            <p className="text-white-50">Últimos 7 días</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="shadow-sm border-0 text-center p-3"
            style={{ background: 'linear-gradient(135deg, #6fffe9, #3ab0ff)' }}
          >
            <h5 className="text-white fw-semibold">Conversiones</h5>
            <h2 className="text-white fw-bold">{data.conversiones}%</h2>
            <p className="text-white-50">Tasa de conversión</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="shadow-sm border-0 text-center p-3"
            style={{ background: 'linear-gradient(135deg, #3ab0ff, #6fffe9)' }}
          >
            <h5 className="text-white fw-semibold">Visitas</h5>
            <h2 className="text-white fw-bold">{data.visitas.toLocaleString()}</h2>
            <p className="text-white-50">Totales de la semana</p>
          </Card>
        </Col>
      </Row>

      {/* Gráfico */}
      <Card className="shadow-sm border-0 p-4">
        <h5 className="fw-semibold mb-3" style={{ color: '#0077b6' }}>
          Ventas semanales
        </h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.grafico}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#0077b6" />
            <YAxis stroke="#0077b6" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="ventas"
              stroke="#3ab0ff"
              strokeWidth={3}
              activeDot={{ r: 8, fill: '#6fffe9' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Container>
  );
};

export default Analytics;
