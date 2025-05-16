function calcularSalarioFamilia() {
    const salarioMensal = parseFloat(document.getElementById("salarioFamiliaMensal").value);
    const diasTrabalhados = parseInt(document.getElementById("diasTrabalhadosFamilia").value);
    const numeroFilhos = parseInt(document.getElementById("numeroFilhos").value);
    const resultadoDiv = document.getElementById("resultadoSalarioFamilia");

    const valorPorFilho = 65.00;
    const diasNoMes = 30;
    const limiteSalario = 1906.04;

    // Validação
    if (isNaN(salarioMensal) || isNaN(diasTrabalhados) || isNaN(numeroFilhos) || diasTrabalhados < 1 || numeroFilhos < 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Verificação de direito ao benefício
    if (salarioMensal > limiteSalario) {
        resultadoDiv.innerHTML = `
            <strong>Resultado:</strong><br><br>
            Salário informado: R$ ${salarioMensal.toFixed(2)}<br>
            Como o salário é superior a R$ ${limiteSalario.toFixed(2)}, o funcionário <strong>não tem direito</strong> ao salário-família, segundo a Lei nº 7.986/89.
        `;
        resultadoDiv.style.display = "block";
        return;
    }

    // Cálculo do salário-família
    const valorProporcionalPorFilho = (valorPorFilho / diasNoMes) * diasTrabalhados;
    const totalSalarioFamilia = valorProporcionalPorFilho * numeroFilhos;

    resultadoDiv.innerHTML = `
        <strong>Resultado:</strong><br><br>
        Salário informado: R$ ${salarioMensal.toFixed(2)}<br>
        Número de filhos: ${numeroFilhos}<br>
        Dias trabalhados: ${diasTrabalhados}<br>
        Valor proporcional por filho: R$ ${valorProporcionalPorFilho.toFixed(2)}<br>
        <strong>Total a receber de salário-família: R$ ${totalSalarioFamilia.toFixed(2)}</strong>
    `;
    resultadoDiv.style.display = "block";
}

