const fs = require('fs');

// List models
async function test() {
    try {
        const key = "AIzaSyBfwahKWIsaAq4b1_M6A29HeUJrI6se18M";
        console.log("Checking models with key: " + key.substring(0, 10) + "...");

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await res.json();

        fs.writeFileSync('models.json', JSON.stringify(data, null, 2));
        console.log("Written to models.json");

    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

test();
