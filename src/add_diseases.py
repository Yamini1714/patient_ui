import mysql.connector
from faker import Faker

# Initialize Faker
fake = Faker()

# Connect to MySQL database
conn = mysql.connector.connect(
    host='localhost',
    user='root',  # Replace with your MySQL username
    password='Corona123',  # Replace with your MySQL password
    database='patientdb'  # Replace with your database name
)

cursor = conn.cursor()

# List of random diseases
diseases = [
    "Diabetes", "Hypertension", "Asthma", "Chronic Pain", "Arthritis",
    "Heart Disease", "Cancer", "Epilepsy", "Parkinson's Disease"
]

# Update the disability column where it's currently null
update_query = """
    UPDATE patient_details
    SET disability = %s
    WHERE disability IS NULL
"""

# Execute update query for rows where disability is null
for _ in range(100):  # Adjust the range according to your data size
    random_disease = fake.random_element(elements=diseases)
    cursor.execute(update_query, (random_disease,))

# Commit the transaction
conn.commit()

# Close the connection
cursor.close()
conn.close()

print("Null values in the disability column have been updated with random diseases.")
