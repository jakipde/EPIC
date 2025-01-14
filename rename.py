import re

# Function to add ON DUPLICATE KEY UPDATE
def add_on_duplicate_key(sql):
    # Regex to capture the relevant parts of the INSERT statement
    pattern = r"INSERT INTO\s+devices\s+\((.*?)\)\s+VALUES\s+\((.*?)\);"
    matches = re.findall(pattern, sql, re.DOTALL)

    updated_sqls = []

    for match in matches:
        columns = [col.strip() for col in match[0].replace('\n', '').split(',')]
        values = [val.strip() for val in match[1].replace('\n', '').split(',')]

        # Prepare the ON DUPLICATE KEY UPDATE section
        update_parts = []
        for i, col in enumerate(columns):
            value = values[i].strip()  # Get the corresponding value
            if value == 'NULL' or value == '':  # Handle empty or NULL values
                continue  # Skip if the value is empty or NULL
            
            if col in ['img', 'description']:
                update_parts.append(f"{col} = COALESCE(VALUES({col}), {col})")
            else:
                update_parts.append(f"{col} = VALUES({col})")

        update_clause = ", ".join(update_parts)

        # Construct the final SQL statement
        final_sql = f"INSERT INTO devices ({match[0]}) VALUES ({match[1]}) ON DUPLICATE KEY UPDATE {update_clause};"
        updated_sqls.append(final_sql)

    return "\n".join(updated_sqls)

# Read from devices.sql and write to output.sql
input_file = 'devices.sql'
output_file = 'output.sql'

# Use UTF-8 encoding to read the input file
with open(input_file, 'r', encoding='utf-8') as file:
    sql_content = file.read()

# Generate the new SQL with ON DUPLICATE KEY UPDATE
new_sql = add_on_duplicate_key(sql_content)

# Write the output to output.sql using UTF-8 encoding
with open(output_file, 'w', encoding='utf-8') as file:
    file.write(new_sql)

print(f"Processed SQL statements written to {output_file}.")