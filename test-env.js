const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

console.log("--------------------------------------------------");
console.log("CHECKING FILE AT: " + envPath);

try {
    if (fs.existsSync(envPath)) {
        console.log("✅ SUCCESS: .env file found!");
        const content = fs.readFileSync(envPath, 'utf8');
        console.log("\n--- RAW CONTENT START ---");
        console.log(content);
        console.log("--- RAW CONTENT END ---\n");
        
        const urlLine = content.split('\n').find(line => line.startsWith('DATABASE_URL'));
        if (urlLine) {
            console.log("Found URL Line: " + urlLine);
            if (urlLine.includes('postgres://') || urlLine.includes('postgresql://')) {
                 console.log("✅ URL format looks correct.");
            } else {
                 console.log("❌ URL is missing 'postgres://' or 'postgresql://' prefix!");
            }
        } else {
            console.log("❌ DATABASE_URL not found in file.");
        }

    } else {
        console.log("❌ ERROR: .env file does NOT exist.");
        console.log("Did you name it .env.txt by accident?");
    }
} catch (err) {
    console.error("Error reading file:", err);
}
console.log("--------------------------------------------------");