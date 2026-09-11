
const URL_WEBHOOK = "https://defaultb5738c79b980469fadac95ed46cede.ef.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/31/workflows/3b8e3dbcf64d4357b673fe122ebe259f/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HIvqOBOmKwlqCXmeRlYYYq6TZYdlRoAQtODCYnyX0lw";

const form    = document.querySelector("#formulario");
const btnEnvio = document.querySelector(".btnenvio");



// Pega valor de um select ou input pelo ID (retorna "" se não existir)
function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

// Pega todos os checkboxes marcados de um grupo (name)
function checkboxValues(name) {
  return Array.from(
    document.querySelectorAll(`input[type="checkbox"][name="${name}"]:checked`)
  ).map((cb) => cb.value);
}

// Pega se um checkbox único está marcado
function isChecked(id) {
  const el = document.getElementById(id);
  return el ? el.checked : false;
}

// Pega o data-cnpj do option selecionado em um select
function cnpjDoSelect(id) {
  const el = document.getElementById(id);
  if (!el) return "";
  const selected = el.options[el.selectedIndex];
  return selected ? (selected.getAttribute("data-cnpj") || "") : "";
}


// Validação dos campos
function validarFormulario() {
  const erros = [];

  // --- DADOS PESSOAIS --- 
  if (!val("conselho"))          erros.push("Conselho é obrigatório.");
  if (!val("nconselho"))   erros.push("Número do Conselho é obrigatório.");
  if (!val("nome"))              erros.push("Nome é obrigatório.");
  if (!val("cpf_cnpj"))               erros.push("CPF/CNPJ é obrigatório.");
  if (!val("dt_nascimento"))   erros.push("Data de Nascimento é obrigatória.");
  if (!val("especialidade_principal"))     erros.push("Especialidade Principal é obrigatória.");

  // --- LOCAL DE ATENDIMENTO ---
  if (!val("local_atendimento_principal")) erros.push("Hospital/Local Principal é obrigatório.");

  // --- DECLARAÇÕES ---
  if (!isChecked("declaracao_repasse")) erros.push("É necessário aceitar a o termo de Ciência e Acordo de repasses de honorários.");
  if (!isChecked("declaracao_rendimento")) erros.push("É necessário aceitar o termo.");
  if (!isChecked("declaracao_ingresso")) erros.push("É necessário aceitar a Declaração.");
  if (!isChecked("declaracao_dados")) erros.push("É necessário aceitar a Autorização de Dados Pessoais.");
  if (!isChecked("declaracao_ppp")) erros.push("É necessário aceitar o Termo de Compromisso PPP.");

  // --- CAMPOS FINAIS ---
  if (!val("beneficio"))             erros.push("Informe se recebe benefício previdenciário.");
  if (!val("regime_aposentadoria"))  erros.push("Informe o regime de aposentadoria.");
  if (!val("tipo_beneficio"))        erros.push("Informe o tipo de aposentadoria.");
  if (!val("ciencia_cooperado"))     erros.push("Informe a Ciência do Cooperado.");

  return erros;
}

// montar lista de arquivos
const inputsArquivos = [
    { id: "arquivo_carteirinha",                 label: "Carteirinha" },
    { id: "arquivo_cpf",                label: "CPF" },
    { id: "arquivo_rg",                label: "RG" },
    { id: "arquivo_diploma", label: "Diploma" }
  ];




// COLETA DE TODOS OS CAMPOS

