# Integrated Smart Visitor Management System - Backend

This directory contains the Python Flask backend for the Integrated Smart Visitor Management System.
It simulates visitor registration, queue management, case file creation, status updates, and admin reporting.

## Setup and Running

### Prerequisites
- Python 3.7+

### Installation
1. Navigate to the `backend` directory.
2. It's recommended to create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Development Server
Once dependencies are installed, you can run the Flask development server from within the `backend` directory:
```bash
python app.py
```
The backend will typically be available at `http://127.0.0.1:5000/`.

## API Endpoints

The following API endpoints are available:

- **`GET /`**
  - Description: Returns a welcome message indicating the backend is running.
  - Response: Simple string.

- **`POST /visit/new`**
  - Description: Registers a new visitor, assigns a queue number, estimates wait time, and creates a case file.
  - Request Body (JSON):
    ```json
    {
      "name": "string",
      "phone_number": "string",
      "reason_for_visit": "string"
    }
    ```
  - Response (JSON): Details of the new visitor, queue number, case ID, estimated wait time, etc.

- **`GET /visit/status/<identifier>`**
  - Description: Retrieves the status of a visitor's request. The `identifier` can be the `visitor_id` or `case_id`.
  - Response (JSON): Detailed information about the visitor's case, including status, updates, and assigned employee.

- **`GET /admin/report`**
  - Description: Generates a system report for administrators.
  - Response (JSON): Includes total visitors, average current waiting time, and employee performance summary (caseloads).

- **`GET /simulation/tick`**
  - Description: Advances the simulation by one step. This processes active cases, applies effort, and resolves cases when enough effort is applied. Useful for observing the system dynamics.
  - Response (JSON): Summary of actions taken during the simulation tick.
