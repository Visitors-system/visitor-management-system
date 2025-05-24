from flask import Flask, request, jsonify
import datetime
import uuid # For generating unique IDs
import random # Added for simulation logic

# --- Constants ---
AVERAGE_SERVICE_TIME_MINUTES = 5 # Average time in minutes to handle one visitor case. Used for wait time estimation.

# --- In-Memory Data Storage ---
# These lists simulate a database for this demonstration.
visitors_list = [] # Stores Visitor objects
case_files_list = [] # Stores CaseFile objects
employees_list = [] # Stores Employee objects
# current_queue_number will be moved to app.current_queue_number
# current_employee_index will be moved to app.current_employee_index

# --- Data Models ---

class Visitor:
    """Represents a visitor in the system."""
    def __init__(self, name, phone_number, reason_for_visit):
        """
        Initializes a new Visitor.
        Args:
            name (str): The visitor's name.
            phone_number (str): The visitor's phone number.
            reason_for_visit (str): The primary reason for the visit.
        """
        self.visitor_id = uuid.uuid4()  # Unique identifier for the visitor
        self.name = name
        self.phone_number = phone_number
        self.reason_for_visit = reason_for_visit
        self.queue_number = None  # Assigned when the visitor joins the queue
        self.case_file_id = None  # Link to the associated CaseFile
        self.arrival_time = datetime.datetime.now()  # Timestamp of visitor's arrival
        self.status = "Waiting"  # Current status: e.g., Waiting, CaseLogged, InProgress, Completed

class CaseFile:
    """Represents a case file associated with a visitor's request."""
    def __init__(self, visitor_name, request_type, visitor_id):
        """
        Initializes a new CaseFile.
        Args:
            visitor_name (str): The name of the visitor.
            request_type (str): The type of request or reason for visit.
            visitor_id (uuid.UUID): The ID of the visitor this case file belongs to.
        """
        self.case_id = uuid.uuid4()  # Unique identifier for the case file
        self.visitor_name = visitor_name
        self.visitor_id = visitor_id # Link to the Visitor object
        self.request_type = request_type
        self.status = "Pending"  # Current status: e.g., Pending, Active, Resolved, Closed
        self.assigned_employee_id = None  # ID of the employee assigned to this case (e.g., "EMP001")
        self.creation_time = datetime.datetime.now()  # Timestamp of case file creation
        self.updates = []  # List of tuples: (timestamp, update_message, employee_id)
        self.effort_required = random.randint(1, 5)  # Simulates varying task complexity (units of work)
        self.effort_applied = 0  # Units of work applied so far

    def add_update(self, message, employee_id):
        """
        Adds an update to the case file's history.
        Args:
            message (str): The update message.
            employee_id (str): The ID of the employee making the update (or "SYSTEM").
        """
        self.updates.append((datetime.datetime.now(), message, employee_id))

class Employee:
    """Represents an employee who handles visitor cases."""
    def __init__(self, employee_id, name, role="Service Agent"):
        """
        Initializes a new Employee.
        Args:
            employee_id (str): The unique identifier for the employee (e.g., "EMP001").
            name (str): The employee's name.
            role (str, optional): The employee's role. Defaults to "Service Agent".
        """
        self.employee_id = employee_id # Example: "EMP001"
        self.name = name
        self.role = role
        self.current_tasks = []  # List of case_ids (UUIDs) they are currently working on

    def assign_task(self, case_id):
        """Adds a case_id to the employee's current task list."""
        if case_id not in self.current_tasks:
            self.current_tasks.append(case_id)

    def complete_task(self, case_id):
        """Removes a case_id from the employee's current task list."""
        if case_id in self.current_tasks:
            self.current_tasks.remove(case_id)

# --- Pre-populate with Dummy Data ---
# These are example employees for simulation purposes.
employees_list.append(Employee(employee_id="EMP001", name="Alice Wonderland (Example)"))
employees_list.append(Employee(employee_id="EMP002", name="Bob The Builder (Example)"))
employees_list.append(Employee(employee_id="EMP003", name="Charlie Chaplin (Example)"))

# --- Helper Functions ---

def estimate_waiting_time(current_queue_length_before_visitor):
    """
    Estimates the waiting time based on the number of people already in the queue
    and the average service time.
    Args:
        current_queue_length_before_visitor (int): Number of visitors ahead in the queue.
    Returns:
        int: Estimated waiting time in minutes.
    """
    if current_queue_length_before_visitor < 0: # Safety check, should not be negative
        current_queue_length_before_visitor = 0
    return current_queue_length_before_visitor * AVERAGE_SERVICE_TIME_MINUTES

# --- Flask Application Setup ---
app = Flask(__name__)
# Application context variables for managing queue and employee assignment sequence
app.current_queue_number = 0  # Counter for assigning queue numbers
app.current_employee_index = 0 # Index for round-robin employee assignment

# --- API Endpoints ---

@app.route('/')
def hello():
    """Route to check if the backend is running."""
    return "Backend for Integrated Smart Visitor Management System is running!"

