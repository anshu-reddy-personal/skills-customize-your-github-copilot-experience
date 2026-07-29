from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


app = FastAPI(title="Task API")


class Task(BaseModel):
    id: int
    title: str
    completed: bool = False


class TaskCreate(BaseModel):
    title: str


class TaskUpdate(BaseModel):
    completed: bool


tasks: list[Task] = []
next_task_id = 1


@app.get("/tasks", response_model=list[Task])
def get_tasks() -> list[Task]:
    # Task 1: Return the current list of tasks.
    pass


@app.post("/tasks", response_model=Task, status_code=201)
def create_task(task_data: TaskCreate) -> Task:
    # Task 2: Create a Task, add it to tasks, and return it.
    pass


@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_data: TaskUpdate) -> Task:
    # Task 2: Update the matching task, or raise HTTPException(status_code=404).
    pass


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int) -> None:
    # Task 3: Remove the matching task, or raise HTTPException(status_code=404).
    pass