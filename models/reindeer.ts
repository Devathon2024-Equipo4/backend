import { PrismaClient, Reindeer } from '@prisma/client';
import {  findUnique, updateById } from '../utils/models';

export type CreateReindeerType = Pick<
  Reindeer,
  | "name"
  | "alignment"
>
export type UpdateReindeerType = Partial<Reindeer>

const prisma = new PrismaClient();

export default class ReindeerModel {
    static getAll = async () => await prisma.reindeer.findMany();
    static getById = async (id: string) => await prisma.reindeer.findUnique({ where: { id } });
    static create = async (data: CreateReindeerType) => await prisma.reindeer.create({ data});
    static update = async (data: UpdateReindeerType) => await updateById(prisma.reindeer,data,data.id as string ) 
}