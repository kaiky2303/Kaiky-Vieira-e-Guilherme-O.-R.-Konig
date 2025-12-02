const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prioridade = document.getElementById("prioridade").value;
    const descricao = document.getElementById("descricao").value;
    const local = document.getElementById("local").value;
    const recursos = document.getElementById("recursos").value;
    const dataLimite = document.getElementById("dataLimite").value;
    const matricula = document.getElementById("matricula").value;

    if (!prioridade || !descricao || !local || !dataLimite || !matricula) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    const tarefa = {
        prioridade: prioridade,
        descricao: descricao,
        local: local,
        recursosNecessarios: recursos ? recursos.split(",").map(r => r.trim()) : [],
        dataLimite: dataLimite,
        matricula: Number(matricula)
    };

    try {
        const response = await fetch("http://159.65.228.63/produtos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarefa)
        });

        if (response.ok) {
            alert("Tarefa cadastrada com sucesso!");
            window.location.href = "index.html";
        } else {
            alert("Erro ao cadastrar tarefa.");
        }
    } catch (error) {
        alert("Erro ao conectar com o servidor.");
        console.error(error);
    }
});
