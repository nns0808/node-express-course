const { writeFile, readFile } = require("fs").promises;  
const writer = async() => {
    try {
        await writeFile("temp.txt", "First line\n");
        await writeFile("temp.txt", "Second line\n", { flag: "a" });
        await writeFile("temp.txt", "Third line\n", { flag: "a" });
    } catch (err) {
        console.log("Writer error:", err) 
    }
    
};

const reader = async () => {
  try {
    const data = await readFile("temp.txt", "utf8");
    console.log("File content:\n", data);
  } catch (err) {
    console.log("Reader error:", err);
  }
};


const readWrite = async () => {
  await writer();  
  await reader();   
};


readWrite();