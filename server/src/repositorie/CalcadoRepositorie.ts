import { Request, Response } from "express";
import prisma from "@database";



//busca calçados pelo tamanho
export const find_calcados_tamanho = async (req: Request, res: Response) => {
  try {  
    //recebe o tamanho do calçado
    const {tamanho} = req.params;

        //procura o calçado no banco de dados procurando por tamanhos
        const calcados = await prisma.calcado.findMany({
            where: {tamanho: Number(tamanho)}
        })
        
    //print caso não tenha nenhum calçado com esse tamanho
    //se deixar apenas (!calcados) vai retornar []
    if (calcados.length === 0) {
      return res.status(404).json({
        message: "Nenhum calçado com esse tamanho foi encontrado.",
      })
    }

    //retorno da lista de calçados
    return res.status(200).json(calcados)
  } 
  
  //print de erro ao buscar calçados
  catch (error) {
    res.status(400).json({
      message:  "Erro ao buscar calçados",
      error,
    })

  }
}


//procura calçados pela marca
export const find_calcados_marca = async (req: Request, res: Response) => {
  try {  
    //recebe a marca do calçado
    const {marca} = req.params;

        //procura o calçado no banco de dados pela marca
        const calcados = await prisma.calcado.findMany({
            where: {marca: marca}
        })
        
    //print caso não tenha nenhum calçado com essa marca
    //se deixar apenas (!calcados) vai retornar []
    if (calcados.length === 0) {
      return res.status(404).json({
        message: "Nenhum calçado com essa marca foi encontrado.",
      })
    }

    //retorno da lista de calçados
    return res.status(200).json(calcados)
  } 
  
  //print de erro ao buscar calçados
  catch (error) {
    res.status(400).json({
      message:  "Erro ao buscar calçados",
      error,
    })

  }
}


//retorna a quantidade total de calçados em estoque
export const get_all_pairs_calcados = async (req: Request, res: Response) => {
    try {
        //recebe a palavra chave
        const {palavra_chave} = req.params;

        //verifica se a palavra chave é "estoque"
        if (palavra_chave != "estoque") {
            return res.status(400).json({
                message: "Palavra chave incorreta",
            })
        }

        //procura todos os calçados no banco de dados
        const calcados = await prisma.calcado.findMany();

        //contador para a quantidade total de calçados em estoque
        let quantidade_total_calcados_estoque = 0;

        //loop que percorre toda a lista de calçados e soma a quantidade em estoque de cada um
        for (let i = 0; i < calcados.length; i++) {
            quantidade_total_calcados_estoque += calcados[i].quantidade_em_estoque;
        }

        //retorna a quantidade total de pares calçados em estoque
        return res.status(200).json({
            quantidade_total_calcados_estoque,
        })

    }

    //print de erro ao buscar calçados
    catch (error) {
        res.status(400).json({
            message: "Erro ao buscar calçados",
            error,
        })

    } 
    
}