@app.route('/visit/new', methods=['POST'])
def new_visitor():
    """
    Registers a new visitor, assigns a queue number, creates a case file,
    and assigns it to an employee in a round-robin fashion.
    Expected JSON payload:
    {
        "name": "string",
        "phone_number": "string",
        "reason_for_visit": "string"
    }
    Returns:
        JSON: Details of the new visitor, queue number, case ID, estimated wait time, etc.
    """
    data = request.get_json()

    # Validate input
    if not data or not all(k in data for k in ('name', 'phone_number', 'reason_for_visit')):
        return jsonify({"error": "Missing data. Please provide name, phone_number, and reason_for_visit."}), 400

    name = data['name']
    phone_number = data['phone_number']
    reason_for_visit = data['reason_for_visit']

    # Create Visitor object
    visitor = Visitor(name=name, phone_number=phone_number, reason_for_visit=reason_for_visit)
    
    # Estimate waiting time based on current queue length
    people_ahead = len(visitors_list) # Number of visitors already in the system (implies they are in queue)
    estimated_wait = estimate_waiting_time(people_ahead)

    # Assign queue number
    app.current_queue_number += 1
    visitor.queue_number = app.current_queue_number
    
    visitors_list.append(visitor) # Add to our in-memory list

    # --- Case File Creation ---
    case_file = CaseFile(
        visitor_name=visitor.name,
        request_type=visitor.reason_for_visit,
        visitor_id=visitor.visitor_id
    )

    # Assign employee using round-robin
    assigned_emp_id = None
    if employees_list: # Check if there are any employees
        employee_to_assign = employees_list[app.current_employee_index % len(employees_list)]
        case_file.assigned_employee_id = employee_to_assign.employee_id
        case_file.add_update(
            f"Case created and assigned to {employee_to_assign.name} ({employee_to_assign.employee_id}).", 
            employee_to_assign.employee_id
        )
        employee_to_assign.assign_task(case_file.case_id) # Add task to employee's list
        app.current_employee_index += 1 # Increment for next assignment
        assigned_emp_id = employee_to_assign.employee_id
    else:
        # Handle case where no employees are available
        case_file.add_update("Case created, no employees available for assignment at this time.", "SYSTEM")
        # assigned_emp_id remains None

    case_files_list.append(case_file) # Add to our in-memory list
    visitor.case_file_id = case_file.case_id # Link visitor to the case file
    visitor.status = "CaseLogged" # Update visitor status

    # greeting_employee_id is a placeholder for an initial system interaction or general reception.
    # For this simulation, it's a fixed system ID.
    greeting_employee_id = "SYS_GREET_001" # Simulated system/employee ID for greeting step

    # Prepare response
    return jsonify({
        "message": f"Welcome, {visitor.name}! You are number {visitor.queue_number} in the queue. Your case file has been created.",
        "visitor_id": str(visitor.visitor_id),
        "queue_number": visitor.queue_number,
        "case_id": str(visitor.case_file_id),
        "estimated_wait_time_minutes": estimated_wait,
        "status": visitor.status, 
        "arrival_time": visitor.arrival_time.isoformat(),
        "responsible_employee_id": greeting_employee_id, # Initial contact point
        "case_assigned_employee_id": assigned_emp_id # Actual employee handling the case
    }), 201

@app.route('/visit/status/<string:identifier>', methods=['GET'])
def get_visitor_status(identifier):
    """
    Retrieves the status of a visitor's request and case file.
    The identifier can be either a visitor_id or a case_id.
    Returns:
        JSON: Detailed information about the visitor's case, including status,
              updates, assigned employee, etc. Or a 404 if not found.
    """
    found_visitor = None
    found_case_file = None

    # Attempt to find by visitor_id
    try:
        visitor_uuid = uuid.UUID(identifier) # Validate if identifier could be a UUID
        for v in visitors_list:
            if v.visitor_id == visitor_uuid:
                found_visitor = v
                break
    except ValueError:
        # Identifier is not a valid UUID, so it can't be a visitor_id from our system.
        # It might be a case_id (which is also UUID) or an invalid identifier.
        pass 
    
    if found_visitor:
        # If visitor found, try to find their associated case file
        if found_visitor.case_file_id:
            for cf in case_files_list:
                if cf.case_id == found_visitor.case_file_id:
                    found_case_file = cf
                    break
    else:
        # If not found by visitor_id, try to find by case_id
        try:
            case_uuid = uuid.UUID(identifier) # Validate if identifier could be a UUID
            for cf in case_files_list:
                if cf.case_id == case_uuid:
                    found_case_file = cf
                    # Now find the visitor associated with this case
                    for v_user in visitors_list:
                        if v_user.visitor_id == found_case_file.visitor_id:
                            found_visitor = v_user
                            break
                    break # Exit case_files_list loop once case is found
        except ValueError:
            # Identifier is not a valid UUID.
            return jsonify({"error": "Invalid identifier format."}), 400


    if found_visitor and found_case_file:
        # Format updates for JSON serialization (datetime to ISO string)
        formatted_updates = []
        for ts, msg, emp_id in found_case_file.updates:
            formatted_updates.append({
                "timestamp": ts.isoformat(),
                "message": msg,
                "employee_id": emp_id # Could be an employee ID like "EMP001" or "SYSTEM"
            })

        return jsonify({
            "visitor_id": str(found_visitor.visitor_id),
            "visitor_name": found_visitor.name,
            "queue_number": found_visitor.queue_number,
            "visitor_status": found_visitor.status,
            "case_id": str(found_case_file.case_id),
            "case_status": found_case_file.status,
            "request_type": found_case_file.request_type,
            "assigned_employee_id": found_case_file.assigned_employee_id, # Employee handling the case
            "responsible_employee_id": found_case_file.assigned_employee_id, # Alias for clarity
            "case_creation_time": found_case_file.creation_time.isoformat(),
            "updates": formatted_updates
        }), 200
    else:
        return jsonify({"error": "Visitor or Case not found with the provided identifier."}), 404

