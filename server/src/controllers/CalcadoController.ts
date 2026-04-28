import { Request, Response } from "express";
import prisma from "@database";

//funcoes para a categoria de calçados


//criar calçados
export const create_calcado = async (req: Request, res: Response) => {
  try {
    //espera a entrada de todas as categorias para criar um calçado
    const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } =
      req.body;

    //print caso não tenha todas as entradas necessárias
    if (!nome_produto || !cor || !marca || !tamanho || !preco || !quantidade_em_estoque) {
      return res.status(404).json({
        message:
          "Preencha todas as informações obrigatórias para criar um calcado.",
      });
    }

    //insere o novo calçado no banco de dados
    const calcado = await prisma.calcado.create({
      data: 
      {
        nome_produto,
        cor,
        marca,
        tamanho,
        preco,
        quantidade_em_estoque,
      },
    });

    //print de sucesso
    return res.status(200).json({
      message: "Calçado criado com sucesso",
    });
  } 
  
  //print em caso de erro na criação do calçado
  catch (error){
    return res.status(400).json({
      message: "Erro ao buscar calçados",
      error,
    });
  }
};


//ler todos os calçados
export const readallcalcados = async (req: Request, res: Response) => {
  try {  
    const calcados = await prisma.calcado.findMany();

    //print caso não tenha nenhum calçado
    //se deixar apenas (!calcados) vai retornar []
    if (calcados.length === 0) {
      return res.status(404).json({
        message: "Nenhum calçado criado ainda.",
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

//atualizar calçados
export const update_calcado = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;

        //caso o id não exista
        if (!id){
            return res.status(404).json({
                message: "Calçado não encontrado",
            })
        }

        //entrada de novas características do calçado
        const {nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque} = req.body;

        //atualiza o banco de dados
        const calcado = await prisma.calcado.update({
            data: {
                nome_produto,
                cor,
                marca,
                tamanho,
                preco,
                quantidade_em_estoque,
            },
            where: {
                id: Number(id),
            }
        })
        return res.status(200).json({})


    }
    
    //print de erro 
    catch (error) {
        return res.status(400).json({
            message: "Erro ao atualizar calçado",
            error,
        })
    }
}


//deletar calçados do banco de dados
export const delete_calcado = async (req: Request, res: Response) => {
    try{
        //recebe o id
        const {id} = req.params;

        //caso o id não exista
        if (!id){
            return res.status(404).json({
                message: "Calçado não encontrado",
            })
        }

        //apaga o calçado do banco de dados
        const calcado = await prisma.calcado.delete({
            where: {
                id: Number(id),
            }
        })

        //print de sucesso
        return res.status(200).json({
            message: "Calçado deletado com sucesso",
        })
    }
    
    //print de erro
    catch (error) {

        return res.status(400).json({
            message: "Erro ao deletar calçado",
        })
    }
}

//busca um calçado por id
export const getbyid_calcado = async (req: Request, res: Response) => {
    try{

        //recebe o id
        const {id} = req.params;

        //procura o calçado no banco de dados
        const calcado = await prisma.calcado.findUnique({
            where: {id: Number(id)}
        })
        
        //caso o calçado não exista
        if (!calcado){
            return res.status(404).json({
                message: "Calçado não encontrado",
            })
        }

        //retorna as características do calçado
        return res.status(200).json(calcado)
        
    } 
    
    //print de erro
    catch (error) {
      
        return res.status(400).json({
            message: "Erro ao procurar calçado",
            error,
        })
    }
}