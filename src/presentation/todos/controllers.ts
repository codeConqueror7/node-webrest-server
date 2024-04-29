import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo';

let todos = [
    { id: 1, text: 'Consequat non adipisicing sint dolore culpa veniam.', completedAt: new Date() },
    { id: 2, text: 'Consequat non adipisicing sint dolore culpa veniam.', completedAt: null },
    { id: 3, text: 'Consequat non adipisicing sint dolore culpa veniam.', completedAt: new Date() },
]

export class TodosController {

    constructor() {

    }

    public getTodos = async (req: Request, res: Response) => {

        const getTodos = await prisma.todo.findMany()
        return res.json(getTodos)
    }

    public getTodoById = async (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `ID argument is not a number` })


        const getTodo = await prisma.todo.findMany({
            where: {
                id: id
            }
        })

        if (!getTodo) return res.status(404).json({
            ok: false,
            msg: `Todo with id ${id} not found`
        })

        res.json(getTodo)
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const newTodo = await prisma.todo.create({
            data: createTodoDto!
        })

        res.json(newTodo)
    }

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body,
            id
        })
        if (error) return res.status(400).json({ error })

        const todo = await prisma.todo.findFirst({ where: { id } });

        if (!todo) return res.status(404).json({ msg: `Todo with id ${id} not found` })

        const updateTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: updateTodoDto!.value
        })

        res.json(updateTodo);
    }

    public deleteTodo = async (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({
            ok: false,
            msg: "ID argument is not a number"
        })

        // const todo = todos.find(todo => todo.id === id)
        // if (!todo) return res.status(404).json({
        //     ok: false,
        //     msg: `El todo con el id: ${id} no existe`
        // })
        // todos = todos.filter(todo => todo.id !== id);
        // res.json({
        //     ok: true,
        //     msg: `Todo con el id: ${id} eliminado`,
        // })
        // todos.splice(todos.indexOf(todo), 1);
        // res.json(todo)

        const deleteTodo = await prisma.todo.delete({
            where: {
                id: id
            }
        });

        res.json(deleteTodo);
    }
}