### MINIMAL NODE VERSION
`14xxx`


### GRAPHQL TIPAGENS
> NOTE: Toda vez que criar uma nova query do graphql, executar o comando `yarn types:generate` para gerar as tipagens do typescript pra esta query


### MAILDEV
Ferramenta que usamos em ambiente local para fazer o teste de envio de email com o token para o reset-password

para instalar siga a documentação clicando neste [Link](https://github.com/maildev/maildev)

ou siga as instruçõs simples abaixo:

```bash
# instalando maildev
$ npm install -g maildev

# executando
$ maildev

# abrir no endereço
http://0.0.0.0:1080
```

### CYPRESS TESTS
```bash
# Rodar testes com o cypress atraves de uma interface e browser
$ yarn cy:open

# Rodar testes com o cypress pelo terminal
$ yarn cy:run

# Rodar projeto com yarn dev e os testes e2e
$ yarn test:e2e
```
