<!-- Analisando o HTML que você compartilhou, alguns pontos problemáticos podem estar afetando o carregamento correto do CSS e outros recursos na sua aplicação Angular hospedada no GitHub Pages. Aqui estão as observações e passos para corrigir:

### 1. **Caminho Relativo Inadequado no `<base>`**
No seu HTML, o atributo `<base>` está com o caminho local `C:/Program Files/Git/Desafio-Estagio-Coco-Bambu-2024/`, o que é inválido para um site publicado na web. Isso faz com que o navegador tente carregar os arquivos localmente no seu computador, o que resulta no erro "Not allowed to load local resource".

#### Correção:
O caminho do atributo `base` deve refletir o subdiretório do seu site no GitHub Pages, algo como:

```html
<base href="/Desafio-Estagio-Coco-Bambu-2024/">
```

Isso vai garantir que todos os recursos (como CSS e JS) sejam carregados corretamente a partir da pasta correta no repositório GitHub Pages.

### 2. **Erros no CSS Gerado**
O arquivo `styles-U6JTQ26R.css` está sendo carregado corretamente, mas o CSS inline parece ter um problema com o `@charset` embutido. Você está recebendo um erro no `@charset` que não deveria estar dentro do bloco `<style>` gerado automaticamente.

#### Correção:
Tente remover qualquer uso de `@charset` nos seus arquivos SCSS/SASS, pois o navegador moderno já assume UTF-8 por padrão. Adicionar o `@charset` pode estar causando problemas desnecessários. Além disso, certifique-se de que o arquivo CSS gerado (`styles-U6JTQ26R.css`) esteja funcionando corretamente.

### 3. **Caminho do CSS Gerado**
O arquivo CSS está sendo carregado com o seguinte código:

```html
<link rel="stylesheet" href="styles-U6JTQ26R.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="styles-U6JTQ26R.css"></noscript>
```

O caminho `"styles-U6JTQ26R.css"` deve ser ajustado para incluir o `base-href` da sua aplicação no GitHub Pages. Como sua aplicação está hospedada em `/Desafio-Estagio-Coco-Bambu-2024/`, o caminho correto seria:

```html
<link rel="stylesheet" href="/Desafio-Estagio-Coco-Bambu-2024/styles-U6JTQ26R.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="/Desafio-Estagio-Coco-Bambu-2024/styles-U6JTQ26R.css"></noscript>
```

### 4. **Como Resolver no Angular**

Ao fazer o build, você já está utilizando o comando correto para definir o `base-href`:

```bash
ng build --configuration production --base-href "/Desafio-Estagio-Coco-Bambu-2024/"
```

No entanto, pode haver algum problema na configuração que está fazendo com que o `base-href` não seja corretamente refletido no HTML gerado.

#### Passos:
1. **Verificar `angular.json`:**
   Certifique-se de que o arquivo `angular.json` está corretamente configurado. A seção de build deve conter o `outputPath` correto e a opção de `baseHref` como mostrado:

   ```json
   {
     "projects": {
       "goodreads": {
         "architect": {
           "build": {
             "options": {
               "outputPath": "dist/goodreads",
               "baseHref": "/Desafio-Estagio-Coco-Bambu-2024/"
             }
           }
         }
       }
     }
   }
   ```

2. **Limpar e Refazer o Build:**
   Após ajustar as configurações, limpe o cache e refaça o build para garantir que todas as alterações sejam aplicadas corretamente:

   ```bash
   ng build --configuration production --base-href "/Desafio-Estagio-Coco-Bambu-2024/"
   ```

3. **Verificar se o HTML e os Caminhos Estão Corretos:**
   Após o build, abra o arquivo `index.html` dentro da pasta `dist/goodreads` e verifique se o `<base href>` está correto e se os caminhos para os arquivos CSS e JS incluem `/Desafio-Estagio-Coco-Bambu-2024/`.

### 5. **Erros no Navegador**
Use as ferramentas de desenvolvedor (F12 no Chrome ou Firefox) para verificar a aba "Console" e "Network". Veja se os arquivos CSS e JS estão sendo carregados corretamente ou se algum está retornando erro 404.

### Resumo dos Passos:
1. Ajuste o `<base href>` no `index.html` para `/Desafio-Estagio-Coco-Bambu-2024/`.
2. Remova o `@charset` dos seus arquivos SCSS.
3. Verifique o arquivo `angular.json` e refaça o build com o `--base-href` corretamente definido.
4. Abra o `index.html` gerado e confirme se os caminhos estão corretos.
5. Use as ferramentas de desenvolvedor para inspecionar o carregamento de arquivos no navegador.

Com isso, seu site deve funcionar corretamente no GitHub Pages!

<!-- tirar chart utf 8 do hmtl e css ,,, trocar link style no html , trocar base html href -->
<!-- deploy: -->
<!-- npx angular-cli-ghpages --dir=dist/goodreads/browser --> -->


<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- USAR GIT BASH NO TERMINAL DO VSCODE -->
<!-- npm install -g @angular/cli -->
<!-- ng --help -->
<!-- ng g --help -->
<!-- ng new NameProject -->
<!-- ng s  === rodar (DENTRO DA APLICAÇÃO) -->
<!-- ng build pra depois subir aplicação-->
<!-- ng g c components/home-components === gerar components-->
<!-- ng g c components/teste === acho q é mehlor gerar components-->
<!-- da pra adicionar 1 componenete dentro de outro componente, ou globalmente 
assim como na pasta teste
 -->


deploy: https://github.com/troquatte/curso-angular-portfolio
<!-- Adicione ao seu projeto: ng add angular-cli-ghpages

Faça o deploy: ng deploy --base-href https://SEU_PERFIL_GITHUB.github.io/SEU_REPO_GITHUB/browser/

Exp.: ng deploy --base-href https://troquatte.github.io/curso-angular-portfolio/browser/ -->

<!-- para atualizar o deploy::: -->
<!-- ng build --configuration production --base-href "/Desafio-Estagio-Coco-Bambu-2024/"
 -->
<!-- depois: -->
 <!-- npx angular-cli-ghpages --dir=dist/goodreads
 -->



<!-- aula de onChanges : Changes Detection ADDiocionar Para Perfomace -->
https://www.udemy.com/course/curso-de-angular/learn/lecture/41057196#overview
<!-- bloquei algumasc coisas!! -->

<!-- tem o ng s service / ng p de pipes / ng e envoirments-->


<!-- no service não usar contrutor (MOdelo antigo)
usar inject(novo) / 1 aula de Service 
 -->

<!-- ng g incertecptor == dentro de Service / DARIA pra usar E retry()-->

<!-- lazy load componente em Rotas / ++ Performace -->
<!-- DARIA pra fazer lazy load nos childrens -->

<!-- DARIA pra fazer CanDeactivate nos Proteção de Rotas -->

<!-- SSR SSRG -->

<!-- ///////////////////////////////////////////////// -->


# Goodreads

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
