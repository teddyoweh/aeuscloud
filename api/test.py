
import os
 
size = 1024 * 1024 * 1024 * 10
 
 
with open("test.txt", "wb") as f:
    f.seek(size-1)
    f.write(b"\0")
 
 
statinfo = os.stat("test.txt")
print("File size in bytes:", statinfo.st_size)