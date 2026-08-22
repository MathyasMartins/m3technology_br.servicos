/*
========================================
M³ TECHNOLOGY - JAVASCRIPT
========================================

Funcionalidades:
1. Menu hambúrguer responsivo
2. Fechamento do menu ao clicar fora
3. Fechamento do menu ao selecionar uma opção
4. Scroll suave
5. Integração com WhatsApp
6. Clique nos cards de serviços
7. Mensagem personalizada para cada serviço
8. Botão flutuante do WhatsApp
9. Atualização automática do ano
10. Validação e formatação de telefone
========================================
*/


// ========================================
// 1. CONFIGURAÇÕES
// ========================================

/*
 * Coloque aqui o número oficial do WhatsApp.
 *
 * Formato:
 * 55 + DDD + número
 *
 * Exemplo:
 * 5511999999999
 */

const NUMERO_WHATSAPP = "5599984365064";

// ========================================
// 2. FUNÇÃO - GERAR URL DO WHATSAPP
// ========================================

/**
 * Gera uma URL do WhatsApp com mensagem personalizada.
 *
 * @param {string} mensagem - Mensagem que será preenchida no WhatsApp.
 * @returns {string} URL completa do WhatsApp.
 */
function gerarUrlWhatsApp(mensagem) {

    const mensagemCodificada = encodeURIComponent(mensagem);

    return `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemCodificada}`;
}


// ========================================
// 3. FUNÇÃO - ABRIR WHATSAPP
// ========================================

/**
 * Abre o WhatsApp em uma nova aba.
 *
 * @param {string} mensagem - Mensagem personalizada.
 */
function abrirWhatsApp(mensagem) {

    if (!validarNumeroWhatsApp(NUMERO_WHATSAPP)) {
        console.error(
            "Número de WhatsApp inválido. Verifique a constante NUMERO_WHATSAPP."
        );

        return;
    }

    const url = gerarUrlWhatsApp(mensagem);

    window.open(url, "_blank", "noopener,noreferrer");
}


// ========================================
// 4. MENU HAMBÚRGUER
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    /*
     * Se os elementos não existirem, não executa
     * o restante do código do menu.
     */
    if (!menuToggle || !navMenu) {
        return;
    }

    const navLinks = navMenu.querySelectorAll(".nav-link");


    // ----------------------------------------
    // Abrir / fechar menu
    // ----------------------------------------

    menuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");

    });


    // ----------------------------------------
    // Fechar menu ao clicar em um link
    // ----------------------------------------

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");

        });

    });


    // ----------------------------------------
    // Fechar menu ao clicar fora
    // ----------------------------------------

    document.addEventListener("click", function (event) {

        const clicouNoMenu = navMenu.contains(event.target);
        const clicouNoBotao = menuToggle.contains(event.target);

        if (!clicouNoMenu && !clicouNoBotao) {

            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");

        }

    });

});


// ========================================
// 5. CARDS DE SERVIÇOS → WHATSAPP
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const serviceCards = document.querySelectorAll(".service-card");

    if (!serviceCards.length) {
        return;
    }


    serviceCards.forEach(function (card) {

        /*
         * Torna o card visualmente interativo.
         */
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");


        // ----------------------------------------
        // Clique com o mouse
        // ----------------------------------------

        card.addEventListener("click", function (event) {

            /*
             * Se o usuário clicar em algum link ou botão
             * dentro do card, não dispara o WhatsApp
             * novamente.
             */
            if (
                event.target.closest("a") ||
                event.target.closest("button")
            ) {
                return;
            }

            enviarServicoParaWhatsApp(card);

        });


        // ----------------------------------------
        // Teclado
        // ----------------------------------------

        card.addEventListener("keydown", function (event) {

            /*
             * Permite acessar o card usando:
             * Enter
             * Espaço
             */

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                enviarServicoParaWhatsApp(card);

            }

        });

    });

});


// ========================================
// 6. ENVIAR SERVIÇO PARA WHATSAPP
// ========================================

/**
 * Extrai o nome do serviço do card
 * e abre o WhatsApp com uma mensagem personalizada.
 *
 * @param {HTMLElement} card - Card do serviço.
 */
