describe('Landing Page - José Pacheco QA Engineer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // ====== TESTES DE NAVEGAÇÃO ======
  describe('Navegação', () => {
    it('Deve exibir a navbar corretamente', () => {
      cy.get('.navbar').should('be.visible');
      cy.get('.navbar-logo').should('contain', 'José Pacheco');
    });

    it('Deve ter todos os links de navegação', () => {
      cy.get('.nav-menu').within(() => {
        cy.contains('a', 'Sobre').should('have.attr', 'href', '#sobre');
        cy.contains('a', 'Serviços').should('have.attr', 'href', '#servicos');
        cy.contains('a', 'Diferenciais').should('have.attr', 'href', '#diferenciais');
        cy.contains('a', 'Portfólio').should('have.attr', 'href', '#portfolio');
        cy.contains('a', 'Conversar').should('have.attr', 'href', '#contato');
      });
    });

    it('Deve navegar para seção ao clicar no link', () => {
      cy.contains('a', 'Sobre').click()
      cy.get('#sobre').should('be.visible')

      cy.get('.sobre-text')
        .should('contain.text', 'Sou QA Engineer')

        

    });
  });

  // ====== TESTES DA SEÇÃO HERO ======
  describe('Seção Hero', () => {
    it('Deve exibir a seção hero com título e descrição', () => {
      cy.get('.hero').should('be.visible');
      cy.get('.hero-title').should('contain', 'QA focado em qualidade orientada ao negócio');
      cy.get('.hero-subtitle').should('be.visible');
    });

    it('Deve ter imagem de perfil na seção hero', () => {
      cy.get('.profile-image').should('have.attr', 'alt', 'José Pacheco - QA Engineer');
      cy.get('.profile-image').should('be.visible');
    });

    it('Deve ter botões CTA na seção hero', () => {
      cy.get('.hero-cta').within(() => {
        cy.contains('a', 'Ver Portfólio').should('be.visible');
        cy.contains('a', 'Começar conversa').should('be.visible');
      });
    });
  });

  // ====== TESTES DA SEÇÃO SOBRE ======
  describe('Seção Sobre', () => {
    it('Deve exibir a seção sobre mim', () => {
      cy.get('#sobre').should('be.visible');
      cy.get('#sobre .section-title').should('contain', 'Sobre mim');
    });

    it('Deve exibir estatísticas de experiência', () => {
      cy.get('#sobre .sobre-stats').within(() => {
        cy.contains('4+').should('be.visible');
        cy.contains('Anos em QA').should('be.visible');
        cy.contains('8+').should('be.visible');
        cy.contains('Projetos').should('be.visible');
      });
    });

    it('Deve ter paragráfos de descrição profissional', () => {
      cy.get('#sobre .sobre-text').within(() => {
        cy.get('p').should('have.length.greaterThan', 0);
      });
    });
  });

  // ====== TESTES DA SEÇÃO SERVIÇOS ======
  describe('Seção Serviços', () => {
    it('Deve exibir a seção de serviços', () => {
      cy.get('#servicos').should('be.visible');
      cy.get('#servicos .section-title').should('contain', 'O que eu faço');
    });

    it('Deve exibir cards de serviços', () => {
      cy.get('.servicos-grid').within(() => {
        cy.get('.servico-card').should('have.length.greaterThan', 0);
      });
    });

    it('Deve exibir ícones nos cards de serviço', () => {
      cy.get('.servico-card').first().within(() => {
        cy.get('.servico-icon').should('be.visible');
      });
    });
  });

  // ====== TESTES DE RESPONSIVIDADE ======
  describe('Responsividade', () => {
    it('Deve ser responsivo em mobile', () => {
      cy.viewport('iphone-x');
      cy.get('.navbar').should('be.visible');
      cy.get('.hero-title').should('be.visible');
    });

    it('Deve ser responsivo em tablet', () => {
      cy.viewport('ipad-2');
      cy.get('.navbar').should('be.visible');
      cy.get('.hero').should('be.visible');
    });

    it('Deve ser responsivo em desktop', () => {
      cy.viewport(1920, 1080);
      cy.get('.navbar').should('be.visible');
      cy.get('.hero').should('be.visible');
    });
  });

  // ====== TESTES DE ACESSIBILIDADE ======
  describe('Acessibilidade', () => {
    it('Deve ter título adequado', () => {
      cy.title().should('contain', 'José Pacheco');
    });

    it('Deve ter meta description', () => {
      cy.get('meta[name="description"]').should('have.attr', 'content');
    });

    it('Deve ter viewport meta tag', () => {
      cy.get('meta[name="viewport"]').should('have.attr', 'content');
    });

    it('Deve ter idioma definido', () => {
      cy.get('html').should('have.attr', 'lang', 'pt-BR');
    });
  });

  // ====== TESTES DE PERFORMANCE ======
  describe('Carregamento', () => {
    it('Deve carregar a página em menos de 3 segundos', () => {
      cy.visit('/', { timeout: 3000 });
      cy.get('.hero').should('be.visible');
    });

    it('Deve carregar todas as imagens', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.css', 'display').and('not.equal', 'none');
      });
    });
  });

  // ====== TESTES DE CLICABILIDADE ======
  describe('Interações com botões', () => {
    it('Botão "Ver Portfólio" deve navegar para portfólio', () => {
      cy.contains('a', 'Ver Portfólio').click();
      cy.get('#portfolio')
        .should('be.visible');

      cy.get('.portfolio-intro')
        .invoke('text')
        .should('eq', 'Projetos onde apliquei qualidade orientada ao negócio e automação estratégica:')

    });

    it('Botão "Começar conversa" deve navegar para contato', () => {
      cy.contains('a', 'Começar conversa').click();
      cy.get('a.contato-link')
        .invoke('attr', 'href')
        .should('eq', 'https://www.linkedin.com/in/josepachecoqa/')

    });
  });
});
