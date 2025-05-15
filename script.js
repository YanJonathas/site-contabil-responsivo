function calcularRescisao() {
    const nomeFuncionario = document.getElementById("nomeFuncionario").value.trim();
    const salario = parseFloat(document.getElementById("salario").value) || 0;
    const diasTrabalhados = parseInt(document.getElementById("diasTrabalhados").value) || 0;
    const mesesTrabalhados = parseInt(document.getElementById("mesesTrabalhados").value) || 0;
    const anosTrabalhados = parseInt(document.getElementById("anosTrabalhados").value) || 0;
    const feriasVencidas = parseFloat(document.getElementById("feriasVencidas").value) || 0;
    const decimoTerceiroVencido = parseFloat(document.getElementById("decimoTerceiroVencido").value) || 0;
    const avisoPrevioTrabalhado = document.getElementById("avisoPrevioTrabalhado").checked;
    const tipoRescisao = document.getElementById("tipoRescisao").value;

    const saldoSalario = (salario / 30) * diasTrabalhados;
    const feriasProporcionais = ((salario / 12) * mesesTrabalhados) + (((salario / 12) * mesesTrabalhados) / 3);
    const feriasVencidasValor = feriasVencidas > 0 ? (feriasVencidas * salario) + ((feriasVencidas * salario) / 3) : 0;

    let decimoTerceiro = (salario / 12) * mesesTrabalhados;
    if (tipoRescisao === "justaCausa") {
        decimoTerceiro = 0;
    }
    const decimoTerceiroValor = decimoTerceiroVencido > 0 ? decimoTerceiroVencido * salario : 0;

    let avisoPrevio = 0;
    if (tipoRescisao === "semJustaCausa" && !avisoPrevioTrabalhado) {
        avisoPrevio = salario;
    }

    let multaFGTS = 0;
    if (tipoRescisao === "semJustaCausa") {
        multaFGTS = salario * 0.40;
    }

    const fgtsDepositado = salario * 0.08 * (anosTrabalhados * 12 + mesesTrabalhados);

    const totalBruto = saldoSalario + feriasProporcionais + feriasVencidasValor + decimoTerceiro + decimoTerceiroValor + avisoPrevio + multaFGTS;

    // Correção da base do INSS
    const baseINSS = saldoSalario + decimoTerceiro + avisoPrevio;
    const { inss, aliquotaINSS } = calcularINSS(baseINSS, salario);

    // Correção da base do IRRF
    const { irrf, aliquotaIRRF } = calcularIRRF(salario - inss);

    const totalLiquido = totalBruto - inss - irrf;

    // Mostrar o resultado
    const resultadoDiv = document.getElementById("resultado");
    const tipoRescisaoTexto = {
        semJustaCausa: "Sem Justa Causa",
        justaCausa: "Com Justa Causa",
        pedidoDemissao: "Pedido de Demissão"
    };

    resultadoDiv.innerHTML = `
        <h3>📝 Informações do Funcionário</h3>
        🔹 <strong>Nome:</strong> ${nomeFuncionario}<br>
        🔹 <strong>Tipo de Rescisão:</strong> ${tipoRescisaoTexto[tipoRescisao]}<br>
        🔹 <strong>Salário Mensal:</strong> R$ ${salario.toFixed(2)}<br>
        🔹 <strong>Dias Trabalhados no Mês:</strong> ${diasTrabalhados}<br>
        🔹 <strong>Meses Trabalhados no Ano:</strong> ${mesesTrabalhados}<br>
        🔹 <strong>Anos de Empresa:</strong> ${anosTrabalhados}<br>
        🔹 <strong>Férias Vencidas:</strong> ${feriasVencidas}<br>
        🔹 <strong>13º Salário Vencido:</strong> ${decimoTerceiroVencido}<br>
        🔹 <strong>Aviso Prévio Trabalhado?:</strong> ${avisoPrevioTrabalhado ? "Sim" : "Não"}<br>
        <br><hr><br>
        <h3>📊 Resumo da Rescisão</h3>
        📌 <strong>Saldo de Salário:</strong> R$ ${saldoSalario.toFixed(2)} <br>
        📌 <strong>Férias Proporcionais:</strong> R$ ${feriasProporcionais.toFixed(2)} <br>
        📌 <strong>Férias Vencidas:</strong> R$ ${feriasVencidasValor.toFixed(2)} <br>
        📌 <strong>13º Salário Proporcional:</strong> R$ ${decimoTerceiro.toFixed(2)} <br>
        📌 <strong>13º Salário Vencido:</strong> R$ ${decimoTerceiroValor.toFixed(2)} <br>
        📌 <strong>Aviso Prévio:</strong> R$ ${avisoPrevio.toFixed(2)} <br>
        📌 <strong>Multa FGTS (40%):</strong> R$ ${multaFGTS.toFixed(2)} <br><br>
        <hr><br>
        🔹 <strong>Total Bruto:</strong> R$ ${totalBruto.toFixed(2)} <br><br>
        🔻 <strong>INSS (${aliquotaINSS}):</strong> R$ ${inss.toFixed(2)} <br>
        🔻 <strong>IRRF (${aliquotaIRRF}):</strong> R$ ${irrf.toFixed(2)} <br><br>
        <hr><br>
        ✅ <strong>Total Líquido:</strong> R$ ${totalLiquido.toFixed(2)} <br><br>
        <hr><br>
        🏦 <strong>FGTS Total Depositado:</strong> R$ ${fgtsDepositado.toFixed(2)} (não incluso na rescisão)<br>
        <br><hr><br>
    `;

    resultadoDiv.style.display = "block";
    window.scrollTo(0, 0);
}

