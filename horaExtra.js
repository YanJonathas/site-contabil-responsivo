function calcularHoraExtra() {
    const salario = parseFloat(document.getElementById('salarioHoraExtra').value);
    const horasExtras = parseFloat(document.getElementById('quantidadeHorasExtras').value);
    const tipo = document.getElementById('tipoHoraExtra').value;

    if (isNaN(salario) || isNaN(horasExtras) || horasExtras <= 0 || salario <= 0) {
        alert("Preencha todos os campos corretamente com valores válidos.");
        return;
    }

    const valorHoraBase = salario / 220;
    let adicional = 0;
    let tipoExtra = "";
    let noturna = false;

    if (tipo === "50-normal") {
        adicional = 0.5;
        tipoExtra = "50% (hora extra comum)";
    } else if (tipo === "100-normal") {
        adicional = 1.0;
        tipoExtra = "100% (hora extra comum)";
    } else if (tipo === "50-noturna") {
        adicional = 0.5 + 0.2;
        tipoExtra = "50% (hora extra noturna)";
        noturna = true;
    } else if (tipo === "100-noturna") {
        adicional = 1.0 + 0.2;
        tipoExtra = "100% (hora extra noturna)";
        noturna = true;
    }

    const valorHoraNoturna = noturna ? valorHoraBase * 1.2 : valorHoraBase;
    const valorHoraComAdicional = valorHoraNoturna * (1 + (adicional - (noturna ? 0.2 : 0)));
    const valorTotalExtras = valorHoraComAdicional * horasExtras;

    document.getElementById('resultadoHoraExtra').style.display = 'block';
    document.getElementById('resultadoHoraExtra').innerHTML = `
        <p><strong>Salário mensal:</strong> R$ ${salario.toFixed(2)}</p>
        <p><strong>Valor da hora base (220h/mês):</strong> R$ ${valorHoraBase.toFixed(2)}</p>
        ${noturna ? `<p><strong>Valor da hora base com adicional noturno (20%):</strong> R$ ${valorHoraNoturna.toFixed(2)}</p>` : ""}
        <p><strong>Valor da hora com adicional ${tipoExtra}:</strong> R$ ${valorHoraComAdicional.toFixed(2)}</p>
        <p><strong>Quantidade de horas extras:</strong> ${horasExtras} hora(s)</p>
        <p><strong>Valor total das horas extras:</strong> <span style="color: green; font-weight: bold;">R$ ${valorTotalExtras.toFixed(2)}</span></p>
    `;
}

function limparHorasExtras() {
    document.getElementById("salarioHoraExtra").value = "";
    document.getElementById("quantidadeHorasExtras").value = "";
    document.getElementById("tipoHoraExtra").value = "50";
    document.getElementById("noturna").checked = false;

    const resultado = document.getElementById("resultado");
    resultado.style.display = "none";
    resultado.innerHTML = "";
}


function visualizarPDFHoras() {
    const resultado = document.getElementById("resultadoHoraExtra");
    if (resultado.style.display === "none" || resultado.innerHTML.trim() === "") {
        alert("Calcule as horas extras antes de visualizar o PDF.");
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



function baixarPDFHoras() {
    const resultado = document.getElementById("resultadoHoraExtra");
    if (resultado.style.display === "none" || resultado.innerHTML.trim() === "") {
        alert("Calcule as horas extras antes de baixar o PDF.");
        return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
        const opt = {
            margin: 1,
            filename: 'resumo_horas_extras.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(resultado).save();
    }, 500);
}

