import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Validación básica (luego se reemplaza por backend)
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    // Simulación de login exitoso
    console.log('Login con:', email, password);
    setError('');
    navigate('/analytics'); // redirige al dashboard
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4" style={{ color: '#0096c7' }}>Iniciar Sesión</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{
              background: 'linear-gradient(135deg, #3ab0ff, #6fffe9)',
              border: 'none',
            }}
          >
            Iniciar Sesión
          </Button>
        </Form>

        <p className="mt-3 text-center">
          ¿No tienes cuenta? <Link to="/register">Registrate aquí</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
