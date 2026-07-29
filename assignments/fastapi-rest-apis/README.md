# 📘 Assignment: Building REST APIs with FastAPI

## 🎯 Objective

Build a small REST API with FastAPI that lets clients create, read, update, and delete tasks. You will practice defining request and response models, routing HTTP methods, and returning useful error responses.

## 📝 Tasks

### 🛠️ Define the Task Resource

#### Description
Use the provided starter code to define the data shape for a task and create an endpoint that returns all tasks currently stored by the application.

#### Requirements
Completed program should:

- Define a Pydantic model named `Task` with `id`, `title`, and `completed` fields
- Create a `GET /tasks` endpoint that returns the list of tasks
- Return a JSON array and a `200 OK` response when the endpoint is requested


### 🛠️ Create and Update Tasks

#### Description
Add endpoints that allow a client to add a task and mark an existing task as complete. Test each route from FastAPI's interactive documentation at `/docs`.

#### Requirements
Completed program should:

- Create a `POST /tasks` endpoint that accepts a task title and returns the newly created task
- Assign each new task a unique integer ID
- Create a `PUT /tasks/{task_id}` endpoint that updates the task's `completed` status
- Return the updated task as JSON


### 🛠️ Delete Tasks and Handle Missing IDs

#### Description
Finish the API by adding an endpoint that removes a task. Every route that receives a task ID should respond clearly when the requested task does not exist.

#### Requirements
Completed program should:

- Create a `DELETE /tasks/{task_id}` endpoint that removes the matching task
- Return a `404 Not Found` response with a helpful detail message for an unknown task ID
- Verify the deleted task no longer appears in `GET /tasks`
- Run the application with `uvicorn starter-code:app --reload` and test the routes in `/docs`