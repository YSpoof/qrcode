# QRCode Generator

Um gerador de QR Code simples, rápido e eficiente.

<https://qrcode.lzart.com.br>

## Sobre o Projeto

Esse app permite gerar códigos QR de forma fácil e rápida para qualquer texto ou URL. Todo o processamento é feito localmente no navegador, sem necessidade de enviar dados para servidores externos, garantindo total privacidade.

## Funcionalidades

- 🚀 **Geração instantânea**: QR Codes são gerados em tempo real enquanto você digita
- 📋 **Copiar para a área de transferência**: Copie o QR Code diretamente para a área de transferência
- 💾 **Download facilitado**: Baixe seu QR Code como uma imagem PNG de alta qualidade
- 🎨 **Design responsivo**: Funciona perfeitamente em dispositivos móveis e desktop
- 🌙 **Suporte a modo escuro**: Interface adaptável ao modo de preferência do usuário

## Como Usar

1. Digite ou cole o texto ou URL no campo de entrada
2. O QR Code será gerado automaticamente
3. Clique no QR Code para copiá-lo ou use o botão específico para isso
4. Utilize o botão "Baixar" para salvar o QR Code como imagem PNG de tamanho 1000px por 1000px.

## Tecnologias Utilizadas

- [VueJS](https://vuejs.org/) - Framework JavaScript reativo
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [QRCode](https://www.npmjs.com/package/qrcode) - Biblioteca para geração de QR Codes
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS para design responsivo

## Instalação e Execução Local

Para executar este projeto localmente:

```bash
# Clone o repositório
git clone https://github.com/yspoof/qrcode.git
cd qr

# Instale as dependências
bun install

# Execute o servidor de desenvolvimento
bun run dev
```

## Privacidade

Este aplicativo funciona 100% localmente no navegador do usuário. Nenhum dado é enviado para qualquer servidor externo.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## TODO

- [ ] Adicionar página para gerenciar QR Codes baixados, armazenando-os no localStorage.
- [ ] Adicionar mais opções para geração de QR Codes (Wifi, Contatos, etc).

## Licença

Este projeto está licenciado sob a licença MIT.

---

© 2025 - [LZArt](https://lzart.com.br)