@app.route('/admin/report', methods=['GET'])
def admin_report():
    """
    Generates a system-wide administrative report.
    Returns:
        JSON: Includes total visitors, currently waiting visitors,
              average current waiting time, and employee performance summary.
    """
    total_visitors = len(visitors_list)
    
    # Calculate average current waiting time for those still in 'Waiting' or 'CaseLogged' status
    total_wait_time_seconds = 0
    waiting_visitors_count = 0
    now = datetime.datetime.now()

    for visitor in visitors_list:
        if visitor.status in ["Waiting", "CaseLogged"]: # Actively waiting or case just logged
            wait_duration = now - visitor.arrival_time
            total_wait_time_seconds += wait_duration.total_seconds()
            waiting_visitors_count += 1
    
    average_current_waiting_time_minutes = 0
    if waiting_visitors_count > 0:
        average_current_waiting_time_minutes = (total_wait_time_seconds / waiting_visitors_count) / 60

    # Gather employee performance data (current caseload)
    employee_performance = []
    for emp in employees_list:
        employee_performance.append({
            "employee_id": emp.employee_id,
            "name": emp.name,
            "role": emp.role,
            "assigned_cases_count": len(emp.current_tasks), # Number of cases currently assigned
            "assigned_case_ids": [str(case_id) for case_id in emp.current_tasks] # Specific case IDs
        })

    return jsonify({
        "report_generated_time": now.isoformat(),
        "total_visitors_registered": total_visitors,
        "currently_waiting_or_logged_visitors": waiting_visitors_count,
        "average_current_waiting_time_minutes": round(average_current_waiting_time_minutes, 2),
        "employee_performance_summary": employee_performance
    }), 200

@app.route('/simulation/tick', methods=['GET'])
def simulation_tick():
    """
    Advances the simulation by one time unit (a "tick").
    This processes active cases, applies effort, and resolves them if effort matches required.
    Returns:
        JSON: Summary of actions performed during this tick.
    """
    processed_cases_this_tick = 0 # Number of active cases that received work
    resolved_cases_this_tick = 0
    now = datetime.datetime.now() # Timestamp for this simulation tick

    # Phase 1: Transition 'Pending' cases with an assigned employee to 'Active'
    for case_file in case_files_list:
        if case_file.status == "Pending" and case_file.assigned_employee_id:
            case_file.status = "Active"
            case_file.add_update(
                f"Case processing started by {case_file.assigned_employee_id}.", 
                case_file.assigned_employee_id
            )

    # Phase 2: Process 'Active' cases
    for case_file in case_files_list:
        if case_file.status == "Active" and case_file.assigned_employee_id:
            processed_cases_this_tick += 1
            case_file.effort_applied += 1 # Apply one unit of work
            
            # Optional: Add a verbose update for each unit of work
            # case_file.add_update(
            #     f"Work unit applied by {case_file.assigned_employee_id}. Total effort: {case_file.effort_applied}/{case_file.effort_required}", 
            #     case_file.assigned_employee_id
            # )

            if case_file.effort_applied >= case_file.effort_required:
                resolved_cases_this_tick += 1
                original_employee_id = case_file.assigned_employee_id # Store before possibly clearing
                case_file.status = "Resolved"
                case_file.add_update(f"Case resolved by {original_employee_id}.", original_employee_id)
                
                # Update the status of the corresponding visitor
                for v in visitors_list:
                    if v.visitor_id == case_file.visitor_id:
                        v.status = "Completed"
                        break
                
                # Unassign the case from the employee
                for emp in employees_list:
                    if emp.employee_id == original_employee_id:
                        emp.complete_task(case_file.case_id)
                        break
                # case_file.assigned_employee_id = None # Optionally clear if employee is now free for this specific case slot

    return jsonify({
        "message": "Simulation ticked.",
        "active_cases_processed_this_tick": processed_cases_this_tick,
        "cases_resolved_this_tick": resolved_cases_this_tick,
        "timestamp": now.isoformat()
    }), 200

# --- Main Execution Guard ---
if __name__ == '__main__':
    # Note: `debug=True` is for development and should be False in production.
    app.run(debug=True)
