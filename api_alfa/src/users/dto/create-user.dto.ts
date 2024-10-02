import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'A idade não pode estar vazia' })
  @IsInt({ message: 'A idade deve ser um número inteiro' })
  @Min(0, { message: 'A idade deve ser maior ou igual a 0' })
  age: number;
}
