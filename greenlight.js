let colors = require(__dirname + "/lib/colors");
console.log(colors.green + "⬤ GreenLight v0.0.1" + colors.reset)

let fs = require("fs");
let lexer = require(__dirname + "/lib/lexer");
let transpiler = require(__dirname + "/lib/transpiler");

let code = "";

if(process.argv[2] == null || !( process.argv[2] === "e" || process.argv[2] === "c" )) {
	console.log(colors.red + "[ERR] Please provide either e or c as second argument!" + colors.reset);
	process.exit(1);
}

if(process.argv[3] != null) {
	for(let i = 3; process.argv[i] != null; i++) {
		if(!fs.existsSync(process.argv[i])) {
			console.log(colors.red + "[ERR] " + process.argv[i] + " doesn't exist!" + colors.reset);
			process.exit(1);
		}
		code += new String(fs.readFileSync(process.argv[i])).replace(/(\r\n|\n|\r)/gm, "");
	}
} else {
	console.log(colors.red + "[ERR] No input file supplied. Pass source files as arguments. Exiting..." + colors.reset);
	process.exit(1);
}

console.log(colors.blue + "[*] Executing lexer..." + colors.reset);
let lexerResults = lexer.execute(code)
console.log(colors.green + "[OK] Lexer finished successfully!" + colors.reset);

//console.log(lexerResults);

console.log(colors.blue + "[*] Transpiling..." + colors.reset);
lexerResults.forEach(token => {
	transpiler.transpile(token);
})
console.log(colors.green + "[OK] Transpilation complete!" + colors.reset);

if(process.argv[2] === "c") {
	console.log("Transpiled JS Code (includes stdlib): " + transpiler.getCode());
} else {
	eval(transpiler.getCode());
}
