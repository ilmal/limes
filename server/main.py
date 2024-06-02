# from bs4 import BeautifulSoup
# import requests


# def main():
#     result = requests.get("https://www.imdb.com/find/?q=spider-man%202&ref_=nv_sr_sm")
#     soup = BeautifulSoup(result.text, "html.parser")

#     film = soup.find_all("img", "ipc-image")

#     print(film)
#     return


# if __name__ == "__main__":
#     main()


import psycopg2

#establishing the connection
conn = psycopg2.connect(
   database="limes", user='limes', password='pass123', host='127.0.0.1', port= '5432'
)
#Creating a cursor object using the cursor() method
cursor = conn.cursor()

cursor.execute("INSERT INTO cars (brand, model, year) VALUES ('BMW', 'X5', 2016)")

#Executing an MYSQL function using the execute() method
cursor.execute("SELECT * FROM cars")

# Fetch a single row using fetchone() method.
data = cursor.fetchall()
print("ANSWER: ",data)

#Closing the connection
conn.close()

