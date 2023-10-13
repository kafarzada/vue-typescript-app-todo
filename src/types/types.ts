export type Status = 'On Hold' | 'In Progress' | 'Pending' | 'Completed'
export type Priority = 'Low' | 'Medium' | 'High'

export interface ITask {
    id: string,
    task: string,
    completed: boolean,
    createdDate: number,
    compeletedDate?: number,
    changeDate?: number,
    status: Status,
    priority: Priority,
}
