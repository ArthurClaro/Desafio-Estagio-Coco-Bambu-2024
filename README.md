![Captura de tela 2024-09-19 022139](https://github.com/user-attachments/assets/c7c1b9f6-537a-499b-b120-7712b367f6f4)

# Goodreads

<div align="left">
  <a href="https://arthurclaro.github.io/Desafio-Estagio-Coco-Bambu-2024/">
    <img src="https://img.shields.io/badge/Deploy-000000.svg?style=for-the-badge&logo=Vercel&labelColor=000">
  </a>
   <a href="https://www.figma.com/design/OWM279CtmO0ocbnrgGUMsM/Goodreads-redesign-(Community)?node-id=0-1&node-type=canvas&t=6ihKsEAI83sI9G8B-0">
    <img src="https://img.shields.io/badge/Figma-000000.svg?style=for-the-badge&logo=Vercel&labelColor=000">
  </a>
</div>
<br/>

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.4.

#### Introdução
Bem-vindo ao projeto Goodreads, um desafio que consiste em desenvolver uma aplicação para permitir aos usuários explorar uma vasta coleção de livros, consumindo dados de uma API pública (como a Google Books API). O objetivo principal é possibilitar que os usuários realizem buscas por livros, adicionem seus favoritos e personalizem essas seleções com anotações, avaliações e tags.

# Tecnologias Utilizadas
## <span>Front-End: Angular v18</span>
Aqui está a lista com as stacks do seu projeto formatada no mesmo estilo:

- ![@angular/compiler-cli](https://img.shields.io/badge/%40angular%2Fcompiler--cli-%E2%9C%94-red?style=for-the-badge) - Utilitários de compilação para Angular.
- ![jasmine-core](https://img.shields.io/badge/jasmine--core-%E2%9C%94-red?style=for-the-badge) - Framework de testes de comportamento para JavaScript.
- ![karma](https://img.shields.io/badge/karma-%E2%9C%94-red?style=for-the-badge) - Executor de testes para JavaScript.
- ![karma-jasmine](https://img.shields.io/badge/karma--jasmine-%E2%9C%94-red?style=for-the-badge) - Plugin do Karma para usar o Jasmine.
- ![typescript](https://img.shields.io/badge/typescript-%E2%9C%94-red?style=for-the-badge) - Superset de JavaScript que adiciona tipagem estática.
- ![@angular/common](https://img.shields.io/badge/%40angular%2Fcommon-%E2%9C%94-red?style=for-the-badge) - Módulo com funcionalidades comuns do Angular.
- ![@angular/router](https://img.shields.io/badge/%40angular%2Frouter-%E2%9C%94-red?style=for-the-badge) - Módulo Angular para roteamento.
- ![primeicons](https://img.shields.io/badge/primeicons-%E2%9C%94-red?style=for-the-badge) - Conjunto de ícones para PrimeNG.
- ![primeng](https://img.shields.io/badge/primeng-%E2%9C%94-red?style=for-the-badge) - Conjunto de componentes de interface de usuário para Angular.
- ![rxjs](https://img.shields.io/badge/rxjs-%E2%9C%94-red?style=for-the-badge) - Biblioteca para programação reativa em JavaScript.

## Rotas Disponíveis

- **`/`** : Página inicial do projeto.
- **`/book-details/:id`** : Área de detalhes do resultado pesquisados.
- **`my-favorits`** : Área dos favoritados do usuário.

### 1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```
ou
```shell
npm install
```

### 2. Rodar

Para incializar ng s ou ng serve com o comando:

```
ng serve
```

## Considerações
## Funcionalidades
- Busca por Título ou Autor: Permite ao usuário procurar livros com base no nome do título ou autor, exibindo uma lista com os resultados.
- Exibição de Detalhes do Livro: Para cada livro, são mostradas informações como título, autor(es), descrição e capa.
- Favoritar Livros: O usuário pode adicionar livros a uma lista de favoritos, juntamente com anotações pessoais, avaliações (nota de 1 a 5) e tags.
- Gerenciamento de Favoritos: É possível listar e editar os livros favoritados, bem como suas respectivas anotações e avaliações.
- Filtros por Tags: Funcionalidade de filtro que permite ao usuário organizar e encontrar favoritos usando tags personalizadas.
## Requisitos Técnicos
- O projeto foi desenvolvido utilizando Angular.
- Integração com a Google Books API (ou outra API pública de livros) para buscar e exibir os dados.
- Implementação de ao menos 3 operadores RxJS para gerenciar fluxos de dados.
- Arquivo README.md com instruções detalhadas de uso e contribuição.
## Pontos a serem melhorados:
1. Server-Side Rendering (SSR) e Static Site Generation (SSG)
SSR (Server-Side Rendering): Implementar SSR usando Angular Universal pode melhorar significativamente o desempenho da aplicação em termos de SEO e tempo de carregamento inicial, pois o conteúdo é renderizado no servidor antes de ser entregue ao navegador.
SSG (Static Site Generation): Além do SSR, o uso de SSG é ideal para páginas que não mudam com frequência, proporcionando uma melhora na performance ao servir páginas estáticas. Isso pode ser útil para seções de conteúdo estático ou listas de livros que raramente mudam.
2. Lazy Loading de Módulos
Lazy Load: Ativar o carregamento tardio (lazy loading) para módulos que não são essenciais no carregamento inicial. Isso pode reduzir o tamanho do bundle inicial e melhorar a velocidade de carregamento, principalmente para módulos de rotas mais profundas na aplicação. Em vez de carregar todos os componentes e módulos de uma vez, carregue-os conforme necessário.
3. Proteção de Rotas com Guards
CanActivate e CanDeactivate: Implementação de guards para proteger rotas sensíveis, garantindo que o usuário tenha as permissões corretas antes de acessar certas páginas. O CanDeactivate pode ser utilizado para impedir que o usuário saia de uma página sem salvar suas alterações. Essa funcionalidade pode ser especialmente útil para a área de favoritos e anotações dos livros.
4. Uso de Interceptors para Gerenciamento de Requisições
HTTP Interceptors: Utilização de interceptores para adicionar funcionalidades como autenticação JWT, gerenciamento global de erros e tentativas de repetição (usando o operador retry() do RxJS) em requisições HTTP. Isso melhora a consistência nas requisições HTTP e simplifica o código nos serviços.
5. OnPush Change Detection para Melhorar a Performance
Utilização da estratégia de detecção de mudanças OnPush nos componentes. Isso reduz a sobrecarga de detecção de mudanças desnecessárias e melhora o desempenho geral da aplicação, especialmente em páginas que manipulam grandes quantidades de dados, como uma lista de livros.
6. Componentes Reutilizáveis e Modulares
Revalidação dos componentes e considere criar componentes menores e mais reutilizáveis, evitando duplicação de código. Por exemplo, um componente de cartão de livro pode ser reutilizado tanto na busca quanto na listagem de favoritos.
7. Gerenciamento de Estado
Para aplicativos mais complexos, considere utilizar o NgRx ou Akita para gerenciar o estado da aplicação. Isso pode simplificar a lógica de componentes que dependem de dados compartilhados e melhorar a escalabilidade do código.
8. SSR e SEO (Search Engine Optimization)
Se o projeto for público ou focado em SEO, é interessante integrar Angular Universal para garantir que os mecanismos de busca consigam indexar as páginas de forma adequada, especialmente se a listagem de livros for importante para o ranqueamento de resultados.
9. Testes Automatizados e Cobertura de Código
Testes Unitários e de Integração: Criação de testes unitários para garantir a qualidade do código. O Jasmine e o Karma já estão configurados, então foque em aumentar a cobertura de testes para componentes críticos como busca, favoritos e serviço de livros.
Testes E2E (End-to-End): Considere adicionar testes de ponta a ponta com Cypress ou Protractor para garantir que o fluxo completo do usuário esteja funcionando como esperado.
10. Otimização de Build e Deploy
Adicionar scripts NPM para facilitar o processo de build, deploy e testes. Automatizar a geração de builds otimizados (como produção) e o deploy para ambientes como GitHub Pages ou outros serviços de hospedagem.





Essa aplicação foi desenvolvida como parte de um desafio Front-End para estágio, e demonstra habilidades em front-end, consumo de APIs e gerenciamento de estado utilizando RxJS.

Visite-nos em [Goodreads](https://arthurclaro.github.io/Desafio-Estagio-Coco-Bambu-2024/)