function coletarDados(listaArquivos) {
  return {

    // --- DADOS PESSOAIS ---
    conselho:          val("conselho"),
    nconselho:   val("nconselho"),
    nome:              val("nome"),
    nome_social:         val("nome_social"),
    cpf_cnpj:               val("cpf_cnpj"),
    rg:                val("rg"),
    orgao_emissor: val("orgao_emissor"),
    dt_emissao_rg: val("dt_emissao_rg"),
    n_inss: val("n_inss"),
    n_iss: val("n_iss"),
    pis: val("pis"),
    cns: val("cns"),
    dt_emissao_cregional: val("dt_emissao_cregional"),
    n_rne:          val("n_rne"),
    grau_instrucao: val("grau_instrucao"),
    orgao_emissor_rne: val("orgao_emissor_rne"),
    dt_emissao_rne: val("dt_emissao_rne"),
    dt_naturalizacao: val("dt_naturalizacao"),
    casado_brasileiro: val("casado_brasileiro"),
    filho_brasileiro: val("filho_brasileiro"),
    dt_chegada_brasil: val("dt_chegada_brasil"),
    email_endereco1: val("email_endereco1"),
    email_endereco2: val("email_endereco2"),
    email_endereco3: val("email_endereco3"),
    dt_nascimento:   val("dt_nascimento"),
    nome_mae:        val("nome_mae"),
    nome_pai:        val("nome_pai"),
    nacionalidade:     val("nacionalidade"),
    pais_nascimento:   val("pais_nascimento"),
    estado_nascimento: val("estado_nascimento"),
    municipio_nascimento: val("municipio_nascimento"),
    estado_civil:      val("estado_civil"),
    sexo:              val("sexo"),
    raca:          val("raca"),
    deficienciaFisica: document.getElementById("deficiencia_fisica").checked,
    deficienciaVisual: document.getElementById("deficiencia_visual").checked,
    deficienciaAuditiva: document.getElementById("deficiencia_auditiva").checked,
    deficienciaMental: document.getElementById("deficiencia_mental").checked,
    deficienciaIntelectual: document.getElementById("deficiencia_intelectual").checked,
    visto_permanente: document.getElementById("visto_permanente").checked,
    visto_temporario: document.getElementById("visto_temporario").checked,
    asilado: document.getElementById("asilado").checked,
    refugiado: document.getElementById("refugiado").checked,
    solicitante_refugio: document.getElementById("solicitante_refugio").checked,
    dependente_diplomatico: document.getElementById("dependente_diplomatico").checked,
    residencia_provisoria: document.getElementById("residencia_provisoria").checked,
    permanencia_conjuge: document.getElementById("permanencia_conjuge").checked,
    permanencia_deficiencia: document.getElementById("permanencia_deficiencia").checked,
    residente_fronteirico: document.getElementById("residente_fronteirico").checked,
    beneficiado_mercosul: document.getElementById("beneficiado_mercosul").checked,
    beneficiado_federacao: document.getElementById("beneficiado_federacao").checked,   
    celular_endereco1:           val("celular_endereco1"),
    celular_endereco2:           val("celular_endereco2"),
    celular_endereco3:           val("celular_endereco3"),
    telefone_endereco1:          val("telefone_endereco1"),
    telefone_endereco2:          val("telefone_endereco2"),
    telefone_endereco3:          val("telefone_endereco3"),
    cep_endereco1:               val("cep_endereco1"),
    cep_endereco2:               val("cep_endereco2"),
    cep_endereco3:               val("cep_endereco3"),
    tipo_endereco1:          val("tipo_endereco1"),
    tipo_endereco2:          val("tipo_endereco2"),
    tipo_endereco3:          val("tipo_endereco3"),
    tipo_logradouro1: val("tipo_logradouro1"),
    tipo_logradouro2: val("tipo_logradouro2"),
    tipo_logradouro3: val("tipo_logradouro3"),
    logradouro1: val("logradouro1"),
    logradouro2: val("logradouro2"),
    logradouro3: val("logradouro3"),
    n_endereco1: val("n_endereco1"),
    n_endereco2: val("n_endereco2"),
    n_endereco3: val("n_endereco3"),
    complemento_endereco1: val("complemento_endereco1"),
    complemento_endereco2: val("complemento_endereco2"),
    complemento_endereco3: val("complemento_endereco3"),
    bairro_endereco1: val("bairro_endereco1"),
    bairro_endereco2: val("bairro_endereco2"),
    bairro_endereco3: val("bairro_endereco3"),
    cidade_endereco1: val("cidade_endereco1"),
    cidade_endereco2: val("cidade_endereco2"),
    cidade_endereco3: val("cidade_endereco3"),
    uf_endereco1: val("uf_endereco1"),
    uf_endereco2: val("uf_endereco2"),
    uf_endereco3: val("uf_endereco3"),

    // --- DADOS PROFISSIONAIS ---
    especialidade_principal: val("especialidade_principal"),
    rqe_principal:            val("rqe_principal"),
    rqe_outras:            val("rqe_outras"),
    correspondencia_endereco: val("correspondencia_endereco"),    
    consulta_medica_principal: isChecked("consulta_medica_principal"),
    consulta_medica2:          isChecked("consulta_medica2"),
    consulta_medica3:          isChecked("consulta_medica3"),
    consulta_medica4:          isChecked("consulta_medica4"),
    dt_ciencia: val("dt_ciencia"),
    


    // --- DADOS BANCÁRIOS ---
    nbanco:             val("nbanco"),
    banco:           val("banco"),
    conta_corrente: val("conta_corrente"),
    agencia: val("agencia"),

    // --- LOCAL DE ATENDIMENTO PRINCIPAL ---
    convenios: document.getElementById("convenios").checked,
    IPSM: document.getElementById("IPSM").checked,
    SUS: document.getElementById("SUS").checked,
    UnimedBHNaoCooperado: document.getElementById("UnimedBHNaoCooperado").checked,
local_atendimento_principal:     val("local_atendimento_principal"),
bloco_cirurgico_principal: document.getElementById("bloco_cirurgico_principal").checked,
    bloco_obstetrico_principal: document.getElementById("bloco_obstetrico_principal").checked,
    consultas_principal: document.getElementById("consultas_principal").checked,
    cti_principal: document.getElementById("cti_principal").checked,
    hemodinamica_principal: document.getElementById("hemodinamica_principal").checked,
    pronto_socorro_principal: document.getElementById("pronto_socorro_principal").checked,
    descricao_principal:           val("descricao_principal"),
    

// --- LOCAL DE ATENDIMENTO 1 ---
local_atendimento1: val("local_atendimento1"),
bloco_cirurgico1: document.getElementById("bloco_cirurgico1").checked,
    bloco_obstetrico1: document.getElementById("bloco_obstetrico1").checked,
    consultas1: document.getElementById("consultas1").checked,
    cti1: document.getElementById("cti1").checked,
    hemodinamica1: document.getElementById("hemodinamica1").checked,
    pronto_socorro1: document.getElementById("pronto_socorro1").checked,
    descricao1:           val("descricao1"),

// --- LOCAL DE ATENDIMENTO 2 ---
local_atendimento2: val("local_atendimento2"),
bloco_cirurgico2: document.getElementById("bloco_cirurgico2").checked,
    bloco_obstetrico2: document.getElementById("bloco_obstetrico2").checked,
    consultas2: document.getElementById("consultas2").checked,
    cti2: document.getElementById("cti2").checked,
    hemodinamica2: document.getElementById("hemodinamica2").checked,
    pronto_socorro2: document.getElementById("pronto_socorro2").checked,
    descricao2:           val("descricao2"),

// --- LOCAL DE ATENDIMENTO 3 ---
local_atendimento3: val("local_atendimento2"),
bloco_cirurgico3: document.getElementById("bloco_cirurgico3").checked,
    bloco_obstetrico3: document.getElementById("bloco_obstetrico3").checked,
    consultas3: document.getElementById("consultas3").checked,
    cti3: document.getElementById("cti3").checked,
    hemodinamica3: document.getElementById("hemodinamica3").checked,
    pronto_socorro3: document.getElementById("pronto_socorro3").checked,
    descricao3:           val("descricao3"),

    // --- OUTROS ---
    locais_atendimento: val("locais_atendimento"),
    ciencia_cooperado:  val("ciencia_cooperado"),
   

    // --- DECLARAÇÕES / ACEITES ---
    declaracao_repasse: isChecked("declaracao_repasse"),
    declaracao_ingresso: isChecked("declaracao_ingresso"),
    declaracao_rendimento: isChecked("declaracao_rendimento"),
    declaracao_dados: isChecked("declaracao_dados"),
    declaracao_ppp: isChecked("declaracao_ppp"),

    // --- PPP / APOSENTADORIA ---
    beneficio:            val("beneficio"),
    regime_aposentadoria: val("regime_aposentadoria"),
    tipo_beneficio:       val("tipo_beneficio"),
    arquivos: listaArquivos
  };
}

