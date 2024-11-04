export const findUnique = async <T, U>(
    model: {
      findUnique: (args: {
        where: U
        include?: Record<string, unknown>
      }) => Promise<T | null>
    },
    where: U,
    include?: Record<string, unknown>
  ): Promise<T | null> => {
    return await model.findUnique({
      where,
      include: include || undefined
    })
  }

export const updateById = async <T, U>(
    model: {
      update: (args: { data: T; where: { id: string } }) => Promise<U>
    },
    data: T,
    id: string
  ): Promise<U> => {
    return await model.update({
      data,
      where: { id }
    })
  }