async function carregarTarefas() {
    const container = document.getElementById("lista-container");

    try {
        const response = await fetch("https://159.65.228.63/produtos");
        const tarefas = await response.json();

        if (!tarefas.length) {
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

        tarefas.forEach(t => {
            const classePrioridade = t.prioridade === "Urgente" ? "urgente" : "";
            html += `
                <tr class="${classePrioridade}">
                    <td>${t.prioridade}</td>
                    <td>${t.descricao}</td>
                    <td>${t.local}</td>
                    <td>${t.recursosNecessarios.join(", ")}</td>
                    <td>${t.dataLimite}</td>
                    <td>${t.matricula}</td>
                </tr>
            `;
        });

        html += "</tbody></table>";
        container.innerHTML = html;

    } catch (error) {
        container.innerHTML = "<p class='erro'>Erro ao carregar tarefas.</p>";
    }
}

carregarTarefas();
