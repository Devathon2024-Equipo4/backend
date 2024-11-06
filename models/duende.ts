import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllElves = async (req: Request, res: Response) => {
  try {
    const elves = await prisma.elf.findMany();
    res.json(elves);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los duendes' });
  }
};

export const getHiredElves = async (req: Request, res: Response) => {
  try {
    const hiredElves = await prisma.elf.findMany({ where: { hired: true } });
    res.json(hiredElves);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los duendes contratados' });
  }
};

export const getFiredElves = async (req: Request, res: Response) => {
  try {
    const firedElves = await prisma.elf.findMany({ where: { hired: false } });
    res.json(firedElves);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los duendes despedidos' });
  }
};

export const hireElf = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newElf = await prisma.elf.create({
      data: { name, hired: true }
    });
    res.status(201).json(newElf);
  } catch (error) {
    res.status(500).json({ error: 'Error al contratar al duende' });
  }
};

export const fireElf = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedElf = await prisma.elf.update({
      where: { id: Number(id) },
      data: { hired: false }
    });
    res.json(updatedElf);
  } catch (error) {
    res.status(500).json({ error: 'Error al despedir al duende' });
  }
};  