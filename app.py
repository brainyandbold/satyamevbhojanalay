from flask import Flask, render_template, request, jsonify
import csv
import os

app = Flask(__name__)

# Define the path to the CSV file
csv_file_path = 'orders.csv'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/place_order', methods=['POST'])
def place_order():
    # Get order information from the frontend
    order_data = request.get_json()
    print(order_data)
    # Save the order information to the CSV file
    save_order_to_csv(order_data)

    return jsonify({"status": "success"})

def save_order_to_csv(order_data):
    # Check if the CSV file exists, create it if not
    if not os.path.isfile(csv_file_path):
        with open(csv_file_path, 'w', newline='') as csv_file:
            fieldnames = ['Name', 'Number', 'Address', 'Building', 'FlatNumber', 'Order']
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader()

    # Append the order information to the CSV file
    with open(csv_file_path, 'a', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow([order_data['name'], order_data['number'], order_data['address'],
                         order_data['building'], order_data['flatNumber'], order_data['order']])
@app.route('/admin')
def admin():
    orders = get_all_orders()
    return render_template('admin.html', orders=orders)
def get_all_orders():
    orders = []
    if os.path.isfile(csv_file_path):
        with open(csv_file_path, 'r') as csv_file:
            reader = csv.DictReader(csv_file)
            for row in reader:
                # Convert the 'Order' string to a list of dictionaries
                row['Order'] = eval(row['Order'])
                orders.append(row)
    return orders
if __name__ == '__main__':
    app.run(debug=True)