function limparFormulario() {
    document.getElementById("tipoRescisao").value = "semJustaCausa";
    document.getElementById("salario").value = "";
    document.getElementById("diasTrabalhados").value = "";
    document.getElementById("mesesTrabalhados").value = "";
    document.getElementById("anosTrabalhados").value = "";
    document.getElementById("feriasVencidas").value = "";
    document.getElementById("decimoTerceiroVencido").value = "";
    document.getElementById("avisoPrevioTrabalhado").checked = false;
    document.getElementById("nomeFuncionario").value = "";

    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";
    resultadoDiv.style.display = "none";
}

function calcularINSS(baseCalculo, salarioBruto) {
    let inss = 0;
    let aliquotaINSS = "";

    if (salarioBruto <= 1518.00) {
        inss = baseCalculo * 0.075;
        aliquotaINSS = "7,5%";
    } else if (salarioBruto <= 2793.88) {
        inss = baseCalculo * 0.09;
        aliquotaINSS = "9%";
    } else if (salarioBruto <= 4190.83) {
        inss = baseCalculo * 0.12;
        aliquotaINSS = "12%";
    } else if (salarioBruto <= 8157.41) {
        inss = baseCalculo * 0.14;
        aliquotaINSS = "14%";
    } else {
        inss = 908.85;
        aliquotaINSS = "Teto (14%)";
    }

    return { inss, aliquotaINSS };
}


function calcularIRRF(baseIRRF) {
    baseIRRF = parseFloat(baseIRRF.toFixed(2));
    let irrf = 0;
    let aliquota = "Isento";

    if (baseIRRF <= 2428.80) {
        irrf = 0;
        aliquota = "Isento";
    } else if (baseIRRF <= 2826.65) {
        irrf = (baseIRRF * 0.075) - 182.16;
        aliquota = "7,5%";
    } else if (baseIRRF <= 3751.05) {
        irrf = (baseIRRF * 0.15) - 394.16;
        aliquota = "15%";
    } else if (baseIRRF <= 4664.68) {
        irrf = (baseIRRF * 0.225) - 675.49;
        aliquota = "22,5%";
    } else {
        irrf = (baseIRRF * 0.275) - 908.73;
        aliquota = "27,5%";
    }

    if (irrf < 0) {
        irrf = 0;
    }

    return { irrf, aliquotaIRRF: aliquota };
}



function visualizarPDF() {
    const resultado = document.getElementById("resultado");
    if (resultado.style.display === "none" || resultado.innerHTML.trim() === "") {
        alert("Calcule a rescisão antes de visualizar o PDF.");
        return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
        const opt = {
            margin: 1,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
        };

        // Cria o PDF e abre numa nova aba
        html2pdf().set(opt).from(resultado).outputPdf('dataurlnewwindow');
    }, 800);
}





function baixarPDF() {
    let nomecomp = document.getElementById('nomeFuncionario').value;
    const resultado = document.getElementById("resultado");
    if (resultado.style.display === "none" || resultado.innerHTML.trim() === "") {
        alert("Calcule a rescisão antes de baixar o PDF.");
        return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
        const opt = {
            margin: 1,
            filename: `rescisão_${nomecomp}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(resultado).save();
    }, 500);
}