// =========================
// CONVERTE FILE PARA BASE64
// =========================
function converterParaBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload  = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// ENVIO

form.addEventListener("submit", async (e) => {
  e.preventDefault();


  const erros = validarFormulario();

  if (erros.length > 0) {
    alert(
      "Por favor, corrija os seguintes campos:\n\n" +
      erros.join("\n")
    );
    return;
  }

  try {

    btnEnvio.disabled = true;
    btnEnvio.textContent = "Enviando...";



    const arquivos = [];

    for (const input of inputsArquivos) {

      const elemento = document.querySelector(`#${input.id}`);

      if (
        elemento &&
        elemento.files &&
        elemento.files.length > 0
      ) {

        arquivos.push({
          file: elemento.files[0],
          label: input.label
        });

      }
    }

 

    const listaArquivos = [];
    const timestamp = Date.now();

    for (const { file, label } of arquivos) {

      const base64 = await converterParaBase64(file);

      listaArquivos.push({

        nome:
          `${label}_${timestamp}_${file.name}`,

        label: label,

        tipo: file.type,

        extensao:
          file.name
            .split(".")
            .pop()
            .toLowerCase(),

        tamanho: file.size,

        conteudo:
          base64.split(",")[1]

      });

    }

   

    const payload =
      coletarDados(listaArquivos);

    console.log(
      "Payload enviado:",
      payload
    );



    const response =
      await fetch(URL_WEBHOOK, {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(payload)

      });

    if (response.ok) {

      alert(
        "Formulário enviado com sucesso!"
      );

      form.reset();

    } else {

      const texto =
        await response.text();

      console.error(texto);

      alert(
        `Erro ao enviar. Status: ${response.status}`
      );

    }

  } catch (error) {

    console.error(
      "Erro:",
      error
    );

    alert(
      "Erro ao enviar formulário."
    );

  } finally {

    btnEnvio.disabled = false;
    btnEnvio.textContent =
      "CADASTRAR FICHA";

  }

});