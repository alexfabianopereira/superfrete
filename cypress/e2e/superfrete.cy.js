// Arquivo de teste Cypress (ex: cypress/e2e/superfrete.cy.js)

describe('Teste de cálculo de frete', () => {

    // Configurações globais aplicadas antes de cada teste
    beforeEach(() => {
      // Limpa cookies e armazenamento local
      cy.clearCookies();
      cy.clearLocalStorage();
      
      // Define a resolução de tela padrão
      cy.viewport(1366, 768);
  
      // Visita a página e aguarda 10 segundos para o carregamento completo
      cy.visit('https://web.superfrete.com/'); // Substitua pela URL correta
      cy.wait(10000); // Aguarda 10 segundos
    });
  
    // Tratamento de exceções
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Ignora exceções não tratadas para evitar falhas no teste
      return false;
    });
  
    // Fluxo de sucesso: Cálculo de frete com todos os dados válidos
    it('Deve calcular o frete com sucesso', () => {
      cy.get('input[name="weight"]').type('300'); // Peso de 300g
      cy.get('input[name="height"]').type('2'); // Altura de 2cm
      cy.get('input[name="width"]').type('11'); // Largura de 11cm
      cy.get('input[name="length"]').type('16'); // Comprimento de 16cm
      cy.get('input[name="origin"]').type('08090-284'); // CEP de origem
      cy.get('input[name="destination"]').type('05407-002'); // CEP de destino
      cy.get('button[type="submit"]').click(); // Clicar no botão de calcular frete
  
      // Verifica se o cálculo foi bem-sucedido
      cy.contains('Frete calculado com sucesso').should('be.visible');
    });
  
    // Fluxo alternativo: Altura inválida (< 0.4 cm ou > 150 cm)
    it('Deve mostrar erro ao inserir altura inválida', () => {
      cy.get('input[name="weight"]').type('300'); // Peso de 300g
      cy.get('input[name="height"]').type('0.3'); // Altura inválida (ex: 0.3 cm)
      cy.get('input[name="width"]').type('11'); // Largura de 11cm
      cy.get('input[name="length"]').type('16'); // Comprimento de 16cm
      cy.get('input[name="origin"]').type('08090-284'); // CEP de origem
      cy.get('input[name="destination"]').type('05407-002'); // CEP de destino
      cy.get('button[type="submit"]').click(); // Clicar no botão de calcular frete
  
      // Verifica se a mensagem de erro é exibida para altura inválida
      cy.contains('Altura inválida').should('be.visible');
    });
  
    // Fluxo alternativo: Largura inválida (< 8 cm ou > 150 cm)
    it('Deve mostrar erro ao inserir largura inválida', () => {
      cy.get('input[name="weight"]').type('300'); // Peso de 300g
      cy.get('input[name="height"]').type('2'); // Altura de 2cm
      cy.get('input[name="width"]').type('7'); // Largura inválida (ex: 7 cm)
      cy.get('input[name="length"]').type('16'); // Comprimento de 16cm
      cy.get('input[name="origin"]').type('08090-284'); // CEP de origem
      cy.get('input[name="destination"]').type('05407-002'); // CEP de destino
      cy.get('button[type="submit"]').click(); // Clicar no botão de calcular frete
  
      // Verifica se a mensagem de erro é exibida para largura inválida
      cy.contains('Largura inválida').should('be.visible');
    });
  
    // Fluxo alternativo: Comprimento inválido (< 13 cm ou > 150 cm)
    it('Deve mostrar erro ao inserir comprimento inválido', () => {
      cy.get('input[name="weight"]').type('300'); // Peso de 300g
      cy.get('input[name="height"]').type('2'); // Altura de 2cm
      cy.get('input[name="width"]').type('11'); // Largura de 11cm
      cy.get('input[name="length"]').type('12'); // Comprimento inválido (ex: 12 cm)
      cy.get('input[name="origin"]').type('08090-284'); // CEP de origem
      cy.get('input[name="destination"]').type('05407-002'); // CEP de destino
      cy.get('button[type="submit"]').click(); // Clicar no botão de calcular frete
  
      // Verifica se a mensagem de erro é exibida para comprimento inválido
      cy.contains('Comprimento inválido').should('be.visible');
    });
  
  });
  