async function carregarTarefas() {
    const container = document.getElementById("lista-container");

    try {
        const response = await fetch("http://159.65.228.63/produtos");
        const tarefas = await response.json();

        // Caso a API retorne um objeto em vez de array
        const lista = Array.isArray(tarefas) ? tarefas : [tarefas];

        if (!lista.length) {
            container.innerHTML = "<p class='vazio'>Nenhuma tarefa cadastrada</p>";
            return;
        }

        let html = `
            <table>
                <thead>
                    <tr>
                        <th>Prioridade</th>
                        <th>Descrição</th>
                        <th>Local</th>
                        <th>Recursos</th>
                        <th>Data Limite</th>
                        <th>Matrícula</th>
                    </tr>
                </thead>
                <tbody>
        `;

        lista.forEach(t => {
            const prioridade = t.prioridade || t.Prioridade || "—";
            const descricao = t.descricao || t.Descricao || "—";
            const local = t.local || t.Local || "—";
            const matricula = t.matricula || t.Matricula || "—";
            const dataLimite = t.dataLimite || t.DataLimite || "—";
            let recursos = "—";

            if (Array.isArray(t.recursosNecessarios)) {
                recursos = t.recursosNecessarios.join(", ");
            } else if (typeof t.recursosNecessarios === "string") {
                recursos = t.recursosNecessarios;
            } else if (Array.isArray(t.recursos)) {
                recursos = t.recursos.join(", ");
            } else if (typeof t.recursos === "string") {
                recursos = t.recursos;
            }
            const classePrioridade = prioridade.toLowerCase() === "urgente" ? "urgente" : "";

            html += `
                <tr class="${classePrioridade}">
                    <td>${prioridade}</td>
                    <td>${descricao}</td>
                    <td>${local}</td>
                    <td>${recursos}</td>
                    <td>${dataLimite}</td>
                    <td>${matricula}</td>
                </tr>
            `;
        });

        html += "</tbody></table>";
        container.innerHTML = html;

    } catch (error) {
        container.innerHTML = "<p class='erro'>Erro ao carregar tarefas.</p>";
        console.error("Erro ao carregar tarefas:", error);
    }
}

carregarTarefas();
