var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];

setTimeout(function () {
  loopLines(banner, "", 80);
  textarea.focus();
}, 500);

window.addEventListener("keyup", enterKey);

console.log(
  "%cVocê hackeou minha senha!😠",
  "color: #04ff00; font-weight: bold; font-size: 24px;"
);
console.log("%cSenha: '" + password + "' - Eu me pergunto o que isso faz?🤔", "color: grey");


textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
    if (textarea.value === password) {
      pwd = true;
    }
    if (pwd && e.keyCode == 13) {
      loopLines(segredo, "color2 margin", 120);
      command.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;
      liner.classList.remove("password");
    } else if (e.keyCode == 13) {
      addLine("Senha incorreta", "error", 0);
      command.innerHTML = "";
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine("convidado@maxthevogel.com.br:~$ " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "ajuda":
      loopLines(ajuda, "color2 margin", 80);
      break;
    case "whois":
      loopLines(whois, "color2 margin", 80);
      break;
    case "whoami":
      loopLines(whoami, "color2 margin", 80);
      break;
    case "sudo":
      addLine("Ah não, você não é admin...", "color2", 80);
      setTimeout(function () {
        window.open('https://www.youtube.com/watch?v=oHg5SJYRHA0');
      }, 1500);
      break;
    case "redes":
      loopLines(redes, "color2 margin", 80);
      break;
    case "segredo":
      liner.classList.add("password");
      pw = true;
      break;
    case "projetos":
      loopLines(projetos, "color2 margin", 80);
      break;
    case "senha":
      addLine("<span class=\"inherit\"> Você está brincando, certo? Vai ter que se esforçar mais do que isso!😂</span>", "error", 100);
      break;
    case "historico":
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "email":
      addLine('Abrindo mailto:<a href="mailto:maxthevogel@gmail.com"> maxthevogel@gmail.com</a>...', "color2", 80);
      newTab(email);
      break;
    case "limpar":
      setTimeout(function () {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "banner":
      loopLines(banner, "", 80);
      break;
    // redes sociais
    case "linkedin":
      addLine("Abrindo LinkedIn...", "color2", 0);
      newTab(linkedin);
      break;
    case "instagram":
      addLine("Abrindo Instagram...", "color2", 0);
      newTab(instagram);
      break;
    case "github":
      addLine("Abrindo GitHub...", "color2", 0);
      newTab(github);
      break;
    default:
      addLine("<span class=\"inherit\">Comando não encontrado. Para uma lista de comandos, digite <span class=\"command\">'ajuda'</span>.</span>", "error", 100);
      break;
  }
}

function newTab(link) {
  setTimeout(function () {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function () {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
}