function enviarServicoParaWhatsApp(card) {

    const tituloElemento = card.querySelector("h3");

    if (!tituloElemento) {
        console.warn(
            "Não foi encontrado um título <h3> no card do serviço."
        );

        return;
    }

    const nomeServico = tituloElemento.textContent.trim();

    const mensagens = {

        "Formatação e Instalação do Sistema": `Olá! 👋

Vim pelo site da M³ Technology e gostaria de solicitar um orçamento.

💻 Serviço: Formatação e Instalação do Sistema

Gostaria de saber o valor do serviço, o prazo para realização e como funciona o procedimento.

Aguardo retorno. Obrigado!`,

        "Limpeza Preventiva": `Olá! 👋

Vim pelo site da M³ Technology e gostaria de solicitar um orçamento.

🧹 Serviço: Limpeza Preventiva

Gostaria de realizar uma limpeza interna no meu equipamento e saber mais informações sobre o procedimento, valor e prazo.

Aguardo retorno. Obrigado!`,

        "Limpeza e Troca de Pasta Térmica": `Olá! 👋

Vim pelo site da M³ Technology e gostaria de solicitar um orçamento.

🌡️ Serviço: Limpeza + Troca de Pasta Térmica

Gostaria de saber o valor do serviço, o prazo para realização e como funciona o procedimento.

Aguardo retorno. Obrigado!`,

        "Upgrade de SSD": `Olá! 👋

Vim pelo site da M³ Technology e tenho interesse em realizar um upgrade no meu equipamento.

💾 Serviço: Upgrade de SSD

Gostaria de verificar quais opções de SSD são compatíveis com meu equipamento, além de saber o valor da mão de obra, disponibilidade e prazo para instalação.

Aguardo retorno. Obrigado!`,

        "Upgrade de Memória RAM": `Olá! 👋

Vim pelo site da M³ Technology e tenho interesse em realizar um upgrade no meu equipamento.

🧠 Serviço: Upgrade de Memória RAM

Gostaria de saber qual memória RAM é compatível com meu equipamento, além dos valores e prazo para instalação.

Aguardo retorno. Obrigado!`,

        "Backup e Transferência de Dados": `Olá! 👋

Vim pelo site da M³ Technology e gostaria de solicitar informações sobre um serviço.

💾 Serviço: Backup e Transferência de Dados

Preciso realizar um backup ou transferência dos meus arquivos e gostaria de saber como funciona o procedimento, o prazo e o valor do serviço.

Aguardo retorno. Obrigado!`,

        "Recuperação de Carcaça": `Olá! 👋

Vim pelo site da M³ Technology e gostaria de solicitar uma avaliação.

🔧 Serviço: Recuperação de Carcaça

Meu equipamento possui danos estruturais e gostaria de saber se é possível realizar o reparo.

📸 Posso enviar fotos do equipamento para avaliação.

Gostaria também de saber o valor aproximado e o prazo para realização do serviço.

Aguardo retorno. Obrigado!`,

        "Manutenção Preventiva": `Olá! 👋

Vim pelo site da M³ Technology e gostaria de solicitar um orçamento.

🛠️ Serviço: Manutenção Preventiva

Gostaria de realizar uma avaliação e manutenção preventiva no meu equipamento para verificar possíveis problemas e evitar desgastes.

Gostaria de saber o valor e o prazo para realização do serviço.

Aguardo retorno. Obrigado!`,

        "Troca de Tela ou Display": `Olá! 👋

Vim pelo site da M³ Technology e gostaria de solicitar um orçamento.

📱 Serviço: Troca de Tela / Display

📲 Modelo do aparelho:

Gostaria de saber o valor da troca da tela/display, disponibilidade da peça e prazo para realização do serviço.

Aguardo retorno. Obrigado!`,

        "Troca de Bateria": `Olá! 👋

Vim pelo site da M³ Technology e gostaria de solicitar um orçamento.

🔋 Serviço: Troca de Bateria

📲 Modelo do aparelho:

Gostaria de saber o valor da bateria, disponibilidade da peça e prazo para realização do serviço.

Aguardo retorno. Obrigado!`,

        "Troca de Conector de Carga": `Olá! 👋

Vim pelo site da M³ Technology e gostaria de solicitar um orçamento.

🔌 Serviço: Troca de Conector de Carga

📲 Modelo do aparelho:

Gostaria de saber o valor do reparo, disponibilidade da peça e prazo para realização do serviço.

Aguardo retorno. Obrigado!`
    };

    /*
     * Caso algum serviço novo seja adicionado ao site
     * e ainda não tenha uma mensagem personalizada,
     * utiliza uma mensagem padrão.
     */

    const mensagem = mensagens[nomeServico] || `Olá! 👋

Vim pelo site da M³ Technology e gostaria de solicitar um orçamento.

🔧 Serviço: ${nomeServico}

Gostaria de saber o valor, prazo para execução e disponibilidade.

Aguardo retorno. Obrigado!`;

    abrirWhatsApp(mensagem);
}


