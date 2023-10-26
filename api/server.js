const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const client = require('./config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).send({ message: 'No token provided.' });

  jwt.verify(token, 'secreto', (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', [username, email, hashedPassword]);
    //res.json({ success: true, userId: result.rows[0].id });
    const token = jwt.sign({ id: result.rows[0].id }, 'secreto', { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    
    res.status(500).json({ success: false, message: 'Erro ao registrar.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Consulta o usuário com base no e-mail fornecido
    const result = await client.query('SELECT id, password FROM users WHERE email = $1', [email]);

    const user = result.rows[0];

    if (!user) {
      // Se nenhum usuário for encontrado
      return res.status(400).json({ success: false, message: 'E-mail ou senha estão incorretos.' });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Se a senha não for válida
      return res.status(400).json({ success: false, message: 'E-mail ou senha estão incorretos.' });
    }

    
    const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });

    res.json({ success: true, token });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ success: false, message: 'Erro ao fazer login. Tente novamente mais tarde.' });
  }
});