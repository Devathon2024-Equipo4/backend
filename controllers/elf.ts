// Importamos el tipo `Status` del cliente de Prisma
import { type Request, type Response, type NextFunction } from "express"
import { type CreateElfType, type UpdateElfType, ElfModelStatic } from "../models/elf"
import { Status } from "@prisma/client" // Esto importará el enum Status

export class ElfController {
  private elfModel: ElfModelStatic
  constructor(elfModel: ElfModelStatic) {
    this.elfModel = elfModel
  }

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction)
    : Promise<any> => {
    try {
      const elves = await this.elfModel.getAll()
      res.status(200).json({ elves: elves })
    } catch (error) {
      res.status(500).json({ error: "Error retrieving elves" })
      next(error)
    }
  }

  getByName = async (
    req: Request,
    res: Response,
    next: NextFunction)
    : Promise<any> => {
    try {
      const name = req.params["name"]
      if (!name) {
        return res.status(400).json({ error: "Name parameter is required" })
      }

      const elf = await this.elfModel.getByName(name)
      if (!elf) {
        return res.status(404).json({ error: "Elf not found" })
      }

      res.status(200).json({ elf: elf })
    } catch (error) {
      res.status(500).json({ error: "Error retrieving elf" })
      next(error)
    }
  }

  getByStatus = async (
    req: Request,
    res: Response,
    next: NextFunction)
    : Promise<any> => {
    try {
      const statusParam = req.params["status"] as string

      // Validamos si el parámetro coincide con un valor del enum Status
      if (statusParam !== "HIRED" && statusParam !== "FIRED") {
        return res.status(400).json({ error: "Invalid status parameter" })
      }

      // Convertimos el parámetro a tipo Status
      const status = statusParam as Status

      const elves = await this.elfModel.getByStatus(status)
      if (elves.length === 0) {
        return res
          .status(404)
          .json({ error: "No elves found with this status" })
      }

      res.status(200).json({ elves: elves })
    } catch (error) {
      res.status(500).json({ error: "Error retrieving elves by status" })
      next(error)
    }
  }

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<any> => {
    try {
      const elf = req.body
      if (!elf || !elf.name || !elf.status || !elf.age || !elf.gender) {
        return res
          .status(400)
          .json({ error: "Elf data (name, status, age, gender) is required" })
      }

      // Validamos que el status sea válido
      if (elf.status !== "HIRED" && elf.status !== "FIRED") {
        return res
          .status(400)
          .json({ error: 'Invalid status. Use "HIRED" or "FIRED"' })
      }

      const data: CreateElfType = {
        name: elf.name,
        status: elf.status,
        age: elf.age,
        gender: elf.gender
      }

      const createdElf = await this.elfModel.create(data)
      res.status(201).json({ elf: createdElf })
    } catch (error) {
      res.status(500).json({ error: "Error creating elf" })
      next(error)
    }
  }

  update = async (
    req: Request,
    res: Response,
    next: NextFunction)
    : Promise<any> => {
    try {
      const id = req.params.id
      const elfData = req.body

      if (!id) {
        return res.status(404).json({ error: "Id parameter is required" })
      }

      if (!elfData) {
        return res.status(400).json({ error: "Elf data is required" })
      }

      const data: UpdateElfType = {
        status: elfData.status
      }

      const updatedElf = await this.elfModel.update(id, data)
      res.status(200).json({ elf: updatedElf })
    } catch (error) {
      res.status(500).json({ error: "Error updating elf" })
      next(error)
    }
  }
}