// ========================================
// 7. BOTÕES QUE JÁ POSSUEM WHATSAPP
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    /*
     * Procura links que tenham a classe:
     *
     * .whatsapp-link
     *
     * Caso queira controlar algum botão diretamente
     * pelo JavaScript, basta adicionar essa classe.
     */

    const whatsappLinks = document.querySelectorAll(".whatsapp-link");

    whatsappLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            /*
             * Não interfere se o link já possuir
             * um href específico.
             */

            if (link.dataset.mensagem) {

                event.preventDefault();

                abrirWhatsApp(link.dataset.mensagem);

            }

        });

    });

});


// ========================================
// 8. BOTÃO FLUTUANTE DO WHATSAPP
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const whatsappFloat = document.getElementById("whatsappFloat");

    if (!whatsappFloat) {
        return;
    }


    // ----------------------------------------
    // Mensagem do botão flutuante
    // ----------------------------------------

    whatsappFloat.addEventListener("click", function (event) {

        /*
         * Evita o href original.
         */

        event.preventDefault();

        const mensagem =
            "Olá! Vim pelo site da M³ Technology e gostaria de solicitar um orçamento.";

        abrirWhatsApp(mensagem);

    });


    // ----------------------------------------
    // Efeito hover
    // ----------------------------------------

    whatsappFloat.addEventListener("mouseenter", function () {

        this.style.transform = "scale(1.1)";

    });


    whatsappFloat.addEventListener("mouseleave", function () {

        this.style.transform = "";

    });

});


// ========================================
// 9. ATUALIZAÇÃO AUTOMÁTICA DO ANO
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const yearElement = document.getElementById("year");

    if (!yearElement) {
        return;
    }

    yearElement.textContent = new Date().getFullYear();

});


// ========================================
// 10. VALIDAÇÃO DO WHATSAPP
// ========================================

/**
 * Valida se o número possui quantidade
 * mínima de dígitos.
 *
 * @param {string} numero
 * @returns {boolean}
 */
function validarNumeroWhatsApp(numero) {

    if (!numero) {
        return false;
    }


    const apenasNumeros = String(numero).replace(/\D/g, "");


    /*
     * Número brasileiro completo normalmente terá:
     *
     * 55 + DDD + número
     *
     * 12 ou 13 dígitos dependendo do formato.
     */

    if (apenasNumeros.length < 12) {

        console.warn(
            "Número de WhatsApp aparentemente inválido:",
            numero
        );

        return false;
    }


    return true;

}


// ========================================
// 11. FORMATAR TELEFONE
// ========================================

/**
 * Formata números brasileiros.
 *
 * Exemplo:
 * 11999999999
 *
 * Resultado:
 * (11) 99999-9999
 *
 * @param {string} numero
 * @returns {string}
 */
function formatarTelefone(numero) {

    if (!numero) {
        return "";
    }


    const apenasNumeros = String(numero).replace(/\D/g, "");


    // ----------------------------------------
    // Número com DDD
    // ----------------------------------------

    if (apenasNumeros.length === 11) {

        return `(${apenasNumeros.substring(0, 2)}) ${apenasNumeros.substring(2, 7)}-${apenasNumeros.substring(7)}`;

    }


    // ----------------------------------------
    // Número fixo
    // ----------------------------------------

    if (apenasNumeros.length === 10) {

        return `(${apenasNumeros.substring(0, 2)}) ${apenasNumeros.substring(2, 6)}-${apenasNumeros.substring(6)}`;

    }


    return numero;

}


// ========================================
// 12. FEEDBACK VISUAL DOS CARDS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const serviceCards = document.querySelectorAll(".service-card");


    serviceCards.forEach(function (card) {

        /*
         * Indica visualmente que o card é clicável.
         */

        card.style.cursor = "pointer";


        // ----------------------------------------
        // Foco pelo teclado
        // ----------------------------------------

        card.addEventListener("focus", function () {

            card.style.outline = "2px solid var(--primary-cyan)";
            card.style.outlineOffset = "3px";

        });


        card.addEventListener("blur", function () {

            card.style.outline = "";

        });

    });

});


// ========================================
// 13. LOG DE INICIALIZAÇÃO
// ========================================

console.log("========================================");
console.log("M³ TECHNOLOGY");
console.log("Script carregado com sucesso.");
console.log("Integração com WhatsApp ativa.");
console.log("========================================");