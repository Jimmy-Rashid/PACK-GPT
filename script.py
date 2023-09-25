import os

# Directory path where the .txt files are located
directory = "Media/Podcast/Transcripts"

# Initialize an empty string to store the combined text
combined_text = ""

# Iterate through each file in the directory
for filename in os.listdir(directory):
    if filename.endswith(".txt"):
        file_path = os.path.join(directory, filename)
        with open(file_path, "r") as file:
            file_text = file.read()
            combined_text += file_text

# Write the combined text to a new file
output_file_path = "Media/CombinedText.txt"
with open(output_file_path, "w", encoding="utf-8") as output_file:
    output_file.write(combined_text)

print("Text files combined successfully!")