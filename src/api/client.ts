import { ITask } from '../types/types';

function initStorage() {
    function generateRandomDate(start: Date, end: Date): Date {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    const statusOptions: string[] = ['Pending', 'In Progress', 'Completed', 'On Hold'];
    const priorityOptions: string[] = ['High', 'Medium', 'Low'];
    const generateRandomTask = () => {
        const taskNumber = Math.floor(Math.random() * 1000);
        return `Task ${taskNumber}`;
    };
    const generateRandomID = () => {
        const idNumber = String(Math.floor(Math.random() * 1000));
        return `ID-${idNumber}`;
    };
    const db: Array<ITask> = [];
    for (let i = 1; i <= 20; i += 1) {
        const id = generateRandomID();
        const task = generateRandomTask();
        const createdDate = generateRandomDate(new Date(2023, 0, 1), new Date());
        const changeDate = generateRandomDate(createdDate, new Date());
        const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
        const priority = priorityOptions[Math.floor(Math.random() * priorityOptions.length)];
        const dataObject: ITask = {
            id,
            task,
            createdDate,
            changeDate,
            status,
            completed: false,
            priority,
        };
        db.push(dataObject);
    }
    function getAllTasks(): Array<ITask> {
        return db ?? [];
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

    return {
        changeTask,
        getTaskById,
        getAllTasks,
    };
}

export default initStorage();
