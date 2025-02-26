import chalk from "chalk";
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public readonly name = '--help';

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(chalk.blue(`
        Программа для подготовки данных для REST API сервера.
        `),
        chalk.green(`Пример:
        `),
            chalk.yellow(`cli.js --<command> [--arguments]
        `),
        chalk.green(`Команды:
        `),
            chalk.yellow(`--version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `));
  }
}
