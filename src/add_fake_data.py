import mysql.connector
from faker import Faker
import random

# Initialize Faker
fake = Faker()

# List of diseases for the disability column
diseases = [
    "Asthma", "Diabetes", "Hypertension", "Arthritis", "Hearing Loss",
    "Vision Impairment", "Mobility Impairment", "Chronic Pain", "Heart Disease", "Epilepsy"
]

# Connect to MySQL database
conn = mysql.connector.connect(
    host='localhost',
    user='root',  # Replace with your MySQL username
    password='Corona123',  # Replace with your MySQL password
    database='patientdb'  # Replace with your database name
)

cursor = conn.cursor()


# Define a function to call the stored procedure


def insert_fake_data():
    for _ in range(100):  # Insert 100 fake records
        first_name = fake.first_name()
        last_name = fake.last_name()
        age = fake.random_int(min=1, max=100)
        gender = fake.random_element(elements=('Male', 'Female'))
        phone_number = fake.phone_number()[:10]
        address = fake.address()
        disability = random.choice(diseases)  # Select a random disease

        cursor.callproc('AddFakePatientData', (
            first_name, last_name, age, gender, phone_number, address, disability
        ))


# Insert fake data
insert_fake_data()

# Commit the changes and close the connection
conn.commit()
cursor.close()
conn.close()
