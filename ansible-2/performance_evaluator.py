import requests
import time
import numpy as np
import matplotlib.pyplot as plt

def measure_request_time(url):
    total_time = 0
    individual_times = []

    for _ in range(30):
        start_time = time.time()
        response = requests.get(url=url)
        print(response.json())
        end_time = time.time()

        request_time = (end_time - start_time) * 1000
        individual_times.append(request_time)
        total_time += request_time
    
    return total_time, individual_times

setup_1_url = "http://152.7.178.108:3000/data"
setup_2_url = "http://152.7.179.29:3000/data"

total_time_setup_1, individual_times_setup_1= measure_request_time(setup_1_url)
total_time_setup_2, individual_times_setup_2 = measure_request_time(setup_2_url)

print("Total time for setup-1 (in milliseconds): ", total_time_setup_1)
print("Total time for setup-2 (in milliseconds): ", total_time_setup_2)

plt.figure(figsize=(10, 5))

plt.hist(individual_times_setup_1, bins=10, alpha=0.5, label='Setup 1', color='blue')
plt.hist(individual_times_setup_2, bins=10, alpha=0.5, label='Setup 2', color='green')

plt.xlabel('Response Time (ms)')
plt.ylabel('Frequency')
plt.title('Comparison of Response Time Distributions')
plt.legend()

plt.grid(True)
plt.show()
