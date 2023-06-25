const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 3000; 

app.use(express.json());

// GET all sleep records
app.get('/api/sleep', async (req, res) => {
  try {
    const sleep = await prisma.sleep.findMany();
    res.json(sleep);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST a new sleep record
app.post('/api/sleep', async (req, res) => {
  const { bedtime, wakeup, rating, comment } = req.body;

  try {
    const sleep = await prisma.sleep.create({
      data: {
        bedtime,
        wakeup,
        rating,
        comment,
      },
    });
    res.json(sleep);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// DELETE a sleep record
app.delete('/api/sleep/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.sleep.delete({
      where: { id: parseInt(id) },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


