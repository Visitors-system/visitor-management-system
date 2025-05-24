import unittest
import json
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__))))

from app import app, visitors_list, case_files_list, employees_list, Employee

class AppTestCase(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()
        visitors_list.clear()
        case_files_list.clear()
        employees_list.clear()
        employees_list.append(Employee(employee_id="EMP001", name="Alice Test"))
        employees_list.append(Employee(employee_id="EMP002", name="Bob Test"))
        employees_list.append(Employee(employee_id="EMP003", name="Charlie Test"))
        app.current_queue_number = 0
        app.current_employee_index = 0

    def tearDown(self):
        visitors_list.clear()
        case_files_list.clear()
        employees_list.clear()
        app.current_queue_number = 0
        app.current_employee_index = 0

    def test_01_hello(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Backend for Integrated Smart Visitor Management System is running!", response.data)

    def test_02_new_visitor_success(self):
        payload = {"name": "Test Visitor", "phone_number": "1234567890", "reason_for_visit": "Testing"}
        response = self.client.post('/visit/new', json=payload)
        self.assertEqual(response.status_code, 201, msg=f"Response data: {response.get_data(as_text=True)}")
        data = response.get_json()
        self.assertEqual(data['message'], "Welcome, Test Visitor! You are number 1 in the queue. Your case file has been created.")
        self.assertIn('visitor_id', data)
        self.assertEqual(data['queue_number'], 1)
        self.assertIn('case_id', data)
        self.assertEqual(len(visitors_list), 1)
        self.assertEqual(visitors_list[0].name, "Test Visitor")
        self.assertEqual(len(case_files_list), 1)
        self.assertEqual(case_files_list[0].visitor_name, "Test Visitor")
        self.assertEqual(app.current_queue_number, 1)

    def test_03_new_visitor_missing_data(self):
        payload = {"name": "Test Visitor"} 
        response = self.client.post('/visit/new', json=payload)
        self.assertEqual(response.status_code, 400, msg=f"Response data: {response.get_data(as_text=True)}")
        data = response.get_json()
        self.assertIn("Missing data", data['error'])

    def test_04_get_visitor_status_by_visitor_id(self):
        app.current_queue_number = 0 
        payload = {"name": "Status Visitor", "phone_number": "0987654321", "reason_for_visit": "Status Check"}
        post_response = self.client.post('/visit/new', json=payload)
        self.assertEqual(post_response.status_code, 201, msg=f"Response data: {post_response.get_data(as_text=True)}")
        visitor_data = post_response.get_json()
        visitor_id = visitor_data['visitor_id']
        status_response = self.client.get(f'/visit/status/{visitor_id}')
        self.assertEqual(status_response.status_code, 200, msg=f"Response data: {status_response.get_data(as_text=True)}")
        status_data = status_response.get_json()
        self.assertEqual(status_data['visitor_name'], "Status Visitor")
        self.assertEqual(status_data['case_id'], visitor_data['case_id'])

    def test_05_get_visitor_status_by_case_id(self):
        app.current_queue_number = 0 
        payload = {"name": "Case Status Visitor", "phone_number": "1122334455", "reason_for_visit": "Case Status Check"}
        post_response = self.client.post('/visit/new', json=payload)
        self.assertEqual(post_response.status_code, 201, msg=f"Response data: {post_response.get_data(as_text=True)}")
        visitor_data = post_response.get_json()
        case_id = visitor_data['case_id']
        status_response = self.client.get(f'/visit/status/{case_id}')
        self.assertEqual(status_response.status_code, 200, msg=f"Response data: {status_response.get_data(as_text=True)}")
        status_data = status_response.get_json()
        self.assertEqual(status_data['visitor_name'], "Case Status Visitor")
        self.assertEqual(status_data['visitor_id'], visitor_data['visitor_id'])
        
    def test_06_get_status_not_found(self):
        import uuid
        random_id = str(uuid.uuid4())
        response = self.client.get(f'/visit/status/{random_id}')
        self.assertEqual(response.status_code, 404, msg=f"Response data: {response.get_data(as_text=True)}")

    def test_07_admin_report(self):
        app.current_queue_number = 0
        app.current_employee_index = 0
        self.client.post('/visit/new', json={"name": "V1", "phone_number": "1", "reason_for_visit": "R1"})
        self.client.post('/visit/new', json={"name": "V2", "phone_number": "2", "reason_for_visit": "R2"})
        response = self.client.get('/admin/report')
        self.assertEqual(response.status_code, 200, msg=f"Response data: {response.get_data(as_text=True)}")
        data = response.get_json()
        self.assertEqual(data['total_visitors_registered'], 2)
        self.assertIn('average_current_waiting_time_minutes', data)
        self.assertIn('employee_performance_summary', data)
        self.assertEqual(data['employee_performance_summary'][0]['employee_id'], 'EMP001')
        self.assertEqual(data['employee_performance_summary'][0]['assigned_cases_count'], 1)
        self.assertEqual(data['employee_performance_summary'][1]['employee_id'], 'EMP002')
        self.assertEqual(data['employee_performance_summary'][1]['assigned_cases_count'], 1)
        self.assertEqual(data['employee_performance_summary'][2]['employee_id'], 'EMP003')
        self.assertEqual(data['employee_performance_summary'][2]['assigned_cases_count'], 0)

    def test_08_simulation_tick_resolves_case(self):
        app.current_queue_number = 0
        app.current_employee_index = 0
        payload = {"name": "Sim Visitor", "phone_number": "S1", "reason_for_visit": "Sim Test"}
        post_response = self.client.post('/visit/new', json=payload)
        self.assertEqual(post_response.status_code, 201, msg=f"Response data: {post_response.get_data(as_text=True)}")
        visitor_data = post_response.get_json()
        case_id = visitor_data['case_id']
        assigned_employee_id = visitor_data['case_assigned_employee_id'] 
        created_case = next((c for c in case_files_list if str(c.case_id) == case_id), None)
        self.assertIsNotNone(created_case, "Case should have been created")
        for i in range(created_case.effort_required):
            tick_response = self.client.get('/simulation/tick')
            self.assertEqual(tick_response.status_code, 200, msg=f"Tick {i+1} - Response data: {tick_response.get_data(as_text=True)}")
        status_response = self.client.get(f'/visit/status/{case_id}')
        self.assertEqual(status_response.status_code, 200, msg=f"Response data: {status_response.get_data(as_text=True)}")
        status_data = status_response.get_json()
        self.assertEqual(status_data['case_status'], "Resolved", msg=f"Case data: {status_data}")
        self.assertEqual(status_data['visitor_status'], "Completed")
        employee_who_handled_case = next((e for e in employees_list if e.employee_id == assigned_employee_id), None)
        self.assertIsNotNone(employee_who_handled_case, f"Employee {assigned_employee_id} not found.")
        self.assertNotIn(created_case.case_id, employee_who_handled_case.current_tasks, 
                         f"Task {created_case.case_id} should not be in {assigned_employee_id}'s tasks. Tasks: {employee_who_handled_case.current_tasks}")

if __name__ == '__main__':
    unittest.main()
