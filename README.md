<p align="center">
    <h1 align="center">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://github.com/semaphore-protocol/website/blob/main/static/img/semaphore-icon-dark.svg">
        <source media="(prefers-color-scheme: light)" srcset="https://github.com/semaphore-protocol/website/blob/main/static/img/semaphore-icon.svg">
      </picture>
      D3VENT
    </h1>
</p>



<div align="center">
    <h4>
        <a href="https://github.com/Trymbakmahant/D3VENT/issues">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://www.notion.so/Documentation-1caf41766ef2460296f234aa0ce05c93">
            🤝 Code of conduct
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://github.com/Trymbakmahant/D3VENT/issues">
            🔎 Issues
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://discord.gg/5fT4Ad5AQz">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

| D3VENT it is a web3 application where you can host any event and as well attend any event . It also allows ad providers to showcase their ad during the stream which gives profits to the host . |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

To learn more about D3VENT visit [ethglobal.com/showcase/d3vent-ed4or](https://ethglobal.com/showcase/d3vent-ed4or) or [www.notion.so/Documentation-1caf41766ef2460296f234aa0ce05c93](https://www.notion.so/Documentation-1caf41766ef2460296f234aa0ce05c93).



---

## 🛠 Install

Clone this repository:

```bash
git clone https://github.com/Trymbakmahant/D3VENT.git
```

and install the dependencies:

```bash
cd client && yarn
```

## 📜 Usage

Copy the `.env.example` file as `.env`:

```bash
cp .env.example .env
```

and add your environment variables.

### Code quality and formatting

Run [ESLint](https://eslint.org/) to analyze the code and catch bugs:

```bash
yarn lint
```

Run [Prettier](https://prettier.io/) to check formatting rules:

```bash
yarn prettier
```

or to automatically format the code:

```bash
yarn prettier:write
```

### Conventional commits

```bash
yarn commit
```

It will also automatically check that the modified files comply with ESLint and Prettier rules.


### Compile contracts

Compile the smart contracts with [Hardhat](https://hardhat.org/):

```bash
yarn compile
```

### Testing

Run [Mocha](https://mochajs.org/) to test the contracts:

```bash
yarn test
```

You can also generate a test coverage report:

```bash
yarn test:coverage
```

or a test gas report:

```bash
yarn test:report-gas
```
