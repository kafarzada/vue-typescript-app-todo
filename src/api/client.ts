import { ITask, Status, Priority } from '../types/types';

function initStorage() {
    let db: Array<ITask> = [
        {
            id: '1',
            task: 'task 1',
            completed: false,
            createdDate: Date.now(),
            priority: 'High',
            status: 'On Hold',
        },
        {
            id: '2',
            task: 'task 2',
            completed: false,
            createdDate: Date.now(),
            priority: 'Low',
            status: 'In Progress',
        },
    ];
    function getAllTasks(): Array<Array<ITask>> {
        return [
            [...db.filter((task) => task.status === 'Completed')],
            [...db.filter((task) => task.status === 'In Progress')],
            [...db.filter((task) => task.status === 'On Hold')],
        ];
    }
    function getTaskById(id: string): ITask {
        const findTask = db.find((task) => task.task === id);
        if (findTask) {
            return findTask;
        }
        throw Error('Task not found');
    }
    function changeTask(id: string, text: string): ITask {
        const task: ITask | undefined = db.find((item) => item.id === id);
        if (task) {
            task.task = text;
            return task;
        }
        throw Error('Error: Нет такой задачи');
    }

    function forwardTask(taskId: string, list: Status): ITask[][] {
        let result;
        db = db.map((task) => {
            if (task.id === taskId) {
                task.status = list;

                if (list === 'Completed') {
                    task.completed = true;
                    task.compeletedDate = Date.now();
                }
                result = task;
            }

            return task;
        });

        if (result) {
            return [
                [...db.filter((task) => task.status === 'Completed')],
                [...db.filter((task) => task.status === 'In Progress')],
                [...db.filter((task) => task.status === 'On Hold')],
            ];
        }
        throw Error('Задача не найдена');
    }

    function createNewTask(newObj: { task: string, priority: Priority }) {
        const newTask: ITask = {
            id: String(Math.random()),
            task: newObj.task,
            completed: false,
            priority: newObj.priority,
            status: 'On Hold',
            createdDate: Date.now(),
        };

        db.push(newTask);
        return newTask;
    }

    return {
        changeTask,
        getTaskById,
        getAllTasks,
        forwardTask,
        createNewTask,
    };
}

export default initStorage();
